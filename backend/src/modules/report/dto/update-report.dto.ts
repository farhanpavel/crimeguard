import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsDate } from "class-validator";

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
}

export class UpdateReportDto extends PartialType(CreateReportDto) {}
