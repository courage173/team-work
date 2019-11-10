import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV,
  
  databaseUrl: {
    development: process.env.development_URL,
    test: process.env.test_URL,
    production: process.env.DB_URL
 }
};


export default config;

