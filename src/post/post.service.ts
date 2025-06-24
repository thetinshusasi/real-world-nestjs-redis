import { Injectable } from '@nestjs/common';
import { HttpApiService } from '../shared/http-api/http-api.service';
import { Post } from '../models/post/post.interface';
import { Observable } from 'rxjs';

@Injectable()
export class PostService {
  constructor(private readonly httpApiService: HttpApiService) { }

  findAll(): Observable<Post[]> {
    return this.httpApiService.get<Post[]>('/posts');
  }

  findOne(id: string): Observable<Post> {
    return this.httpApiService.get<Post>(`/posts/${id}`);
  }

  create(post: Omit<Post, 'id'>): Observable<Post> {
    return this.httpApiService.post<Post>('/posts', post);
  }

  update(id: string, post: Partial<Post>): Observable<Post> {
    return this.httpApiService.patch<Post>(`/posts/${id}`, post);
  }

  delete(id: string): Observable<void> {
    return this.httpApiService.delete<void>(`/posts/${id}`);
  }
}
