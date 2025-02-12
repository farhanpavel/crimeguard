import {
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { hash, verify } from "argon2";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { DatabaseService } from "../database/database.service";
import { ConfigService } from "@nestjs/config";
import { AccessToken } from "./auth.strategy";
import { sendOTP } from "src/util/sendOTP";
import { UpdateCompleteProfile } from "./auth.user.dto";

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private databaseService: DatabaseService,
    private jwtService: JwtService
  ) {}

  async registerLocal(user: Pick<User, "email" | "password" | "name">) {
    user.password = await this.createHash(user.password);

    const foundUser = await this.databaseService.user.findUnique({
      where: {
        email: user.email
      }
    });

    if (foundUser) {
      throw new ForbiddenException("Your email is already registered");
    }

    const newUser = await this.databaseService.user.create({
      data: user
    });

    const { accessToken, refreshToken } = await this.generateTokens({
      id: newUser.id
    });

    await this.storeRefreshToken({
      id: newUser.id,
      refreshToken
    });

    return { accessToken, refreshToken };
  }

  async logInLocal(user: Pick<User, "email" | "password">) {
    const foundUser = await this.databaseService.user.findUnique({
      where: {
        email: user.email
      }
    });

    if (!foundUser) {
      throw new ForbiddenException("User is not registered");
    }

    const isPasswordCorrect = await this.verifyHash(
      foundUser.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new ForbiddenException("Incorrect password");
    }

    const { accessToken, refreshToken } = await this.generateTokens({
      id: foundUser.id
    });

    await this.storeRefreshToken({
      id: foundUser.id,
      refreshToken
    });

    return {
      id: foundUser.id,
      accessToken,
      refreshToken,
      role: foundUser.role
    };
  }

  async logOut(user: Pick<User, "id">) {
    const foundUser = await this.databaseService.user.findUnique({
      where: {
        id: user.id
      }
    });

    if (!foundUser) {
      throw new ForbiddenException("User is not registered");
    }

    if (!foundUser.refreshToken) {
      throw new ForbiddenException("Already logged out");
    }

    await this.databaseService.user.update({
      where: {
        id: user.id
      },
      data: {
        refreshToken: null
      }
    });
  }

  async refreshToken(user: Pick<User, "id" | "refreshToken">) {
    const foundUser = await this.databaseService.user.findUnique({
      where: {
        id: user.id
      }
    });

    if (!foundUser) {
      throw new ForbiddenException("User is not registered");
    }

    if (!foundUser.refreshToken) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const isRefreshTokenValid = await this.verifyHash(
      foundUser.refreshToken,
      user.refreshToken
    );

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const { accessToken, refreshToken } = await this.generateTokens({
      id: foundUser.id
    });

    await this.storeRefreshToken({
      id: foundUser.id,
      refreshToken
    });

    return { accessToken, refreshToken };
  }

  async storeRefreshToken(user: Pick<User, "id" | "refreshToken">) {
    user.refreshToken = await this.createHash(user.refreshToken);

    await this.databaseService.user.update({
      where: {
        id: user.id
      },
      data: {
        refreshToken: user.refreshToken
      }
    });
  }

  async generateOTPToken(payload: AccessToken) {
    const otpToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>("ACCESS_KEY"),
      expiresIn: "3m"
    });

    return otpToken;
  }

  async generateTokens(payload: AccessToken) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>("ACCESS_KEY"),
      expiresIn: "7d"
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>("REFRESH_KEY"),
      expiresIn: "70d"
    });

    return { accessToken, refreshToken };
  }

  async createHash(inputString: string) {
    return await hash(inputString);
  }

  async verifyHash(referenceHash: string, inputString: string) {
    return await verify(referenceHash, inputString);
  }

  async addPhone(id: string, number: string) {
    if (!number) {
      throw new ForbiddenException("Phone number is required");
    }

    const foundUser = await this.databaseService.user.findUnique({
      where: { id: id }
    });

    const foundUserWithPhone = await this.databaseService.user.findUnique({
      where: { phone: number }
    });

    if (foundUserWithPhone !== null && foundUserWithPhone.id !== foundUser.id) {
      throw new ForbiddenException(
        "Phone number is already registered with another account"
      );
    }

    const otp = await sendOTP(number);
    console.log(otp);

    if (typeof otp !== "number") {
      throw new ForbiddenException("Error sending OTP");
    }

    // Generate OTP token with expiration time
    const otpToken = await this.jwtService.signAsync(
      { otp, userId: id },
      {
        secret: this.configService.get<string>("OTP_KEY"),
        expiresIn: "3m" // OTP expires in 3 minutes
      }
    );

    // Store the OTP token in the database
    await this.databaseService.user.update({
      where: { id: id },
      data: { phone: number, otp: otpToken }
    });

    return {
      message: "OTP sent to your phone number"
    };
  }

  async verifyPhone(id: string, otp: number) {
    if (!otp) {
      throw new ForbiddenException("OTP is required");
    }

    const foundUser = await this.databaseService.user.findUnique({
      where: { id: id }
    });

    if (!foundUser.phone) {
      throw new ForbiddenException("Phone number is not added");
    }

    if (!foundUser.otp) {
      throw new ForbiddenException("OTP token not found");
    }

    try {
      // Verify the OTP token
      const decoded = await this.jwtService.verifyAsync(foundUser.otp, {
        secret: this.configService.get<string>("OTP_KEY")
      });

      // Check if the OTP matches
      if (decoded.otp !== otp || decoded.userId !== id) {
        throw new ForbiddenException("Invalid OTP");
      }

      // Update user's verification status
      await this.databaseService.user.update({
        where: { id: id },
        data: { otp: null, isVerified: true }
      });

      return {
        message: "Phone number verified successfully"
      };
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new ForbiddenException("OTP has expired");
      }
      throw new ForbiddenException("Invalid OTP");
    }
  }

  async forgotPassword(phone: string, toPhone: boolean) {
    if (!phone) {
      throw new ForbiddenException("Phone number is required");
    }

    const foundUser = await this.databaseService.user.findUnique({
      where: { phone: phone }
    });

    if (!foundUser) {
      throw new ForbiddenException("User is not registered");
    }

    let otp;

    if (toPhone) {
      if (!foundUser.phone) {
        throw new ForbiddenException("Phone number is not added");
      }

      // Send OTP to phone number
      otp = await sendOTP(foundUser.phone);
      if (typeof otp !== "number") {
        throw new ForbiddenException("Error sending OTP");
      }
    } else {
      // Send OTP to email (not implemented here)
    }

    // Generate OTP token with expiration time
    const otpToken = await this.jwtService.signAsync(
      { otp, userId: foundUser.id },
      {
        secret: this.configService.get<string>("OTP_KEY"),
        expiresIn: "3m" // OTP expires in 3 minutes
      }
    );

    // Store the OTP token in the database
    await this.databaseService.user.update({
      where: { id: foundUser.id },
      data: { otp: otpToken }
    });

    return {
      message: "OTP sent to your phone number"
    };
  }

  async resetPassword(email: string, password: string, otp: number) {
    if (!email) {
      throw new ForbiddenException("Email is required");
    }
    if (!password) {
      throw new ForbiddenException("Password is required");
    }
    if (!otp) {
      throw new ForbiddenException("OTP is required");
    }

    const foundUser = await this.databaseService.user.findUnique({
      where: { email: email }
    });

    if (!foundUser) {
      throw new ForbiddenException("User is not registered");
    }

    if (!foundUser.otp) {
      throw new ForbiddenException("OTP token not found");
    }

    try {
      // Verify the OTP token
      const decoded = await this.jwtService.verifyAsync(foundUser.otp, {
        secret: this.configService.get<string>("OTP_KEY")
      });

      // Check if the OTP matches
      if (decoded.otp !== otp || decoded.userId !== foundUser.id) {
        throw new ForbiddenException("Invalid OTP");
      }

      // Update user's password and clear OTP token
      await this.databaseService.user.update({
        where: { id: foundUser.id },
        data: {
          password: await this.createHash(password),
          otp: null
        }
      });

      return {
        message: "Password reset successfully"
      };
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new ForbiddenException("OTP has expired");
      }
      throw new ForbiddenException("Invalid OTP");
    }
  }

  async completeProfile(
    userId: string,
    completeProfileDto: UpdateCompleteProfile
  ) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new ForbiddenException("User is not registered");
    }

    await this.databaseService.user.update({
      where: {
        id: userId
      },
      data: completeProfileDto
    });

    return {
      message: "Profile updated successfully"
    };
  }

  async getMyProfile(userId: string) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        isVerified: true,
        profileImage: true,
        bio: true,
        division: true,
        district: true,
        role: true,
        deleted: true,
        thana: true,
        isBanned: true,
        comments: {
          include: {
            media: true
          }
        },
        crimes: {
          include: {
            media: true
          }
        },
        votes: true
      }
    });

    if (!user) {
      throw new ForbiddenException("User is not registered");
    }

    return user;
  }
}
