import { getQuestions } from 'api/question';
import { Answer, QuestionType } from 'types/Quiz';
import { create } from 'zustand';

type User = {
  username: string;
  name: string;
  score: string;
};

type Timer = {
  initialTime: number;
  start?: boolean;
  onClose?: () => void;
};

type StoreType = {
  time: Timer;
  score: number;
  currentQuestionIndex: number;
  answered: Answer[];
  questions: QuestionType[];
  category: string;
  loadQuestion: () => void;
  onPrev: () => void;
  onNext: () => void;
  onAnswer: (data: Answer) => void;
  onSubmit: (data: User) => void;
};

const loadExam = async () => {
  const data = await getQuestions();
  return data;
};

export const useQuestion = create<StoreType>((set) => ({
  time: {
    initialTime: 0,
    start: false,
    onClose: () => {
      set((state) => ({
        time: {
          ...state.time,
          initialTime: 0,
        },
      }));
    },
  },
  currentQuestionIndex: 0,
  answered: [],
  questions: [],
  category: '',
  score: 0,
  loadQuestion: async () => {
    const questionsData = await loadExam();
    set((state) => ({
      questions: questionsData,
      time: {
        initialTime: 10,
        start: true,
        onClose: () => {
          set({
            time: {
              initialTime: 0,
              start: false,
            },
            currentQuestionIndex: 0,
            answered: [],
            questions: [],
            category: '',
            score: 0,
          });
        },
      },
    }));
  },
  onPrev: () => {
    set((state) => ({ currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1) }));
  },
  onNext: () => {
    set((state) => ({
      currentQuestionIndex: Math.min(state.questions.length - 1, state.currentQuestionIndex + 1),
    }));
  },
  onAnswer: (data: Answer) => {
    set((state) => ({
      answered: [...state.answered, data],
      score: state.score + (data.correct ? 1 : 0),
    }));
  },
  onSubmit: (data: User) => {
    console.log('Submitting user result:', data);
  },
}));
