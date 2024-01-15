import { useFonts } from 'expo-font';
import { Pressable, View } from 'react-native';
import Text from './app-text';
export function GuideLine() {
  return (
    <View className={styles.container}>
      <View>
        <View>
          <Text classes="ml-12 my-2 py-5 text-xl">Before you start </Text>
          <Text>1. Don't leave the application</Text>
          <Text>2. Make sure your internet is reliable"</Text>
        </View>
        <Pressable className="px-5  py-2 rounded text-center bg-blue-600 my-12 focus:bg-blue-400">
          <Text classes="text-center  text-white">Start Exam</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
