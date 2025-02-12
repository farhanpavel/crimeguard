import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  Query
} from "@nestjs/common";
import { ReportService } from "./report.service";
import { CreateReportDto } from "./dto/create-report.dto";
import { UpdateReportDto } from "./dto/update-report.dto";
import { Request } from "express";
import { AccessTokenGuard } from "src/middlewares/guard/access-token.guard";
import { CommunityAccessGuard } from "src/middlewares/guard/community-access.guard";
import { ReportAccessGuard } from "src/middlewares/guard/report-access.guard";
import { AdminAccessGuard } from "src/middlewares/guard/admin-access.guard";

@Controller("report")
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseGuards(AccessTokenGuard, CommunityAccessGuard)
  async create(@Body() createReportDto: CreateReportDto, @Req() req: Request) {
    const user = req.user as { id: string };
    return await this.reportService.post(user.id, createReportDto);
  }

  @Get()
  findAll(
    @Query("verifications") verifications: string,
    @Query("division") division: string,
    @Query("district") district: string,
    @Query("userId") userId: string,
    @Query("limit") limit: number,
    @Query("skip") skip: number,
    @Query("page") page: number,
    @Query("orderBy") orderBy: string,
    @Query("order") order: "asc" | "desc",
    @Query("search") search: string
  ) {
    return this.reportService.findAll(
      verifications,
      division,
      district,
      userId,
      limit,
      page,
      orderBy,
      order,
      search
    );
  }

  @Get("my-reports")
  @UseGuards(AccessTokenGuard)
  async findMyReports(@Req() req: Request) {
    const user = req.user as { id: string };
    return await this.reportService.findUserReports(user.id);
  }

  @Get("upvote/:reportId")
  @UseGuards(AccessTokenGuard)
  async upvote(@Param("reportId") reportId: string, @Req() req: Request) {
    const user = req.user as { id: string };
    return await this.reportService.doUpvote(reportId, user.id);
  }

  @Get("downvote/:reportId")
  @UseGuards(AccessTokenGuard)
  async downvote(@Param("reportId") reportId: string, @Req() req: Request) {
    const user = req.user as { id: string };
    return await this.reportService.doDownVote(reportId, user.id);
  }

  @Get("/get-hidden-reports")
  @UseGuards(AdminAccessGuard)
  async getHiddenReports() {
    return await this.reportService.getHiddenReports();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.reportService.findOne(id);
  }

  @Put(":reportId")
  @UseGuards(AccessTokenGuard, CommunityAccessGuard, ReportAccessGuard)
  async update(
    @Param("reportId") reportId: string,
    @Body() updateReportDto: UpdateReportDto
  ) {
    return this.reportService.update(reportId, updateReportDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.reportService.remove(+id);
  }
}
