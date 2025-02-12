/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import cloudinary from 'src/util/cloudinary.config';
import { Multer } from 'multer';
import { UploadApiErrorResponse } from 'cloudinary';
import toStream = require('buffer-to-stream');
import sharp = require('sharp');

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


  async uploadImageWithWatermark(
    file: Multer.File,
  ): Promise<{ url: string } | UploadApiErrorResponse> {
    //if file not image return error
    if (!file.mimetype.startsWith('image')) {
      throw new BadRequestException('File provided is not an image');
    }

    const watermarkUrl = "https://res.cloudinary.com/drjgiv0ex/image/upload/v1739338503/lb6c9ybdt7sars0danhg.png";
    const image = sharp(file.buffer);
    const metadata = await image.metadata();

    // Calculate the watermark size (10% of the image width)
    const watermarkWidth = Math.round(metadata.width! * 0.1);
    const watermarkHeight = watermarkWidth; // Ensure it's square

    // Load and resize the watermark
    const watermark = await sharp(watermarkUrl)
      .resize(watermarkWidth, watermarkHeight)
      .toBuffer();

    // Composite the watermark onto the original image
    const watermarkedImage = await image
      .composite([{ input: watermark, gravity: 'northeast' }]) // Top-right corner
      .toBuffer();
    

    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url });
      });
      toStream(watermarkedImage).pipe(upload);
    });
  }
}
