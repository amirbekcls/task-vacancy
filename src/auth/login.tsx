import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSignInStore } from "../store/signin";
import { message } from "antd";
import AuthPage from "./authpage";
import { LoginApi } from "../api/api";
import { RegisterData } from "../types/SignUp";

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); 
  const { login, password, setLogin, setPassword } = useSignInStore();
  const { mutate } = useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await axios.post(LoginApi, data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data) {
        sessionStorage.setItem('token', data)
      }
      message.success('Tizimga kirildi!');
      queryClient.invalidateQueries({queryKey:['companies']})
      console.log(data);
      navigate('/companies');
  },
    onError: (error) => {
      alert(`Kirishda xatolik: ${error.message}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ login, password });
  };

  return (
    <AuthPage>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[430px] mx-auto items-center">
          <h1 className="text-2xl font-bold mb-6">Вход</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm mb-1">Логин</label>
              <input
                type="text"
                name="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Введите логин"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-1">Пароль</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Введите пароль"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#95C11F] text-white py-2 rounded-md hover:bg-[#86AD1B] transition-colors"
            >
              Вход
            </button>
          </form>
          <div className="flex justify-center py-4 gap-1">
            <p>Ещё нет аккаунта?</p>
            <button
              onClick={() => navigate('/register')}
              className="text-[#95C11F] hover:underline "
            >
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    </AuthPage>
  );
};

export default Login;
