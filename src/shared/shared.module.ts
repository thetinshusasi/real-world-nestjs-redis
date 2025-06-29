import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { HttpApiService } from "./http-api/http-api.service";

@Module({
  imports: [HttpModule],
  providers: [HttpApiService],
  exports: [HttpApiService, HttpModule],
})
export class SharedModule {}
