import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { SocketGateway } from "../socket/socket.gateway";

@Module({
  imports: [SocketGateway],
  controllers: [CommentController],
  providers: [CommentService, SocketGateway]
})
export class CommentModule {}
