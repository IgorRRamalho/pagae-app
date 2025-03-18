import AccessRequired from '@pages/AccessRequired ';
import NotFound from '@pages/NotFound';
import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnimatedRoutes from './components/AnimatedRoutes';
import PrivateRoute from './components/Auth/PrivateRoute';
import PublicRoute from './components/Auth/PublicRoute';
import Header from './components/Header';
import PageTransition from './components/PageTransition';
import Auth from './pages/AuthPage';
import Landing from './pages/Landing';

const routeConfig = [
  {
    path: '/',
    element: <Landing />,
    public: true,
  },
  {
    path: '/auth',
    element: <Auth />,
    public: true,
  },
  {
    path: '/access-required',
    public: true,
    element: <AccessRequired />,
  },
  {
    path: '/app/*',
    private: true,
    element: (
      <div className="min-h-screen transform transition-all duration-300 bg-gradient-to-br from-gray-50/50 via-white to-gray-100/50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />
        <AnimatedRoutes />
      </div>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default function App() {
  useEffect(() => {
    const storedTheme = localStorage.getItem('darkMode');
    document.documentElement.classList.toggle('dark', storedTheme === 'true');
  }, []);

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="colored"
        newestOnTop
        closeOnClick
        pauseOnHover
      />

      <Routes>
        {routeConfig.map((route, index) => {
          let element = (
            <PageTransition>
              {route.element}
            </PageTransition>
          );

          if (route.public) {
            element = <PublicRoute>{element}</PublicRoute>;
          } else if (route.private) {
            element = <PrivateRoute>{element}</PrivateRoute>;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={element}
            />
          );
        })}
      </Routes>
    </Router>
  );
}