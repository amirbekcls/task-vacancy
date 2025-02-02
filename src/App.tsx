import {Route, Routes, useNavigate } from 'react-router-dom';
import './index.css';  // Tailwind CSS ni import qilish
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Register from './auth/register';
import Login from './auth/login';
import Companies from './pages/companies/companies';
import { useEffect } from 'react';
const queryClient = new QueryClient()
function App() {
  let token = sessionStorage.getItem('token')
  let navigate = useNavigate()
  useEffect(() => {
    if(!token){
      navigate("/login")
    }else{
      navigate('companies')
    }
  } ,[token])
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen flex justify-center items-center">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/companies" element={<Companies />} />
          </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
