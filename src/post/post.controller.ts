import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { Observable } from 'rxjs';
import { Post as PostModel } from 'src/models/post/post.interface';
import { AppService } from 'src/app.service';

@Controller('/posts')
export class PostController {
    constructor(private readonly postService: PostService, private readonly appService: AppService) { }

    @Get('/')
    findAll(): Observable<PostModel[]> {
        return this.postService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<PostModel> {
        return this.postService.findOne(id);
    }

    @Post()
    create(@Body() post: Omit<PostModel, 'id'>): Observable<PostModel> {
        return this.postService.create(post);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() post: Partial<PostModel>
    ): Observable<PostModel> {
        return this.postService.update(id, post);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<void> {
        return this.postService.delete(id);
    }
}
