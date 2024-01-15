import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import Text from 'components/app-text';
import Timer from 'components/timer';
import { Link, Redirect, Tabs } from 'expo-router';
import useAuthStore from 'hooks/auth-provider';
import { useEffect } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

export default function TabLayout() {
  const { authState, init } = useAuthStore();
  if (!authState?.isAuthenticated) Redirect({ href: '/(auth)/login' });
  const loadToken = async () => {
    await init();
  }
  useEffect(() => {
    loadToken();
  }, [])
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                <Image
                  className="w-10 h-10 mx-5 rounded-full"
                  source={{ uri: 'https://github.com/onesamket.png' }}
                />
              </Pressable>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="exam"
        options={{
          title: "",
          headerRight: () => <Timer />,
          headerLeft: () => <Text classes='ml-10 text-xl'>Exam </Text>,
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="question" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"

        options={{
          headerLeft: () => <Text classes='ml-5 text-xl'>Profile </Text>,
          title: '',
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                <Image
                  className="w-10 h-10 mx-5 rounded-full"
                  source={{ uri: 'https://github.com/onesamket.png' }}
                />
              </Pressable>
            </Link>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

