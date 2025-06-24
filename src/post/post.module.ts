import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { SharedModule } from 'src/shared/shared.module';
import { HttpApiService } from 'src/shared/http-api/http-api.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [PostController],
  providers: [PostService, HttpApiService, AppService],
  imports: [SharedModule],
})
export class PostModule { }
