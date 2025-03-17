import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnimatedRoutes from './components/AnimatedRoutes';
import Header from './components/Header';
import Landing from './pages/Landing';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};



export default function App() {
  useEffect(() => {
    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme && JSON.parse(storedTheme)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <ToastContainer />
      
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Rota pai para todas as páginas do app com header */}
        <Route path="/app/*" element={
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-rose-50/30 to-cyan-50/30 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <Header />
            <AnimatedRoutes />
          </div>
        } />
      </Routes>
    </Router>
  );
}