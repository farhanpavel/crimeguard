import { Injectable } from "@nestjs/common";
import { CreateReportDto } from "./dto/create-report.dto";
import { UpdateReportDto } from "./dto/update-report.dto";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class ReportService {
  constructor(private readonly databaseService: DatabaseService) {}
  async post(userId: string, createReportDto: CreateReportDto) {
    if(createReportDto.isAnonymous === null || createReportDto.isAnonymous === undefined){
      createReportDto.isAnonymous = false;
    }
    const report = await this.databaseService.crimeReport.create({
      data: {
        crimeTime: createReportDto.crimeTime,
        description: createReportDto.description,
        division: createReportDto.division,
        district: createReportDto.district,
        title: createReportDto.title,
        userId: userId,
        isAnnonymous: createReportDto.isAnonymous,
        media: {
          create: createReportDto.media
        }
      }
    });
    return {
      message: "Report created successfully",
      report
    };
  }

  async findAll(
    verifications?: string,
    division?: string,
    district?: string,
    userId?: string,
    limit: number = 10, // Default limit to 10 if not provided
    page: number = 1, // Default page to 1 if not provided
    orderBy?: string,
    order?: "asc" | "desc",
    search?: string
  ) {
    const filters: any = {};

    if (verifications) filters.verifications = verifications;
    if (division) filters.division = division;
    if (district) filters.district = district;
    if (userId) filters.userId = userId;

    if (search) {
      filters.OR = [
        { description: { contains: search, mode: "insensitive" } },
        { title: { contains: search, mode: "insensitive" } }
      ];
    }

    const orderD = orderBy
      ? {
          [orderBy]: order || "asc"
        }
      : undefined;

    // Calculate skip based on page and limit
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await this.databaseService.crimeReport.count({
      where: filters
    });

    // Fetch paginated results
    const data = await this.databaseService.crimeReport.findMany({
      where: { ...filters, hidden: false },
      include: {
        user: true,
        votes: true,
        comments: {
          include: {
            media: true
          }
        }
      },
      skip,
      take: limit,
      orderBy: orderD
    });

    const modifiedData = data.map((report) => {
      const voteScore =
        report.votes.filter((vote) => vote.voteType === "UPVOTE").length -
        report.votes.filter((vote) => vote.voteType === "DOWNVOTE").length;
      const commentAuthenticityScore = report.comments.filter(
        (comment) => comment.media.length > 0
      ).length;
      const userVerificationScore = report.user.isVerified ? 1 : 0;
      const overAllScorePercentage =
        (voteScore + commentAuthenticityScore + userVerificationScore) / 3;
      return {
        ...report,
        authenticityScore: Math.floor(overAllScorePercentage * 100)
      };
    });

    return {
      data: modifiedData,
      meta: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: Number(page),
        perPage: limit
      }
    };
  }

  async findOne(id: string) {
    return await this.databaseService.crimeReport.findUnique({
      where: {
        hidden: false,
        id
      },
      include: {
        media: true,
        comments: {
          where: { hidden: false },
          include: {
            user: { select: { name: true, email: true, phone: true, id: true } }
          }
        },
        user: true,
        votes: true,
        _count: {
          select: { comments: true, votes: true }
        }
      }
    });
  }

  async findUserReports(userId: string) {
    return await this.databaseService.crimeReport.findMany({
      where: {
        userId
      }
    });
  }

  async doUpvote(reportId: string, userId: string) {
    const report = await this.databaseService.crimeReport.findUnique({
      where: {
        id: reportId
      }
    });
    if (!report) {
      return {
        message: "Report not found"
      };
    }
    const vote = await this.databaseService.vote.findFirst({
      where: {
        reportId,
        userId
      }
    });
    if (vote) {
      if (vote.voteType === "UPVOTE") {
        await this.databaseService.vote.delete({
          where: {
            id: vote.id
          }
        });
        return {
          message: "Report upvote removed"
        };
      }
      await this.databaseService.vote.update({
        where: {
          id: vote.id
        },
        data: {
          voteType: "UPVOTE"
        }
      });
      return {
        message: "Report upvoted successfully"
      };
    }
    await this.databaseService.vote.create({
      data: {
        voteType: "UPVOTE",
        reportId,
        userId: userId
      }
    });
    return {
      message: "Report upvoted successfully"
    };
  }

  async doDownVote(reportId: string, userId: string) {
    const report = await this.databaseService.crimeReport.findUnique({
      where: {
        id: reportId
      }
    });
    if (!report) {
      return {
        message: "Report not found"
      };
    }
    const vote = await this.databaseService.vote.findFirst({
      where: {
        reportId,
        userId
      }
    });
    if (vote) {
      if (vote.voteType === "DOWNVOTE") {
        await this.databaseService.vote.delete({
          where: {
            id: vote.id
          }
        });
        return {
          message: "Report downvote removed"
        };
      }
      await this.databaseService.vote.update({
        where: {
          id: vote.id
        },
        data: {
          voteType: "DOWNVOTE"
        }
      });
      return {
        message: "Report downvoted successfully"
      };
    }
    await this.databaseService.vote.create({
      data: {
        voteType: "DOWNVOTE",
        reportId,
        userId: userId
      }
    });
    return {
      message: "Report downvoted successfully"
    };
  }

  async update(reportId: string, updateReportDto: UpdateReportDto) {
    const report = await this.databaseService.crimeReport.update({
      where: {
        id: reportId
      },
      data: updateReportDto
    });
    return {
      message: "Report updated successfully",
      report
    };
  }

  async getHiddenReports() {
    return await this.databaseService.crimeReport.findMany({
      where: {
        hidden: true
      }
    });
  }

  async getHiddenComments() {
    return await this.databaseService.comment.findMany({
      where: {
        hidden: true
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
