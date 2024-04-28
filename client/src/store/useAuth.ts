import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthUserInfo = {
  id: string;
  name: string;
  email: string;
  accessToken: string;
};

type UseAuthContext = {
  user: AuthUserInfo | null;
  saveUserInfor: (data: AuthUserInfo) => void;
  clearUserInfor: () => void;
};

const useAuth = create<UseAuthContext>()(
  persist(
    (set) => ({
      user: null,
      saveUserInfor: (data: AuthUserInfo) => {
        set((state) => ({ ...state, user: data }));
      },
      clearUserInfor: () => {
        set((state) => ({ ...state, user: null }));
      },
    }),
    {
      name: "auth-state", // Optional persistence storage name (default is 'zustand-store'),
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuth;
