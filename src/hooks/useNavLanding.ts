import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export const navLinks = [
    { id: 'about', label: '🏢 Sobre nós' },
    { id: 'recursos', label: '✨ Recursos' },
    { id: 'depoimentos', label: '💬 Depoimentos' }
];

export function useNavLanding() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    const handleNavigation = (id: string) => {
        if (id === 'about') {
            navigate('/about');
            return;
        }
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleAuth = () => {
        navigate(isLoggedIn ? '/app' : '/auth');
    };

    return {
        isLoggedIn,
        handleNavigation,
        handleAuth
    };
} 