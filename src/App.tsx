import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';

export default function App() {
  useEffect(() => {
    // Recupera a preferência de tema do localStorage
    const storedTheme = localStorage.getItem('darkMode');
    // Se estiver definido e for true, adiciona a classe "dark" ao <html>
    if (storedTheme && JSON.parse(storedTheme)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Home />} />
      </Routes>
    </Router>
  );
}
