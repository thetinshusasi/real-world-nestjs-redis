import { setSeederFactory } from "typeorm-extension";
import { Comment } from "src/comments/entities/comment.entity";

export const CommentFactory = setSeederFactory(Comment, (faker) => {
  return {
    content: faker.lorem.paragraph(),
    createdAt: faker.date.past().getTime(),
    updatedAt: faker.date.recent().getTime(),
    // postId will be set when creating comments in relation to posts
  };
});
