import { DataSource } from "typeorm";
import { Post } from "src/posts/entities/post.entity";
import { Comment } from "src/comments/entities/comment.entity";
import PostsAndCommentsSeeder from "./posts-and-comments.seeder";

async function runSeeder() {
  // Initialize the data source
  const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres123",
    database: process.env.DB_NAME || "nestjs_db_dev",
    entities: [Post, Comment],
    synchronize: false,
  });

  try {
    await dataSource.initialize();
    console.log("Database connected successfully");

    // Run the seeder
    const seeder = new PostsAndCommentsSeeder();
    await seeder.run(dataSource, {} as any);

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await dataSource.destroy();
  }
}

runSeeder();
