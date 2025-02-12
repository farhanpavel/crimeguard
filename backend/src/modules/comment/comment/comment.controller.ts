/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/modules/auth/auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(":reportId/comment")
  @UseGuards(AccessTokenGuard)
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: Request
  ) {
    const user = req.user as { id: string };
    return this.commentService.commentOnReport(user.id, req.params.reportId, createCommentDto);
  }
}
