import dotenv from 'dotenv';

dotenv.config();

interface Config {
  appName: string;
  port: number;
  mongoDBUri: string;
  jwtSecret: string;
  jwtExpiration: string;
  apiKey?: string;
}

const config: Config = {
  appName: process.env.APP_NAME || 'MyApp',
  port: Number(process.env.APP_PORT) || 3000,
  mongoDBUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiration: process.env.JWT_EXPIRATION || '1h',
  apiKey: process.env.API_KEY,
};

export default config;
