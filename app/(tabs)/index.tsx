import { View } from 'react-native';

import { GuideLine } from 'components/guide-line';

export default function TabOneScreen() {
  return (
    <View className={styles.container}>
      {/* display simple guideline for the user  */}
      <GuideLine />
    </View>
  );
}

const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
