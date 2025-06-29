import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisUrl = `redis://${configService.get('REDIS_USERNAME')}:${configService.get('REDIS_PASSWORD')}@${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}`;
        return {
          store: await redisStore({
            url: redisUrl,
            ttl: 60000, // 60 seconds default TTL
          }),
        };
      },
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule { }
