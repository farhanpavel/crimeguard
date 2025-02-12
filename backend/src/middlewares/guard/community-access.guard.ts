import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { DatabaseService } from "../../modules/database/database.service";
import { Request } from "express";

@Injectable()
export class CommunityAccessGuard implements CanActivate {
  constructor(private readonly databaseService: DatabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const u = request.user as { id: string };
    console.log(u);
    const userId = u.id;

    if (!userId) throw new BadRequestException("User id not found");

    const user = await this.databaseService.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new NotFoundException("Profile not found");
    }
    if (user.role === "ADMIN") {
      throw new BadRequestException(
        "Admins are not authorized to access this function"
      );
    }

    if (user.isBanned) {
      throw new BadRequestException("You are banned from this community");
    }

    if (!user.isVerified) {
      throw new BadRequestException(
        "You are not verified to access this feature"
      );
    }

    if (user.deleted) {
      throw new BadRequestException(
        "Your account has been deleted from this community"
      );
    }
    return true;
  }
}
