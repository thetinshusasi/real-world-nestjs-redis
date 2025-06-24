import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [PostModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
