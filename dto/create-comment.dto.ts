import { MediaType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsString, ValidateNested } from "class-validator";

class Media {
    @IsString()
    url: string;

    @IsEnum(MediaType)
    type: MediaType;
}

export class CreateCommentDto {
    @IsString()
    content: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Media)
    media: Media[];
}
