import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";
import PostsAndCommentsSeeder from "./posts-and-comments.seeder";

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await runSeeder(dataSource, PostsAndCommentsSeeder);
  }
}
