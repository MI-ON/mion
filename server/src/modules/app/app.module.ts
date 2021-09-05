import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '@modules/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLConfigService } from '@graphql/graphql-config.service';
import { GraphqlResolverModule } from '@graphql/graphql.module';

@Module({
  imports: [
    DatabaseModule.forRoot(),
    GraphQLModule.forRootAsync({ useClass: GraphQLConfigService }),
    GraphqlResolverModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
