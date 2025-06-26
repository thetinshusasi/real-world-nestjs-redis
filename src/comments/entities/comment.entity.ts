import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
