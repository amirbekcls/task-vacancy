 export interface SignUpTs{
    fullName: string;
    login: string;
    password: string;
    setFullName: (val: string) => void;
    setLogin: (val: string) => void;
    setPassword: (val: string) => void;
  }
  export interface RegisterData {
    fullName?: string;
    login: string;
    password: string;
}
