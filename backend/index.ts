import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import QuizRouter from './routes/QuizRouter';
import userRouter from './routes/userRoute';

dotenv.config();
const PORT = process.env.PORT;
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing
app.get('/', (_req, res) => {
  res.send('it works');
});
app.use('/questions', QuizRouter);

app.use('/user', userRouter);

// start server
app.listen(PORT, () => console.log(`🚀 server running on port ${PORT}`));
