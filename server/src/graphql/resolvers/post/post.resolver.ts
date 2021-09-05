import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostResolverService } from './post.resolver.service';
import { PostInputType } from './post.input.type';
import { PostObjectType, SubInfoObjectType } from './post.object.type';

@Resolver()
export class PostResolver {
  constructor(private readonly post: PostResolverService) {}

  @Query(() => [PostObjectType])
  public async getPosts(@Args('keyword', { type: () => String }) keyword: string): Promise<PostObjectType[]> {
    return this.post.getPosts(keyword);
  }

  @Query(() => PostObjectType)
  public async getSubInfo(@Args('storeName', { type: () => String }) storeName: string): Promise<SubInfoObjectType> {
    return this.post.getSubInfo(storeName);
  }

  @Mutation(() => Boolean)
  public async addPost(@Args('args', { type: () => PostInputType }) args: PostInputType): Promise<boolean> {
    return this.post.addPost(args.storeName, args.categoryName, args.email, args.content, args.rating);
  }

  @Mutation(() => Boolean)
  public async deletePost(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.post.deletePost(id);
  }

  @Mutation(() => Boolean)
  public async updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('content', { type: () => String }) content: string,
    @Args('rating', { type: () => Int }) rating: number,
  ): Promise<boolean> {
    return this.post.updatePost(id, content, rating);
  }
}
