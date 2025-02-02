import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import AuthPage from './authpage';
import { RegApi } from '../api/api';
import { RegisterData } from '../types/SignUp';
import SignUpStore from '../store/signup';

const mutationFn = async (userData: RegisterData) => {
  const response = await axios.post(RegApi, userData);
  return response.data;
};

const Register = () => {
  const navigate = useNavigate();
  const {fullName,login,password,setFullName,setLogin,setPassword} = SignUpStore()

  const { mutate, isError, error, isSuccess } = useMutation({
    mutationFn,
    onSuccess: () => {
      navigate('/login');
    },
    onError: (err: Error) => {
      console.error('Registration failed:', err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({fullName,login,password});
  };

  return (
    <AuthPage>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Регистрация</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Ф.И.О</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Введите Ф.И.О"
              value={fullName}
              onChange={(e) => setFullName(e.target.value )
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Логин</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Введите логин"
              value={login}
              onChange={(e) => setLogin(e.target.value )}

            />
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-1">Пароль</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value )}

            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#95C11F] text-white py-2 rounded-md hover:bg-[#86AD1B] transition-colors"
          >
            Регистрировать
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
    </AuthPage>
  );
};

export default Register;
