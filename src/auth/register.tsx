import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'http://45.138.158.137:92/api/';
const RegApi = `${BASE_URL}auths/sign-up`;

interface RegisterData {
  fullName: string;
  login: string;
  password: string;
}

const mutationFn = async (userData: RegisterData) => {
  const response = await axios.post(RegApi, userData);
  return response.data;
};

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<RegisterData>({
    fullName: '',
    login: '',
    password: '',
  });

  const { mutate, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn,
    onSuccess: () => {
      navigate('/login');
    },
    onError: (err: any) => {
      console.error('Registration failed:', err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(userData); 
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6">Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm mb-1">Ф.И.О</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Введите Ф.И.О"
            value={userData.fullName}
            onChange={(e) =>
              setUserData({ ...userData, fullName: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Логин</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Введите логин"
            value={userData.login}
            onChange={(e) =>
              setUserData({ ...userData, login: e.target.value })
            }
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Пароль</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Введите пароль"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#95C11F] text-white py-2 rounded-md hover:bg-[#86AD1B] transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Регистрируется...' : 'Регистрировать'}
        </button>

        {isError && (
          <p className="text-red-500 text-sm mt-4">Error: {error?.message}</p>
        )}

        {isSuccess && <p className="text-green-500 text-sm mt-4">Success!</p>}

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:underline text-sm"
          > 
            Уже есть аккаунт? Войти
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
