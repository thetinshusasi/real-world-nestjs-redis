import { Test, TestingModule } from "@nestjs/testing";
import { HttpApiService } from "./http-api.service";

describe("HttpApiService", () => {
  let service: HttpApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpApiService],
    }).compile();

    service = module.get<HttpApiService>(HttpApiService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
