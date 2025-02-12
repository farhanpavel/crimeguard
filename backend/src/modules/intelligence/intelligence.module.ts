import { Module } from "@nestjs/common";
import { IntelligenceService } from "./intelligence.service";
import { IntelligenceController } from "./intelligence.controller";

@Module({
  controllers: [IntelligenceController],
  providers: [IntelligenceService]
})
export class IntelligenceModule {}
