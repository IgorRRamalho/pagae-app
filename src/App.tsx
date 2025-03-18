import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnimatedRoutes from './components/AnimatedRoutes';
import Header from './components/Header';
import Landing from './pages/Landing';
import Auth from './pages/AuthPage';
import PageTransition from './components/PageTransition';


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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        {/* Rota da Landing Page */}
        <Route
          path="/"
          element={
            <PageTransition>
              <Landing />
            </PageTransition>
          }
        />

        {/* Rota de Autenticação */}
        <Route
          path="/auth"
          element={
            <PageTransition>
              <Auth />
            </PageTransition>
          }
        />


        {/* Rota pai para todas as páginas do app com header */}
        <Route
          path="/app/*"
          element={
            <div className="min-h-screen transform transition-all duration-300 bg-gradient-to-br from-gray-50/50 via-white to-gray-100/50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
              <Header />
              <AnimatedRoutes />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}