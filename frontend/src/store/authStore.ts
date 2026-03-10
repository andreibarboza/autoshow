import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AuthState {
  token: string | null;
  userEmail: string | null;
  setToken: (token: string, email: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      userEmail: null,
      setToken: (token, email) => set({ token, userEmail: email }),
      logout: () => set({ token: null, userEmail: null }),
      isAuthenticated: () => !!get().token,
    }),
    {
      name: 'autoshow-auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
