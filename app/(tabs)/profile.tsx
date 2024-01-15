import { View } from 'react-native'
import React from 'react'
import PersonalInfo from 'components/personal-info'

const ProfilePage = () => {
  return (
    <View className={styles.container}>
      <PersonalInfo />
    </View>
  )
}

export default ProfilePage
const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
