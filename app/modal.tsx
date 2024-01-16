import PersonalInfo from 'components/personal-info';
import { View } from 'react-native';

export default function ModalScreen() {
  return (
    <View className={styles.container}>
      <PersonalInfo />
    </View>
  );
}

const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
