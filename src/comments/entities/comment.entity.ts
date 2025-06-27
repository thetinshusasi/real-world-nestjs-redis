import { Post } from 'src/posts/entities/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'comments' })
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    content: string;

    @Column({ type: 'varchar' })
    createdAt: string;

    @Column({ type: 'varchar' })
    updatedAt: string;

    @Column({ type: 'uuid' })
    postId: string;

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: 'postId' })
    post: Post;
}
