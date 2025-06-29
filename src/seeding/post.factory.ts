import { setSeederFactory } from "typeorm-extension";
import { Post } from "src/posts/entities/post.entity";

export const PostFactory = setSeederFactory(Post, (faker) => {
  return {
    title: faker.lorem.sentence(5),
    content: faker.lorem.paragraphs(3),
    createdAt: faker.date.past().getTime(),
    updatedAt: faker.date.recent().getTime(),
  };
});
