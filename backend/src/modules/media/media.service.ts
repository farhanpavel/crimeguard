/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import cloudinary from 'src/util/cloudinary.config';
import { Multer } from 'multer';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import toStream = require('buffer-to-stream');
import sharp = require('sharp');
import axios from 'axios';

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
    const watermarkUrl = "https://res.cloudinary.com/drjgiv0ex/image/upload/v1739338503/lb6c9ybdt7sars0danhg.png";
  
    try {
      // Load the original image
      const image = sharp(file.buffer);
      const metadata = await image.metadata();
  
      console.log(metadata);
  
      // Calculate the watermark size (10% of the image width)
      const watermarkWidth = Math.round(metadata.width! * 0.5);
      const watermarkHeight = watermarkWidth; // Ensure it's square
  
      // Fetch the watermark image from the URL
      const watermarkResponse = await axios.get(watermarkUrl, { responseType: 'arraybuffer' });
      const watermarkBuffer = Buffer.from(watermarkResponse.data, 'binary');
  
      // Resize the watermark
      const watermark = await sharp(watermarkBuffer)
        .resize(watermarkWidth, watermarkHeight)
        .toBuffer();
  
      // Composite the watermark onto the original image
      const watermarkedImage = await image
        .composite([{ input: watermark, gravity: 'center' }]) // Center
        .toBuffer();
  
      console.log(watermarkedImage);
  
      // Upload the watermarked image to Cloudinary
      return new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (error) return reject(error);
            resolve({ url: result!.secure_url });
          },
        );
        toStream(watermarkedImage).pipe(upload);
      });
    } catch (error) {
      console.error('Error processing image:', error);
      throw new Error(`Failed to process image: ${error.message}`);
    }
  }
}
