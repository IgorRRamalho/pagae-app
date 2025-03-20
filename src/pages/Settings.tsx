import React from 'react';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';

export default function Configuracoes() {
  const navigate = useNavigate();

  // Função para fazer logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logout realizado com sucesso!');
      navigate('/'); // Redireciona para a página inicial após o logout
    } catch (error) {
      toast.error('Erro ao fazer logout. Tente novamente.');
    }
  };

  // Função para alternar o modo escuro
  const toggleDarkMode = () => {
    const isDarkMode = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  };

  return (
    <div className="min-h-screen px-6">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 bg-gradient-to-r from-[#FF6B6B] to-[#9B5DE5] bg-clip-text text-transparent">
          Configurações ⚙️
        </h1>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border-4 border-[#6ECCAF]/20">
          <div className="space-y-6">
            {/* Modo Escuro */}
            <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
              <div>
                <h3 className="font-bold text-lg dark:text-white">Modo Escuro</h3>
                <p className="text-gray-600 dark:text-gray-300">Ativar/Desativar tema escuro</p>
              </div>
              <button
                onClick={toggleDarkMode}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-600 transition-colors"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    document.documentElement.classList.contains('dark') ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Notificações */}
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
              <h3 className="font-bold text-lg dark:text-white mb-4">Notificações 🔔</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 accent-[#FF6B6B]" defaultChecked />
                  <span className="dark:text-white">Lembretes diários</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 accent-[#FF6B6B]" />
                  <span className="dark:text-white">Notificações por email</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 accent-[#FF6B6B]" />
                  <span className="dark:text-white">Alertas de pagamentos pendentes</span>
                </label>
              </div>
            </div>

            {/* Privacidade */}
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
              <h3 className="font-bold text-lg dark:text-white mb-4">Privacidade 🔒</h3>
              <div className="space-y-3">
                <button className="w-full text-left text-[#FF6B6B] hover:text-[#9B5DE5] transition-colors">
                  Alterar senha
                </button>
                <button className="w-full text-left text-[#FF6B6B] hover:text-[#9B5DE5] transition-colors">
                  Excluir conta
                </button>
              </div>
            </div>

            {/* Sua Conta */}
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
              <h3 className="font-bold text-lg dark:text-white mb-4">Sua Conta</h3>
              <button
                onClick={handleLogout}
                className="w-full text-left text-[#FF6B6B] hover:text-[#9B5DE5] transition-colors"
              >
                Sair da Conta
              </button>
            </div>

            {/* Sobre o PagAê */}
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
              <h3 className="font-bold text-lg dark:text-white mb-4">Sobre o PagAê</h3>
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-300">
                  Versão: 1.0.0
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Desenvolvido com ❤️ para resolver suas tretas financeiras.
                </p>
                <button className="w-full text-left text-[#FF6B6B] hover:text-[#9B5DE5] transition-colors">
                  Termos de Uso
                </button>
                <button className="w-full text-left text-[#FF6B6B] hover:text-[#9B5DE5] transition-colors">
                  Política de Privacidade
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}