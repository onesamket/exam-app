import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import Text from 'components/app-text';
import Timer from 'components/timer';
import { Link, Redirect, Tabs } from 'expo-router';
import useAuth from 'hooks/auth-provider';
import { useEffect } from 'react';
import { Pressable } from 'react-native';

export default function TabLayout() {
  const { authState: { isAuthenticated, user } } = useAuth();
  const { init } = useAuth();
  const loadToken = async () => {
    await init();
  }
  useEffect(() => {
    loadToken();
  }, [])
  // redirect the user if  he is not logged in 
  if (!isAuthenticated) return Redirect({ href: '/(auth)/login' });
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          headerLeft: () => <Text classes='ml-10 text-xl'>Well Come {user?.name} </Text>,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
          headerRight: () => (
            <Link
              className=' flex items-center justify-center  w-10 bg-slate-300  h-10 mx-5 rounded-full'
              href="/modal" asChild>
              <Pressable>
                <Text
                  classes='text-xl'
                >{user?.name.substring(0, 2).toUpperCase()}</Text>
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
            <Link
              className=' flex items-center justify-center  w-10 bg-slate-300  h-10 mx-5 rounded-full'
              href="/modal" asChild>
              <Pressable>
                <Text
                  classes='text-xl'
                >{user?.name.substring(0, 2).toUpperCase()}</Text>
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

