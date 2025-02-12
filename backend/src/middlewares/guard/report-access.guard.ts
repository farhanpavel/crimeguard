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
export class ReportAccessGuard implements CanActivate {
  constructor(private readonly databaseService: DatabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const u = request.user as { id: string };
    const reportId = request.params.reportId;
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

    const report = await this.databaseService.crimeReport.findUnique({
      where: {
        id: reportId
      }
    });

    if (!report) {
      throw new NotFoundException("Report not found");
    }

    if (report.userId !== userId) {
      throw new BadRequestException(
        "You are not authorized to access this function"
      );
    }
    return true;
  }
}
