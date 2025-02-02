import { create } from "zustand";
import { CompaniesTs } from "../types/companies";

export const CompaniesStore = create<CompaniesTs>((set) => ({
    name:'',
    count:0,
    setName: (val: string) => set({ name: val }),
    setCount: (val: number) => set({ count: val }),
}))