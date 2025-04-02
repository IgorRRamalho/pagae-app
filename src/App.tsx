import AnimatedRoutes from '@components/AnimatedRoutes';
import PrivateRoute from '@components/Auth/PrivateRoute';
import PublicRoute from '@components/Auth/PublicRoute';
import Header from '@components/Navigation';
import PageTransition from '@components/PageTransition';
import PWAInstall from '@components/PWAInstaller';
import AccessRequired from '@pages/AccessRequired';
import Auth from '@pages/AuthPage';
import CreateAccountViaToken from '@pages/CreateAccountViaToken';
import Landing from '@pages/Landing';

import NotFound from '@pages/NotFound';
import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const routeConfig = [
  {
    path: '/',
    element: <Landing />,
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
    path: '/link-criar-conta/:token',
    element: <CreateAccountViaToken />
  },
  {
    path: '/app/*',
    private: true,
    element: (
      <div className="min-h-screen transform transition-all duration-300 bg-gradient-to-b from-purple-50 to-blue-50  dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
        autoClose={3000}
        theme="colored"
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <PWAInstall />

      <Routes>
        {routeConfig.map((route, index) => {
          const shouldTransition = !route.path?.includes('/app/*');
          let element = route.element;
          if (shouldTransition) {
            element = <PageTransition>{element}</PageTransition>;
          }

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