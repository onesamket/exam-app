import { Pressable, View } from 'react-native';
import Text from './app-text';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Result = () => {
  const router = useRouter();
  return (
    <View className="container flex-1 items-center justify-center ">
      <View
        style={{
          elevation: 7,
        }}
        className="w-1/2 items-center flex flex-col space-y-5">
        <Ionicons name="checkmark-circle" size={54} color={'#0a7204'} />
        <Text>Hi User</Text>
        <View>
          <Text>Your answer Submitted successfully</Text>
        </View>
      </View>
      <Pressable
        onPress={() => router.push('/(tabs)/')}
        className=" w-1/2 my-12 px-5 py-2 items-center rounded bg-blue-600">
        <Text classes="text-white">Back</Text>
      </Pressable>
    </View>
  );
};

export default Result;
