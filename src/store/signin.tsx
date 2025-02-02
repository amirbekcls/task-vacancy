import { create } from "zustand";
import { LoginData } from "../types/signin";

// Store'da LoginData turini aniqlaymiz


export const useSignInStore = create<LoginData>((set) => ({
  login: '',
  password: '',
  setLogin: (val: string) => set({ login: val }),
  setPassword: (val: string) => set({ password: val }),
}));
