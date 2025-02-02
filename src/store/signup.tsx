import { create } from "zustand";
import {SignUpTs } from "../types/SignUp";

const SignUpStore = create<SignUpTs>((set) => ({
    fullName: '',
    login: '',
    password: '',
  
    setFullName: (val) => set((state) => ({ ...state, fullName: val })),
    setLogin: (val) => set((state) => ({ ...state, login: val })),
    setPassword: (val) => set((state) => ({ ...state, password: val })),
  }));
  
  export default SignUpStore;