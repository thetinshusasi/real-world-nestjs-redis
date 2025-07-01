import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { CacheService } from "src/cache/cache.service";
import { CacheModule } from "src/cache/cache.module";

@Module({
  imports: [

    CacheModule,
    TypeOrmModule.forFeature([Post]),
  ],
  controllers: [PostsController],
  providers: [PostsService, CacheService],
})
export class PostsModule { }
