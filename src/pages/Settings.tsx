import React from 'react';

export default function Configuracoes() {
  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 bg-gradient-to-r from-[#FF6B6B] to-[#9B5DE5] bg-clip-text text-transparent">
          Configurações ⚙️
        </h1>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border-4 border-[#6ECCAF]/20">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
              <div>
                <h3 className="font-bold text-lg dark:text-white">Modo Escuro</h3>
                <p className="text-gray-600 dark:text-gray-300">Ativar/Desativar tema escuro</p>
              </div>
              <button 
                onClick={() => {
                  document.documentElement.classList.toggle('dark');
                  localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
                }}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-600 transition-colors"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  document.documentElement.classList.contains('dark') ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

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
              </div>
            </div>

            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
              <h3 className="font-bold text-lg dark:text-white mb-4">Sua Conta</h3>
              <button className="w-full text-[#FF6B6B] hover:text-[#9B5DE5] transition-colors">
                Sair da Conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}