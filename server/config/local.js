/* eslint-disable */

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  database: {
    type: 'mysql',
    timezone: '+09:00',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'mion',
    synchronize: process.env.NODE_ENV !== 'production',
    logging: ['error'],
  },
};
