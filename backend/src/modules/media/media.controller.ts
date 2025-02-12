/* eslint-disable prettier/prettier */
import { Controller, Post, BadRequestException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MediaService } from './media.service';
import { Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImageToCloudinary(@UploadedFile() file: Multer.File) {
    return await this.mediaService.uploadImage(file).catch((e) => {
      console.error(e);
      throw new BadRequestException('Invalid file type.');
    });
  }
}
