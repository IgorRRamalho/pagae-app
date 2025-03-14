import React from 'react';
import { Wallet, CreditCard, Bell, Moon, Sun, UserPlus, DollarSign, Send, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

interface DebtCardProps {
  amount: number;
  friend: string;
  reason: string;
  icon: string;
  status: 'pending' | 'paid';
}

function DebtCard({ amount, friend, reason, icon, status }: DebtCardProps) {
  return (
    <div className={`
      transform transition-all duration-300 hover:scale-105 hover:shadow-lg
      bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md cursor-pointer
      ${status === 'paid' ? 'opacity-75' : ''}
      hover:border-[#9B5DE5] border-2 border-transparent
    `}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <h3 className="font-bold text-lg dark:text-white">{friend}</h3>
        </div>
        <span className={`
          px-3 py-1 rounded-full text-sm font-semibold
          ${status === 'paid' ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' 
            : 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300'}
        `}>
          {status === 'paid' ? '✨ Pago' : '⏳ Pendente'}
        </span>
      </div>
      <p className="text-2xl font-bold mb-2 dark:text-white">R${amount.toFixed(2).replace('.', ',')}</p>
      <p className="text-gray-600 dark:text-gray-300">{reason}</p>
    </div>
  );
}

function Landing() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [filter, setFilter] = React.useState<'all' | 'pending' | 'paid'>('all');

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const debts = [
    { amount: 25, friend: 'Alex', reason: 'Tacos da madrugada 🌮', icon: '🍕', status: 'pending' as const },
    { amount: 50, friend: 'Sarah', reason: 'Assinatura da Netflix 🎬', icon: '🎮', status: 'paid' as const },
    { amount: 30, friend: 'Mike', reason: 'Ingressos do show 🎵', icon: '🎫', status: 'pending' as const },
    { amount: 15, friend: 'Emma', reason: 'Café da manhã ☕', icon: '☕', status: 'paid' as const },
  ];

  return (
    <div className="min-h-screen transform transition-all duration-700 bg-gray-50 dark:bg-gray-900">
     <Header />

      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
          Acompanhe dívidas. Mantenha amizades.
          <br />
          <span className="text-[#FF6B6B]">Sem constrangimentos.</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          A maneira divertida e amigável de acompanhar quem deve o quê 💰
        </p>
        <button className="bg-[#FF6B6B] text-white px-8 py-4 rounded-full text-lg font-semibold 
          hover:bg-[#ff5252] transform transition-all duration-300 hover:scale-105 shadow-lg
          flex items-center gap-2 mx-auto">
          <UserPlus className="w-5 h-5" />
          Comece Agora - É Grátis!
        </button>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold dark:text-white">Suas Dívidas 👀</h2>
          <div className="flex gap-2">
            {(['all', 'pending', 'paid'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full capitalize
                  ${filter === f 
                    ? 'bg-[#4A90E2] text-white' 
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
              >
                {f === 'all' ? 'Todos' : f === 'pending' ? 'Pendentes' : 'Pagos'}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-8">
          <h3 className="text-xl font-bold mb-4 dark:text-white">Adicionar Nova Dívida 💸</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nome do seu amigo 😈"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="number"
              placeholder="Valor $$$"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <button className="bg-[#9B5DE5] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 
              transform transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
              <DollarSign className="w-5 h-5" />
              Adicionar Dívida
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {debts
            .filter(debt => filter === 'all' || debt.status === filter)
            .map((debt, index) => (
              <DebtCard key={index} {...debt} />
            ))}
        </div>
      </main>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Por que PagAê!? 🤔</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#4A90E2] rounded-full flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 dark:text-white">Rastreamento Fácil</h3>
            <p className="text-gray-600 dark:text-gray-300">Mantenha todos seus débitos organizados em um só lugar.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#6ECCAF] rounded-full flex items-center justify-center">
              <Bell className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 dark:text-white">Lembretes Suaves</h3>
            <p className="text-gray-600 dark:text-gray-300">Envie lembretes sem constrangimento.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#FF6B6B] rounded-full flex items-center justify-center">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 dark:text-white">Pagamento Rápido</h3>
            <p className="text-gray-600 dark:text-gray-300">Pague e receba com apenas alguns cliques.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;