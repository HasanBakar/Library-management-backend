import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config/config.js';
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import connectDB from './config/db.js';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
// BD connection
connectDB();
// Routes

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express🎁🎁🎁!');
});

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
