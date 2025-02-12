import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile
} from "@nestjs/common";
import { IntelligenceService } from "./intelligence.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Multer } from "multer";

@Controller("intelligence")
export class IntelligenceController {
  constructor(private readonly intelligenceService: IntelligenceService) {}

  @Post("explain-image")
  @UseInterceptors(FileInterceptor("file"))
  create(@UploadedFile() file: Multer.File, @Body("title") title: string) {
    return this.intelligenceService.create(file, title);
  }
}
