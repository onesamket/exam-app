import { Router } from 'express';
import { prisma } from '../prisma/lib/prisma';

const QuizRouter = Router();

QuizRouter.get('/', async (req, res) => {
  const department = req.query.department;
  const quizzes = await prisma.question.findMany({
    include: {
      options: true,
    },
    where: {
      category: department as string,
    },
  });
  res.json({ data: quizzes });
});

export default QuizRouter;
