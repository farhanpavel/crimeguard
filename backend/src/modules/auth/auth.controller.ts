import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Req,
  UseGuards
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginLocalBody, RegisterLocalBody } from "./auth.dto";
import { Request } from "express";
import { AccessTokenGuard, RefreshTokenGuard } from "./auth.guard";
import { UpdateCompleteProfile } from "./auth.user.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("/me")
  @UseGuards(AccessTokenGuard)
  async me(@Req() req: Request) {
    const user = req.user as { id: string };
    return await this.authService.getMyProfile(user.id);
  }

  @Post("/local/register")
  @HttpCode(201)
  async registerLocal(@Body() body: RegisterLocalBody) {
    return await this.authService.registerLocal(body);
  }

  @Post("/local/login")
  @HttpCode(200)
  async logInLocal(@Body() body: LoginLocalBody) {
    return await this.authService.logInLocal(body);
  }

  @Post("/forgot-password")
  @HttpCode(200)
  async forgotPassword(@Body() body: { phone: string; toPhone: boolean }) {
    return await this.authService.forgotPassword(body.phone, body.toPhone);
  }

  @Post("/reset-password")
  @HttpCode(200)
  async resetPassword(
    @Body() body: { email: string; password: string; otp: number }
  ) {
    return await this.authService.resetPassword(
      body.email,
      body.password,
      body.otp
    );
  }

  @UseGuards(AccessTokenGuard)
  @Post("/logout")
  @HttpCode(200)
  async logOut(@Req() req: Request) {
    console.log(req.user);
    const user = req.user as { id: string };
    await this.authService.logOut(user);
  }

  @UseGuards(AccessTokenGuard)
  @Put("/complete-profile")
  @HttpCode(200)
  async completeProfile(
    @Req() req: Request,
    @Body() body: UpdateCompleteProfile
  ) {
    const user = req.user as { id: string };
    return await this.authService.completeProfile(user.id, body);
  }

  @Put("/add-phone")
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async addPhone(@Req() req: Request) {
    const user = req.user as { id: string };
    return await this.authService.addPhone(user.id, req.body.phone);
  }

  @Put("/verify-otp")
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async verifyPhone(@Req() req: Request) {
    const user = req.user as { id: string };
    return await this.authService.verifyPhone(user.id, parseInt(req.body.otp));
  }

  @UseGuards(RefreshTokenGuard)
  @Post("/refresh")
  @HttpCode(201)
  async refreshToken(@Req() req: Request) {
    const user = req.user as { id: string; refreshToken: string };

    const { accessToken, refreshToken } =
      await this.authService.refreshToken(user);

    return {
      accessToken,
      refreshToken
    };
  }
}
