import { View, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { useQuestion } from 'hooks/quiz';
import QuestionCard from 'components/question-card';
import Text from 'components/app-text';
import { AntDesign } from '@expo/vector-icons';

const ExamPage = () => {
    const { questions, time, onNext, onPrev, currentQuestionIndex, loadQuestion, onAnswer, score } =
        useQuestion();

    useEffect(() => {
        loadQuestion();
    }, []);

    if (questions.length === 0) {
        return <Text>Loading questions...</Text>;
    }

    return (
        <>
            {time.initialTime !== 0 ?
                <View className="p-5 flex justify-between">
                    <View className="bg-blue-400 px-5 py-3  mb-4 rounded text-center">
                        <Text classes="text-center text-white">
                            {currentQuestionIndex + 1}/ {questions.length} Question
                        </Text>
                        <Text classes="text-center text-white">Score: {score}</Text>
                    </View>
                    <View className="h-1/2">
                        <QuestionCard
                            questionNumber={currentQuestionIndex + 1}
                            question={questions[currentQuestionIndex].question}
                            options={questions[currentQuestionIndex].options}
                            onAnswer={onAnswer}
                        />
                    </View>
                    <View className="w-full my-12 flex flex-row justify-around">
                        {currentQuestionIndex > 0 && (
                            <Pressable className="py-2 px-8 bg-black rounded" onPress={() => onPrev()}>
                                <Text classes="text-white">Prev</Text>
                            </Pressable>
                        )}
                        <Pressable
                            className="py-2 px-5 bg-blue-600 rounded"
                            onPress={currentQuestionIndex + 1 === questions.length ? () => onNext() : () => onNext()}>
                            <Text classes="text-white">
                                {currentQuestionIndex + 1 === questions.length ? 'Finish' : 'Next'}
                            </Text>
                        </Pressable>
                    </View>
                </View>
                :
                <View className='flex items-center h-screen space-y-2 justify-center'>
                    <AntDesign name="warning" size={45} color="red" />
                    <Text classes='text-2xl text-center'>Time is Up!</Text>
                </View>


            }
        </>

    );
};

export default ExamPage;
