import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity({ name: 'posts' })
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar' })
    content: string;

    @Column({ type: 'varchar' })
    createdAt: string;

    @Column({ type: 'varchar' })
    updatedAt: string;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];
}
