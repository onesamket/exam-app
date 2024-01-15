import * as SecureStore from 'expo-secure-store';

export async function saveSession(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export const deleteSession = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};

export const LoadSession = async (key: string) => {
  return SecureStore.getItemAsync('token');
};
