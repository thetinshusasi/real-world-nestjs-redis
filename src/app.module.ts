import { Inject, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SharedModule } from "./shared/shared.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsModule } from "./comments/comments.module";
import { PostsModule } from "./posts/posts.module";
import * as path from 'path';
import { DataSource, DataSourceOptions } from "typeorm";
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {

        return {
          type: "postgres",
          host: configService.get("DB_HOST"),
          port: Number(configService.get("DB_PORT")),
          username: configService.get("DB_USERNAME"),
          password: configService.get("DB_PASSWORD"),
          database: configService.get("DB_NAME"),
          entities: [path.resolve(__dirname, '**/entities/*.entity{.ts,.js}')],
          migrations: [path.resolve(__dirname, 'migrations/*.ts')],
          migrationsTableName: "migrations",
          // TODO: remove this in production, keep this true for development
          synchronize: false,
        }
      },
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options as DataSourceOptions).initialize();
        return dataSource;
      },
    }),
    SharedModule,
    CommentsModule,
    CacheModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
