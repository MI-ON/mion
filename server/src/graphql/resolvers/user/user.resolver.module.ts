import { Module } from '@nestjs/common';

import { UserResolverService } from './user.resolver.service';
import { UserResolver } from './user.resolver';
import { UserRepository } from '@repositories/user.repository';
import { StoreResolverService } from '@graphql/resolvers/stores/stores.resolver.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  exports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserResolverService, UserResolver, StoreResolverService],
})
export class UserResolverModule {}
