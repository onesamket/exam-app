// (auth)/SignInPage.tsx
import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Text from 'components/app-text';
import { Link, useRouter } from 'expo-router';
import useAuthStore from 'hooks/auth-provider';

const schema = z.object({
  username: z.string(),
  password: z.string().min(6),
});

type FormType = z.infer<typeof schema>;

const SignInPage = () => {
  const router = useRouter();
  const { onLogin, authState: { error, isAuthenticated } } = useAuthStore();
  const { control, handleSubmit, formState: { errors } } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormType) => {
    const result = await onLogin(data.username, data.password);
    if (result.success) router.push("/(tabs)/")
  };
  if (isAuthenticated) return router.push('/(tabs)/profile')
  return (
    <View
      className='flex flex-1 items-center justify-center flex-col w-screen px-5'
    >
      <Text classes='my-6 text-2xl flex w-full items-center justify-center'>Sign in here</Text>
      <View className='w-full'>
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              className='w-full border border-slate-500 px-5 py-2 rounded-md'
              placeholder='Username'
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
          name="username"
        />
        <View className='h-6'>
          {errors.username && <Text classes='text-red-500'>{errors.username.message}</Text>}
        </View>
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              secureTextEntry
              inputMode='email'
              className='w-full border border-slate-500 px-5 py-2 my-2 rounded-md'
              placeholder='*********'
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
          name="password"
        />
        <View className='h-6'>
          {errors.password && <Text classes='text-red-500'>{errors.password.message}</Text>}
        </View>
        <Pressable
          className='flex bg-blue-600 items-center justify-center px-5 py-2 rounded-md'
          onPress={handleSubmit(onSubmit)}
        >
          <Text classes='text-white'>Sign in</Text>
        </Pressable>
        <View className='h-6'>
          {error && <Text classes='text-red-500'>{error}</Text>}
        </View>
        <Link href={"/(auth)/forget-password"}>
          <Text classes='flex flex-end py-2 text-indigo-700'>forget password</Text>
        </Link>
      </View>
    </View>
  );
};

export default SignInPage;
