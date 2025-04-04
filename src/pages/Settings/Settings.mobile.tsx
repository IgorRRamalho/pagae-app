import useLogout from '@hook/useLogout';
import { motion } from 'framer-motion';
import { Bell, CircleFadingPlus, Lock, LogOut, Moon, Sun, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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

const SettingsMobile: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        name: 'Zé da Pizza',
        email: 'zedapizza@exemplo.com',
        phone: '(11) 98765-4321'
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [hasUpdate, setHasUpdate] = useState(false);
    const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
    const [appVersion] = useState(import.meta.env.VITE_APP_VERSION || '1.0.0');
    const [buildDate] = useState(import.meta.env.VITE_BUILD_DATE || new Date().toISOString());
    const logout = useLogout();

    useEffect(() => {
        // Configurar dark mode
        const isDark = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDark);
        document.documentElement.classList.toggle('dark', isDark);

        // Registrar Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/sw.js')
                .then((reg) => {
                    setRegistration(reg);
                    reg.addEventListener('updatefound', () => {
                        const newWorker = reg.installing;
                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    setHasUpdate(true);
                                }
                            });
                        }
                    });
                })
                .catch((err) => console.log('Service Worker registration failed:', err));

            // Ouvir mensagens do Service Worker
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data.type === 'UPDATE_AVAILABLE') {
                    setHasUpdate(true);
                }
            });

            // Verificar atualizações periodicamente
            const checkInterval = setInterval(() => {
                registration?.update().catch(console.error);
            }, 3600000); // A cada hora

            return () => clearInterval(checkInterval);
        }
    }, []);

    useEffect(() => {
        // Ouvir mudanças no controlador
        const controllerChangeHandler = () => {
            window.location.reload();
        };

        navigator.serviceWorker.addEventListener('controllerchange', controllerChangeHandler);
        return () => {
            navigator.serviceWorker.removeEventListener('controllerchange', controllerChangeHandler);
        };
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', String(newMode));
        document.documentElement.classList.toggle('dark', newMode);
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

    const handleUpdateApp = () => {
        if (registration?.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            toast.info('Aplicativo atualizado! Recarregando...');
            setTimeout(() => window.location.reload(), 2000);
        }
    };

    return (
        <div className="min-h-screen p-4 pb-32">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-lg mx-auto"
            >
                {/* Cabeçalho Mobile */}
                <div className="top-0 z-10 pt-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <User className="w-6 h-6 text-purple-700 dark:text-purple-300" />
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Configurações
                                {hasUpdate && (
                                    <span className="relative ml-2">
                                        <span className="absolute w-2 h-2 bg-red-500 rounded-full -top-1 -right-1 animate-pulse" />
                                        ⚙️
                                    </span>
                                )}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Seção de Atualização PWA */}
                {hasUpdate && (
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="flex items-start gap-3 p-4 mb-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
                    >
                        <CircleFadingPlus className="flex-shrink-0 w-6 h-6 text-blue-600 dark:text-blue-400" />
                        <div>
                            <p className="mb-2 font-medium dark:text-white">Nova versão disponível!</p>
                            <p className="mb-3 text-sm text-blue-700 dark:text-blue-300">
                                Uma nova versão do aplicativo está pronta para instalação
                            </p>
                            <button
                                onClick={handleUpdateApp}
                                className="px-4 py-2 text-sm text-white transition-transform bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95"
                            >
                                Instalar Atualização
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Seção Perfil Mobile */}
                <motion.section
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="p-4 mb-6 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-xl dark:border-gray-700"
                >
                    <h2 className="flex items-center gap-2 mb-4 text-lg font-bold dark:text-white">
                        <User className="w-5 h-5 text-purple-600" />
                        <span>Seu Perfil</span>
                    </h2>

                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="space-y-3">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium dark:text-gray-300">
                                    Nome Completo
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={userData.name}
                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                    className={`w-full px-3 py-2 rounded-lg border ${formErrors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                                        } focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white`}
                                    placeholder="Ex: Zé da Pizza"
                                />
                                {formErrors.name && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                    className={`w-full px-3 py-2 rounded-lg border ${formErrors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                                        } focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white`}
                                    placeholder="zedapizza@exemplo.com"
                                />
                                {formErrors.email && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium dark:text-gray-300">
                                    Telefone
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={userData.phone}
                                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                    className={`w-full px-3 py-2 rounded-lg border ${formErrors.phone ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                                        } focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white`}
                                    placeholder="(00) 00000-0000"
                                />
                                {formErrors.phone && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                                )}
                            </div>
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-700 to-pink-600 text-white py-2.5 px-4 rounded-lg
                        font-medium active:scale-95 transition-transform"
                        >
                            Salvar Alterações
                        </motion.button>
                    </form>
                </motion.section>

                {/* Configurações Gerais Mobile */}
                <div className="space-y-4">
                    {/* Modo Noturno */}
                    <div className="p-4 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-xl dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {darkMode ? (
                                    <Moon className="w-5 h-5 text-purple-600" />
                                ) : (
                                    <Sun className="w-5 h-5 text-purple-600" />
                                )}
                                <span className="dark:text-white">Modo Noturno</span>
                            </div>
                            <button
                                onClick={toggleDarkMode}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-purple-600' : 'bg-gray-200'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Notificações */}
                    <div className="p-4 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-xl dark:border-gray-700">
                        <h3 className="flex items-center gap-2 mb-3 text-lg font-medium dark:text-white">
                            <Bell className="w-5 h-5 text-purple-600" />
                            Notificações
                        </h3>
                        <div className="space-y-2">
                            {[
                                { label: 'Lembretes de cobrança', id: 'cobrancas' },
                                { label: 'Alertas de pagamentos', id: 'alertas' },
                                { label: 'Novidades do PagAê', id: 'novidades' },
                            ].map((item) => (
                                <div key={item.id} className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id={item.id}
                                        defaultChecked
                                        className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                    />
                                    <label htmlFor={item.id} className="text-sm dark:text-gray-300">
                                        {item.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ações Importantes */}
                    <div className="p-4 space-y-3 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-xl dark:border-gray-700">
                        <button
                            onClick={logout}
                            className="flex items-center w-full gap-3 p-2 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-gray-700 active:scale-95"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Sair da Conta</span>
                        </button>

                        <div className="flex items-start gap-3 p-3 bg-yellow-100 rounded-lg dark:bg-yellow-900/20">
                            <Lock className="w-5 h-5 mt-1 text-yellow-600" />
                            <div>
                                <p className="text-sm font-medium dark:text-white">Segurança Avançada</p>
                                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                                    Criptografia de ponta a ponta e proteção contra fraudes
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Informações do PWA */}
                    <div className="p-4 g-gray-100 dark:bg-gray-700 rounded-xl">
                        <p className="text-xs text-center text-gray-600 dark:text-gray-300">
                            Versão {appVersion} • {new Date(buildDate).toLocaleDateString('pt-BR')} •
                            <button
                                onClick={() => registration?.update().then(() => toast.info('Verificando atualizações...'))}
                                className="ml-2 text-purple-600 dark:text-purple-400 hover:underline"
                            >
                                Verificar atualizações
                            </button>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SettingsMobile;