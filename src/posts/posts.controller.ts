import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Inject,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { CACHE_MANAGER, CacheInterceptor, CacheKey, CacheTTL } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { Post as PostEntity } from "./entities/post.entity";
import { CacheService } from "src/cache/cache.service";

@Controller("posts")
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly cacheService: CacheService,
  ) {
    // this.cacheManager.stores.forEach((store, index) => {
    //   console.log(`store : ${index}`, store);
    // });
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    // Clear cache when new post is created
    this.cacheService.delete('all-posts');
    return this.postsService.create(createPostDto);
  }

  @Get()
  // @UseInterceptors(CacheInterceptor)
  // @CacheTTL(10000)
  // @CacheKey('all-posts')
  async findAll() {
    const result = await this.postsService.findAll();

    return result;
  }

  @Get('test')
  async test() {
    const cachedData = await this.cacheService.get('all-posts');
    console.log('cachedData', cachedData);
    return cachedData;
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    // Clear cache when post is updated
    await this.cacheService.delete('all-posts');
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    // Clear cache when post is deleted
    await this.cacheService.delete('all-posts');
    return this.postsService.remove(+id);
  }






}
