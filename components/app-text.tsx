import React from 'react';
import { View, Text as AppText } from 'react-native';
import { useFonts } from 'expo-font';

const Text = ({ children, classes }: { children: React.ReactNode; classes?: string }) => {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../assets/font/inter-font.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <AppText style={{ fontFamily: 'Inter-Black' }} className={classes}>
        {children}
      </AppText>
    </View>
  );
};

export default Text;
