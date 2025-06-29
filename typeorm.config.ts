import { DataSource } from 'typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Post } from './src/posts/entities/post.entity';
import { Comment } from './src/comments/entities/comment.entity';

// Initialize ConfigModule to load environment variables
ConfigModule.forRoot({
    isGlobal: true,
});

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: String(configService.get('DB_PASSWORD')),
    database: configService.get('DB_NAME'),
    entities: [Post, Comment],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
}); 