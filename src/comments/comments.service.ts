import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) { }
  create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentRepository.save(createCommentDto);
  }

  findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  findOne(id: number): Promise<Comment | null> {
    return this.commentRepository.findOne({ where: { id: id.toString() } });
  }

  update(id: number, updateCommentDto: UpdateCommentDto): Promise<UpdateResult> {
    return this.commentRepository.update(id, updateCommentDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.commentRepository.delete(id);
  }
}
