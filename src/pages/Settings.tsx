import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Lock, LogOut, Moon, Sun, User, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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

const Configuracoes: React.FC = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: 'Zé da Pizza',
    email: 'zedapizza@exemplo.com',
    phone: '(11) 98765-4321'
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Você saiu da conta! Até logo 🍕');
      navigate('/');
    } catch (error) {
      toast.error('Opa! Algo deu errado no logout');
    }
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
              <User className="text-purple-700 dark:text-purple-300 h-8 w-8" />
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
          className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Seu Perfil
            </span>
          </h2>

          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 dark:text-gray-300">
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
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 dark:text-gray-300">
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
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2 dark:text-gray-300">
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
                  <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-700 to-pink-600 text-white py-3 px-6 rounded-lg
              font-medium hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
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
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 dark:text-white">
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
                    className="h-5 w-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                  />
                  <label htmlFor={item.id} className="dark:text-gray-300">
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Ações Importantes */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 p-3 rounded-lg"
            >
              <LogOut className="w-6 h-6" />
              <span className="font-medium">Sair da Conta</span>
            </button>

            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center gap-3">
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

export default Configuracoes;