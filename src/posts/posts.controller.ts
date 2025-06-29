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

@Controller("posts")
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    // Clear cache when new post is created
    this.cacheManager.del('all-posts');
    return this.postsService.create(createPostDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10000)
  @CacheKey('all-posts')
  async findAll() {
    console.log('Controller findAll called');
    const result = await this.postsService.findAll();
    return result;
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    // Clear cache when post is updated
    await this.cacheManager.del('all-posts');
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    // Clear cache when post is deleted
    await this.cacheManager.del('all-posts');
    return this.postsService.remove(+id);
  }

  // Test endpoint to manually clear cache
  @Post('clear-cache')
  async clearCache() {
    await this.cacheManager.del('all-posts');
    return { message: 'Cache cleared successfully' };
  }

  // Test endpoint to check cache status
  @Get('cache-status')
  async getCacheStatus() {
    const cachedData = await this.cacheManager.get('all-posts');
    return {
      hasCachedData: !!cachedData,
      cacheKey: 'all-posts'
    };
  }
}
