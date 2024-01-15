import { Router } from "express";
import { prisma } from "../prisma/lib/prisma";

const QuizRouter = Router();

QuizRouter.get("/", async (_res, res) => {
  const quizzes = await prisma.question.findMany({
    include: {
      options: true,
    },
  });
  res.json({ data: quizzes });
});

export default QuizRouter;
