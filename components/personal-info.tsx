import { Pressable, View } from 'react-native';
import React from 'react';
import Text from './app-text';
import { useRouter } from 'expo-router';

const PersonalInfo = () => {
  const router = useRouter();
  return (
    <View className="flex flex-1 items-center  justify-center">
      <View>
        <Text classes="text-2xl py-3"> Your Detail</Text>
        <Text>Name:Abebe Kebede</Text>
        <Text>Collage:CCI</Text>
        <Text>Department:SWE</Text>
        <Text>UID:239737</Text>
        <Text>Total Exam :102 Questions</Text>
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
