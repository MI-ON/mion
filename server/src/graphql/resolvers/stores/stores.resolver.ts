import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StoreResolverService } from './stores.resolver.service';
import { StoreInputType } from './stores.input.type';
import { CheckInObjectType, StoreObjectType } from './stores.object.type';

@Resolver()
export class StoreResolver {
  constructor(private readonly store: StoreResolverService) {}

  @Query(() => [StoreObjectType])
  public async getVotedStores(): Promise<StoreObjectType[]> {
    return this.store.getVotedStores();
  }

  @Query(() => StoreObjectType, { nullable: true })
  public async getStore(
    @Args('keyword', { type: () => String }) keyword: string,
  ): Promise<StoreObjectType | undefined> {
    const results = await this.store.getStores(keyword, 1);
    return results.pop();
  }

  @Query(() => [StoreObjectType])
  public async getStores(@Args('keyword', { type: () => [String] }) keyword: string[]): Promise<StoreObjectType[]> {
    return this.store.getStores(keyword);
  }

  @Mutation(() => CheckInObjectType)
  public async addCheckIn(
    @Args('storeName', { type: () => String }) storeName: string,
    @Args('email', { type: () => String }) email: string,
  ): Promise<CheckInObjectType> {
    return this.store.addCheckIn(storeName, email);
  }
}
