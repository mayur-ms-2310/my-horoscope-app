import { Sequelize } from 'sequelize';
import config from './config/config';

const dbConfig = config.development;

console.log('config',dbConfig)

export const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: 'postgres',
  logging: dbConfig.logging,
});
