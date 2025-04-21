import useLogout from '@hook/useLogout';
import { motion } from 'framer-motion';
import { Bell, Lock, LogOut, Moon, Sun, User } from 'lucide-react';
import { useSettings } from './useSettings';

const SettingsDesktop: React.FC = () => {
    const {
        darkMode,
        userData,
        setUserData,
        formErrors,
        toggleDarkMode,
        handleProfileUpdate
    } = useSettings();
    
    const logout = useLogout();

    return (
        <div className="min-h-screen">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl mx-auto mt-6"
            >
                {/* Cabeçalho */}
                <div className="mb-8">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <User className="w-8 h-8 text-purple-700 dark:text-purple-300" />
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Configurações
                                <span className="ml-2">⚙️</span>
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Seção Perfil */}
                <motion.section
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="p-6 mb-8 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700"
                >
                    <h2 className="flex items-center gap-2 mb-6 text-xl font-bold dark:text-white">
                        <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                            Seu Perfil
                        </span>
                    </h2>

                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium dark:text-gray-300">
                                    Nome Completo
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={userData.name}
                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
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
                                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
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
                                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.phone ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                                        } focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white`}
                                    placeholder="(00) 00000-0000"
                                />
                                {formErrors.phone && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                                )}
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            type="submit"
                            className="w-full px-6 py-3 font-medium text-white rounded-lg bg-gradient-to-r from-purple-700 to-pink-600 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                            Salvar Alterações
                        </motion.button>
                    </form>
                </motion.section>

                {/* Configurações Gerais */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="grid gap-6"
                >
                    {/* Modo Escuro */}
                    <div className="p-6 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {darkMode ? (
                                    <Moon className="w-6 h-6 text-purple-600" />
                                ) : (
                                    <Sun className="w-6 h-6 text-purple-600" />
                                )}
                                <span className="font-medium dark:text-white">Modo Noturno</span>
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
                    <div className="p-6 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                        <h3 className="flex items-center gap-2 mb-4 text-lg font-medium dark:text-white">
                            <Bell className="w-6 h-6 text-purple-600" />
                            Notificações
                        </h3>
                        <div className="space-y-3">
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
                                    <label htmlFor={item.id} className="dark:text-gray-300">
                                        {item.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ações Importantes */}
                    <div className="p-6 space-y-4 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                        <button
                            onClick={logout}
                            className="flex items-center w-full gap-3 p-3 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-gray-700"
                        >
                            <LogOut className="w-6 h-6" />
                            <span className="font-medium">Sair da Conta</span>
                        </button>

                        <div className="flex items-center gap-3 p-3 bg-yellow-100 rounded-lg dark:bg-yellow-900/20">
                            <Lock className="w-6 h-6 text-yellow-600" />
                            <div>
                                <p className="font-medium dark:text-white">Segurança Máxima</p>
                                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                    Seus dados estão protegidos com criptografia de ponta a ponta
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SettingsDesktop;