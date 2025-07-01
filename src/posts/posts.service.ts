import { Inject, Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { CacheService } from "src/cache/cache.service";
import { Cacheable } from "cacheable";
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private cacheService: CacheService
  ) {

  }
  create(createPostDto: CreatePostDto) {
    return this.postRepository.save(createPostDto);
  }


  async findAll() {
    const cachedData = await this.cacheService.get('all-posts-1');
    if (cachedData) {
      return cachedData;
    }
    console.log('Controller findAll called');

    const data = await this.postRepository.find();
    await this.cacheService.set('all-posts-1', data, 60000);
    return data;
  }

  findOne(id: number) {
    return this.postRepository.findOne({ where: { id: id.toString() } });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepository.update(id, updatePostDto);
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
