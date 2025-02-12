import { Test, TestingModule } from "@nestjs/testing";
import { IntelligenceController } from "./intelligence.controller";
import { IntelligenceService } from "./intelligence.service";

describe("IntelligenceController", () => {
  let controller: IntelligenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntelligenceController],
      providers: [IntelligenceService]
    }).compile();

    controller = module.get<IntelligenceController>(IntelligenceController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
