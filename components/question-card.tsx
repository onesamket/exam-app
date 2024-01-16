import { Pressable, View } from 'react-native';
import React, { useState } from 'react';
import { Answer, Option } from 'types/Quiz';
import Text from './app-text';

type Props = {
  question: string;
  questionNumber: number;
  options: Option[];
  onAnswer: (data: Answer) => void;
};

const QuestionCard = ({ options, question, questionNumber, onAnswer }: Props) => {
  const [selected, setSelect] = useState<string | undefined>(undefined);

  return (
    <View>
      <Text classes="text-xl py-2 text-justify">
        {questionNumber}
        {'. '}
        {question}
      </Text>
      <View>
        {options.map((question) => (
          <Pressable
            key={question.id}
            className={`border  p-2 my-1 rounded ${selected && selected === question.id ? 'border-green-400' : 'border-slate-400'}`}
            onPress={() => {
              setSelect(question.id);
              onAnswer({
                id: question.id,
                question: question.label,
                value: question.value,
                correct: question.isCorrect,
              });
            }}>
            <Text classes="">
              {question.label}. {question.value}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default QuestionCard;
