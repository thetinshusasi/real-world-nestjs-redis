import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
