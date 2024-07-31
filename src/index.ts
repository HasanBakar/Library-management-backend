import express, { Request, Response } from 'express';
import config from './config/config.js';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express🎁🎁🎁!');
});

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
