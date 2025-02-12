import { PartialType } from '@nestjs/swagger';
import { CreateIntelligenceDto } from './create-intelligence.dto';

export class UpdateIntelligenceDto extends PartialType(CreateIntelligenceDto) {}
