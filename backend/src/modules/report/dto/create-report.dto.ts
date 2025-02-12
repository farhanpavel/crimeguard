import { MediaType } from "@prisma/client";
import {
  IsEnum,
  IsString,
  IsDate,
  IsArray,
  ValidateNested
} from "class-validator";
import { Type } from "class-transformer";

class Media {
  @IsString()
  url: string;

  @IsEnum(MediaType)
  type: MediaType;
}

export class CreateReportDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  division: string;

  @IsString()
  district: string;

  @IsDate()
  @Type(() => Date)
  crimeTime: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Media)
  media: Media[];
}
