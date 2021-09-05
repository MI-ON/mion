import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserResolverService } from './user.resolver.service';
import { UserInputType } from './user.input.type';
import { UserObjectType } from './user.object.type';

@Resolver()
export class UserResolver {
  constructor(private readonly user: UserResolverService) {}

  @Query(() => UserObjectType, { nullable: true })
  public async getUserByEmail(
    @Args('email', { type: () => String }) email: string,
  ): Promise<UserObjectType | undefined> {
    return this.user.getUserByEmail(email);
  }

  @Query(() => [UserObjectType])
  public async getVotedUsersByStoreName(
    @Args('storeName', { type: () => String }) storeName: string,
  ): Promise<UserObjectType[]> {
    return this.user.getVotedUsersByStoreName(storeName);
  }

  @Mutation(() => UserObjectType)
  public async addUser(
    @Args('email', { type: () => String }) email: string,
    @Args('fullName', { type: () => String }) fullName: string,
    @Args('avatarUrl', { type: () => String }) avatarUrl: string,
  ): Promise<UserObjectType> {
    return this.user.register(email, fullName, avatarUrl);
  }

  @Mutation(() => UserObjectType, { nullable: true })
  public async addFullName(
    @Args('email', { type: () => String }) email: string,
    @Args('fullName', { type: () => String }) fullName: string,
  ): Promise<UserObjectType | undefined> {
    return this.user.addFullName(email, fullName);
  }
}
