import { useState } from 'react';
import { toast } from 'react-toastify';
import useDarkMode from '@hook/useDarkMode';

interface UserData {
    name: string;
    email: string;
    phone: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
}

export const useSettings = () => {
    const [isDarkMode, setIsDarkMode] = useDarkMode();
    const [userData, setUserData] = useState<UserData>({
        name: 'Zé da Pizza',
        email: 'zedapizza@exemplo.com',
        phone: '(11) 98765-4321'
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        const errors: FormErrors = {};

        if (!userData.name.trim()) errors.name = 'Nome é obrigatório';
        if (!/^\S+@\S+\.\S+$/.test(userData.email)) errors.email = 'Email inválido';
        if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(userData.phone)) errors.phone = 'Telefone inválido';

        if (Object.keys(errors).length === 0) {
            toast.success('Perfil atualizado! Seus dados estão safe 🛡️');
            setFormErrors({});
        } else {
            setFormErrors(errors);
        }
    };

    return {
        darkMode: isDarkMode,
        userData,
        setUserData,
        formErrors,
        toggleDarkMode,
        handleProfileUpdate
    };
}; 