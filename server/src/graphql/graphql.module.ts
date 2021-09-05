import { Module } from '@nestjs/common';
import { UserResolverModule } from './resolvers/user/user.resolver.module';
import { PostResolverModule } from './resolvers/post/post.resolver.module';
import { StoreResolverModule } from './resolvers/stores/stores.resolver.module';

@Module({
  imports: [UserResolverModule, PostResolverModule, StoreResolverModule],
  providers: [],
})
export class GraphqlResolverModule {}
