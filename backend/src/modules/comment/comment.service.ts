import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { DatabaseService } from "src/modules/database/database.service";
import { SocketGateway } from "../socket/socket.gateway";

@Injectable()
export class CommentService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly socketGateway: SocketGateway
  ) {}
  async commentOnReport(
    userId: string,
    reportId: string,
    createCommentDto: CreateCommentDto
  ) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const report = await this.databaseService.crimeReport.findUnique({
      where: {
        id: reportId
      }
    });

    if (!report) {
      throw new NotFoundException("Report not found");
    }

    const comment = await this.databaseService.comment.create({
      data: {
        text: createCommentDto.content,
        userId: user.id,
        reportId: report.id
      }
    });

    createCommentDto.media.forEach(async (media) => {
      await this.databaseService.media.create({
        data: {
          url: media.url,
          type: media.type,
          commentId: comment.id
        }
      });
    });

    this.socketGateway.sendMessage(`${report.userId}`, {
      title: `New Comment`,
      content: `${user.name} commented on your crime report`,
      date: new Date().toISOString()
    });

    await this.databaseService.notifcaiton.create({
      data: {
        title: `New Comment`,
        body: `${user.name} commented on your crime report`,
        userId: report.userId
      }
    });

    return {
      message: "Comment created",
      comment
    };
  }
}
