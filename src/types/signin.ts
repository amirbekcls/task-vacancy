export interface LoginData {
  login: string;
  password: string;
  setLogin: (val: string) => void;
  setPassword: (val: string) => void;
}