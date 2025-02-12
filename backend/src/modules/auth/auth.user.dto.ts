import { IsString, IsOptional, IsBoolean } from "class-validator";
import { PartialType } from "@nestjs/swagger";

export class CompleteProfileDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsBoolean()
  isBanned?: boolean = false;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean = false;

  @IsOptional()
  @IsString()
  division?: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsString()
  thana?: string;
}

export class UpdateCompleteProfile extends PartialType(CompleteProfileDto) {}
