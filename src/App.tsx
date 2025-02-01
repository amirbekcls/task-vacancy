import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';  // Tailwind CSS ni import qilish
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Register from './auth/register';
import Login from './auth/login';
import Companies from './companies/companies';
const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen flex justify-center items-center">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/companies" element={<Companies />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
