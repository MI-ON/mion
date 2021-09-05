/* eslint-disable */

const config = require('config');
const databaseConfig = config.get('database');

module.exports = {
  ...databaseConfig,
  entities: [__dirname + '/dist/src/entities/**/*.js'],
  migrations: [__dirname + '/dist/src/migration/**/*.js'],
  cli: {
    entitiesDir: __dirname + '/src/entities',
    migrationsDir: __dirname + '/src/migrations',
  },
};
