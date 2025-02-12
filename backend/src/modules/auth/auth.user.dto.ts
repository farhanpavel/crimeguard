import { IsString, IsOptional, IsBoolean, IsInt } from "class-validator";
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
  @IsInt()
  otp?: number;

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
