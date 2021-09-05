import { GraphQLSchema } from 'graphql';
import { applyMiddleware } from 'graphql-middleware';
import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';

export type ContextParamsType = GraphQLContext & {
  req: Request;
  res: Response;
  connection: { context: Headers };
};

export type GraphQLContext = {
  accessToken: string;
};

@Injectable()
export class GraphQLConfigService implements GqlOptionsFactory {
  public createGqlOptions(): GqlModuleOptions {
    return {
      debug: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: true,
      path: '/graphql',
      sortSchema: true,
      installSubscriptionHandlers: true,
      transformSchema: (schema: GraphQLSchema): GraphQLSchema => applyMiddleware(schema),
      context: (args: ContextParamsType): GraphQLContext => {
        const { req, connection } = args;
        const headers = {};
        req && Object.assign(headers, req.headers || {});
        connection && Object.assign(headers, connection.context || {});
        return {
          accessToken: String(headers['authorization']),
        };
      },
    };
  }
}
