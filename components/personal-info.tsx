import { Pressable, View } from 'react-native';
import React, { useEffect } from 'react';
import Text from './app-text';
import { useRouter } from 'expo-router';
import useAuthStore from 'hooks/auth-provider';
import { useQuestion } from 'hooks/quiz-provider';

const PersonalInfo = () => {
  const { authState: { user } } = useAuthStore();
  const { loadQuestion, questions } = useQuestion();
  useEffect(() => {
    loadQuestion(user?.department!, questions.length * 60);
  }, [])
  const router = useRouter();
  return (
    <View className="flex flex-1 items-center  justify-center">
      <View>
        <Text classes="text-2xl py-3"> Your Detail</Text>
        <Text>Name:{user?.name}</Text>
        <Text>Collage:{user?.college}</Text>
        <Text>Department:{user?.department}</Text>
        <Text>Total Exam :{questions.length} Questions</Text>
        <Text>time allowed {questions.length}:00 {" "} Minutes</Text>
      </View>
      <Pressable
        onPress={() => router.push('/(tabs)/profile')}
        className="w-2/3  my-5 px-5 py-2 rounded bg-blue-500 ">
        <Text classes="text-white text-center">Your exam start soon</Text>
      </Pressable>
    </View>
  );
};

export default PersonalInfo;
