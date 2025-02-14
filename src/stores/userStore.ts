import { create } from "zustand";
import { User } from "oidc-client-ts";

interface UserStore {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  isAuthenticated: false,
  currentUser: null,
  login: (user: User) =>
    set(() => ({ isAuthenticated: true, currentUser: user })),
  logout: () => set(() => ({ isAuthenticated: false, currentUser: null })),
}));

export { useUserStore };
