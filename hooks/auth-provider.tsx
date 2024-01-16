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

const useAuth = create<AuthStore>((set) => ({
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
        set((state) => ({
          authState: {
            ...state.authState,
            user: result.data.user,
            token: result.data.token,
            isAuthenticated: true,
            error: null,
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
        error: null,
      },
    }));
  },
  init: async () => {
    try {
      const session = await LoadSession('token');
      if (session) {
        console.log(session)
        const userDataResult = await apiClient.get('/user/profile', {
          headers: { Authorization: `token ${session}` },
        });

        if (userDataResult && userDataResult.data) {
          const userData = userDataResult.data;
          console.log(userData)
          set((state) => ({
            authState: {
              ...state.authState,
              user: userData,
              token: session,
              isAuthenticated: true,
              error: null,
            },
          }));
        }
      }
    } catch (error) {
      console.error('something wants wrong', error);
      set((state) => ({
        authState: {
          ...state.authState,
          error: 'something wants wrong!',
        },
      }));
    }
  },
}));

export default useAuth;
