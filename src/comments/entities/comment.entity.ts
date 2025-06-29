import { Post } from "src/posts/entities/post.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity({ name: "comments" })
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  content: string;

  @Column({ type: "bigint" })
  createdAt: number;

  @Column({ type: "bigint" })
  updatedAt: number;

  @Column({ type: "uuid" })
  postId: string;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: "postId" })
  post: Post;
}
