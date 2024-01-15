export type QuestionType = {
  id: number;
  question: string;
  category: string;
  options: Option[];
};

export type Option = {
  id: string;
  label: string;
  value: string;
  isCorrect: boolean;
  questionId: number;
};

export type Answer = {
  id: string;
  question: string;
  value: string;
  correct: boolean;
};
