import { create } from "zustand";

// Store'da LoginData turini aniqlaymiz
export interface LoginData {
  login: string;
  password: string;
  setLogin: (val: string) => void;
  setPassword: (val: string) => void;
}

export const useSignInStore = create<LoginData>((set) => ({
  login: '',
  password: '',
  setLogin: (val: string) => set({ login: val }),
  setPassword: (val: string) => set({ password: val }),
}));
