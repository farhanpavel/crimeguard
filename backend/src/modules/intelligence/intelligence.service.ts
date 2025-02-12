import { Injectable } from "@nestjs/common";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { Multer } from "multer";
@Injectable()
export class IntelligenceService {
  genAI: GoogleGenerativeAI;
  model: GenerativeModel;
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }
  async create(image: Multer.File, title: string) {
    const prompt =
      "this is a photo of a crime named " +
      title +
      " explain the crime in the photo in first person view (as if you are the eye witness of this) within 100 words or less and return a json object where description will be inside the description key (return only the json)";
    const imageData = {
      inlineData: {
        data: Buffer.from(image.buffer).toString("base64"),
        mimeType: image.mimetype
      }
    };
    const rawResponse = await this.model.generateContent([prompt, imageData]);
    const result = rawResponse.response
      .text()
      .replace("```", "")
      .replace("json", "")
      .replace("```", "")
      .trim();
    return JSON.parse(result);
  }
}
