import { QuestionType } from 'types/Quiz';
import apiClient from './end-point';

export const getQuestions = async (dep: string) => {
  const res = await apiClient.get(`/questions?department=${dep}`);
  console.log(res.data);
  return res.data.data as QuestionType[];
};
