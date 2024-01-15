import { Stack } from "expo-router";

const AuthLayout = () => {

  return <Stack screenOptions={{
    headerShown: false,
  }}>
    <Stack.Screen name='login' options={{
    }} />
  </Stack>;
};

export default AuthLayout;
