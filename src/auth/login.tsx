import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSignInStore } from "../store/signin";

const Login = () => {
  const navigate = useNavigate();

  // Store'dan login va password ni olish
  const { login, password, setLogin, setPassword } = useSignInStore();

  // Mutationni yaratish
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: { login: string; password: string }) => {
      const response = await axios.post('http://45.138.158.137:92/api/auths/sign-in', data);
      return response.data;
    },
    onSuccess: () => {
      alert('Kirish muvaffaqiyatli!');
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
    <div className="bg-white p-8 rounded-lg shadow-md w-[430px]">
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
          {isLoading ? "Loading..." : "Вход"}
        </button>
      </form>
    </div>
  );
};

export default Login;
