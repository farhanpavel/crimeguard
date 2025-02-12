/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  UseGuards,
  Req,
  Param,
  Put,
  BadRequestException,
  NotFoundException
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AccessTokenGuard } from "src/middlewares/guard/access-token.guard";
import { Request } from "express";
import { AdminAccessGuard } from "src/middlewares/guard/admin-access.guard";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  private getUserId(req: Request): string {
    const user = req.user as { id: string };
    return user.id;
  }

  @Post("become-admin")
  @UseGuards(AccessTokenGuard)
  async becomeAdmin(@Req() req: Request) {
    return await this.adminService.becomeAdmin(this.getUserId(req));
  }

  @Get("users")
  @UseGuards(AccessTokenGuard)
  async findAllUsers() {
    return await this.adminService.findAllUsers();
  }

  @Get("admins")
  @UseGuards(AccessTokenGuard, AdminAccessGuard)
  async findAllAdmins() {
    return await this.adminService.findAllAdmins();
  }

  @Get("reports")
  @UseGuards(AccessTokenGuard, AdminAccessGuard)
  async findAllReports() {
    return await this.adminService.findAllReports();
  }

  @Get("user/:userId")
  @UseGuards(AccessTokenGuard, AdminAccessGuard)
  async findUserById(@Param("userId") userId: string) {
    return await this.adminService.findUserById(userId);
  }

  @Put("ban/:userId")
  @UseGuards(AccessTokenGuard, AdminAccessGuard)
  async banUser(@Param("userId") userId: string, @Req() req: Request) {
    return await this.adminService.banUser(userId);
  }

  @Delete("delete/:userId")
  @UseGuards(AccessTokenGuard, AdminAccessGuard)
  async delete(@Param("userId") userId: string, @Req() req: Request) {
    return await this.adminService.deleteUser(userId);
  }

  @Put("unban/:userId")
  @UseGuards(AccessTokenGuard, AdminAccessGuard)
  async unbanUser(@Param("userId") userId: string, @Req() req: Request) {
    return await this.adminService.unbanUser(userId);
  }

  @Get("banned-users")
  @UseGuards(AccessTokenGuard, AdminAccessGuard)
  async findBannedUsers() {
    return await this.adminService.findBannedUsers();
  }

  @Delete("report/:reportId")
  @UseGuards(AccessTokenGuard, AdminAccessGuard)
  async removeReport(@Param("reportId") reportId: string, @Req() req: Request) {
    return await this.adminService.removeReport(reportId);
  }

  @Delete("comment/:commentId")
  @UseGuards(AccessTokenGuard, AdminAccessGuard)
  async removeComment(
    @Param("commentId") commentId: string,
    @Req() req: Request
  ) {
    return await this.adminService.removeComment(commentId);
  }
}
