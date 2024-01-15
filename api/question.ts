import { QuestionType } from 'types/Quiz';
import apiClient from './end-point';

export const getQuestions = async () => {
  const res = await apiClient.get('/questions');
  return res.data.data as QuestionType[];
};
