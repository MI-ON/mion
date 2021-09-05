import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Entities from '@entities';
import * as config from 'config';

@Injectable()
export class TypeORMConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    const entities = Object.values(Entities);
    const databaseConfig = config.get<TypeOrmModuleOptions>('database');
    const typeOrmConfig = <TypeOrmModuleOptions>{ ...databaseConfig, entities };

    return typeOrmConfig;
  }
}
