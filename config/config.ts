import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const e = process.env

const config = {
  development: {
    username: e.DB_USER || 'postgres',
    password: e.DB_PASS || 'password',
    database: e.DB_NAME || 'postgres',
    host:  e.DB_HOST || 'db',
    port: 5432,
    dialect: 'postgres',
    logging: true
  }
};

export default config;
