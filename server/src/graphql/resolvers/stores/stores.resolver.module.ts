import { Module } from '@nestjs/common';

import { StoreResolverService } from './stores.resolver.service';
import { StoreResolver } from './stores.resolver';
import { CheckInRepository } from '@repositories';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CheckInRepository])],
  exports: [TypeOrmModule.forFeature([CheckInRepository])],
  providers: [StoreResolverService, StoreResolver],
})
export class StoreResolverModule {}
