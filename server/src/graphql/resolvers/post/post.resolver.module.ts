import { Module } from '@nestjs/common';

import { PostResolverService } from './post.resolver.service';
import { PostResolver } from './post.resolver';
import { PostRepository, CheckInRepository } from '@repositories';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository, CheckInRepository])],
  exports: [TypeOrmModule.forFeature([PostRepository, CheckInRepository])],
  providers: [PostResolverService, PostResolver],
})
export class PostResolverModule {}
