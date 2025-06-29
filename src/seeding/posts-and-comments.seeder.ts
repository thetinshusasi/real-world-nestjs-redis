import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Post } from "src/posts/entities/post.entity";
import { Comment } from "src/comments/entities/comment.entity";

export default class PostsAndCommentsSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const postRepository = dataSource.getRepository(Post);
    const commentRepository = dataSource.getRepository(Comment);

    // Create posts
    console.log("Creating posts...");
    const posts: Post[] = [];
    for (let i = 0; i < 10; i++) {
      const post = postRepository.create({
        title: `Post ${i + 1} - ${Math.random().toString(36).substring(7)}`,
        content: `This is the content for post ${i + 1}. It contains some random text and information.`,
        createdAt: Math.floor(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
        ), // Random date in last 30 days
        updatedAt: Math.floor(Date.now()),
      });
      posts.push(await postRepository.save(post));
    }
    console.log(`Created ${posts.length} posts`);

    // Create comments for each post
    console.log("Creating comments...");
    for (const post of posts) {
      const commentCount = Math.floor(Math.random() * 4) + 2;

      for (let j = 0; j < commentCount; j++) {
        const comment = commentRepository.create({
          content: `Comment ${j + 1} on post "${post.title}". This is a sample comment.`,
          createdAt: Math.floor(
            Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
          ), // Random date in last 7 days
          updatedAt: Math.floor(Date.now()),
          postId: post.id,
        });
        await commentRepository.save(comment);
      }

      console.log(`Created ${commentCount} comments for post: ${post.title}`);
    }

    console.log(`Seeded ${posts.length} posts with comments`);
  }
}
