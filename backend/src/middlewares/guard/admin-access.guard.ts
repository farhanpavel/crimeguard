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
  export class AdminAccessGuard implements CanActivate {
    constructor(private readonly databaseService: DatabaseService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request: Request = context.switchToHttp().getRequest();
      const user = request.user as { id: string };
      console.log(user);
      const userId = user.id;
  
      if (!userId) throw new BadRequestException("User id not found");
  
      const admin = await this.databaseService.user.findUnique({
        where: {
          id: userId
        }
      });
      if (!admin) {
        throw new NotFoundException("Profile not found");
      }
      if (admin.role !== "ADMIN") {
        throw new BadRequestException(
          "You are not authorized to access this function"
        );
      }
      return true;
    }
  }
  