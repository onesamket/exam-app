import { create } from 'zustand';
import apiClient from 'api/end-point';
import { LoadSession, deleteSession, saveSession } from 'lib/storage';


type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean | null;
  error: string | null;
};

type AuthStore = {
  authState: AuthState;
  onLogin: (username: string, password: string) => Promise<any>;
  onLogout: () => void;
  init: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  authState: {
    user: null,
    token: null,
    isAuthenticated: null,
    error: null,
  },
  onLogin: async (username, password) => {
    try {
      const result = await apiClient.post('/user/login', { username, password });

      if (result && result.data) {
        const userData = result.data.user; // Assuming the user data is available in the response
        set((state) => ({
          authState: {
            ...state.authState,
            user: userData,
            token: result.data.token,
            isAuthenticated: true,
            error: null, // Reset error on successful login
          },
        }));
        await saveSession('token', result.data.token);
        return { success: true };
      }
    } catch (error) {
      console.error('Login error:', error);

      // Set the error message in the state
      set((state) => ({
        authState: {
          ...state.authState,
          error: 'Invalid credentials',
        },
      }));

      return { success: false, message: 'Invalid credentials!' };
    }
  },
  onLogout: () => {
    deleteSession('token');
    set((state) => ({
      authState: {
        user: null,
        token: null,
        isAuthenticated: null,
        error: null, // Reset error on logout
      },
    }));
  },
  init: async () => {
    try {
      const session = await LoadSession('token');
      if (session) {
        console.log(session)
        // Fetch user data based on the token
        const userDataResult = await apiClient.get('/user/profile', {
          headers: { Authorization: `Bearer ${session}` },
        });

        if (userDataResult && userDataResult.data) {
          const userData = userDataResult.data;
          set((state) => ({
            authState: {
              ...state.authState,
              user: userData,
              token: session,
              isAuthenticated: true,
              error: null, // Reset error on successful init
            },
          }));
        }
      }
    } catch (error) {
      console.error('something wants wrong', error);
      // Set the error message in the state
      set((state) => ({
        authState: {
          ...state.authState,
          error: 'something wants wrong!',
        },
      }));
    }
  },
}));

export default useAuthStore;
