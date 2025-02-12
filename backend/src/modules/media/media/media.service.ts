/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import cloudinary from 'src/util/cloudinary.config';
import { Multer } from 'multer';
import { UploadApiErrorResponse } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class MediaService {

  async uploadImage(
    file: Multer.File,
  ): Promise<{ url: string } | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url });
      });
      toStream(file.buffer).pipe(upload);
    });
  }
}
