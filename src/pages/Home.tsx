import { DollarSign, Edit, Trash, Bell, Check, X, Smile, Frown } from 'lucide-react';
import React from 'react';
import Header from '../components/Header';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [filter, setFilter] = React.useState<'all' | 'pending' | 'paid'>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [debts, setDebts] = React.useState([
    { amount: 25, friend: 'Alex', reason: 'Tacos da madrugada 🌮', icon: '🍕', status: 'pending' as const },
    { amount: 50, friend: 'Sarah', reason: 'Assinatura da Netflix 🎬', icon: '🎮', status: 'paid' as const },
    { amount: 30, friend: 'Mike', reason: 'Ingressos do show 🎵', icon: '🎫', status: 'pending' as const },
    { amount: 15, friend: 'Emma', reason: 'Café da manhã ☕', icon: '☕', status: 'paid' as const },
  ]);
  const [newDebt, setNewDebt] = React.useState({
    friend: '',
    amount: '',
    reason: '',
    icon: '💰',
  });

  // Função para adicionar dívida
  const addDebt = () => {
    if (!newDebt.friend || !newDebt.amount) {
      toast.error('Preencha pelo menos nome e valor!', { icon: '❌' });
      return;
    }

    setDebts([
      ...debts,
      {
        amount: Number(newDebt.amount),
        friend: newDebt.friend,
        reason: newDebt.reason || 'Sem motivo específico 🤷',
        icon: newDebt.icon,
        status: 'pending',
      },
    ]);

    setNewDebt({ friend: '', amount: '', reason: '', icon: '💰' });
    toast.success('Dívida adicionada!', { icon: '🎉' });
  };

  // Função para alternar status
  const toggleStatus = (index: number) => {
    const newDebts = [...debts];
    newDebts[index].status = newDebts[index].status === 'paid' ? 'pending' : 'paid';
    setDebts(newDebts);

    if (newDebts[index].status === 'paid') {
      toast(<div>🎉 <b>{newDebts[index].friend}</b> está quites!</div>);
    }
  };

  // Função para deletar dívida
  const deleteDebt = (index: number) => {
    setDebts(debts.filter((_, i) => i !== index));
    toast.info('Dívida removida!', { icon: '🗑️' });
  };

  // Filtros combinados
  const filteredDebts = debts.filter(
    (debt) =>
      (filter === 'all' || debt.status === filter) &&
      (debt.friend.toLowerCase().includes(searchQuery.toLowerCase()) ||
        debt.reason.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Totalizador
  const totalPending = debts
    .filter((d) => d.status === 'pending')
    .reduce((sum, d) => sum + d.amount, 0);

  // Cores da marca
  const brandColors = {
    primary: '#FF6B6B', // Vermelho divertido
    secondary: '#6ECCAF', // Verde descontraído
    accent: '#FFD93D', // Amarelo energético
  };

  // Novo componente de emojis animados
  const StatusEmoji = ({ status }: { status: 'pending' | 'paid' }) => (
    <span className="animate-bounce">
      {status === 'paid' ? '🎉' : '💸'}
    </span>
  );

  // Textos personalizados
  const funnyMessages = {
    emptyStates: {
      all: ['Nada por aqui... Que tal uma pizza? 🍕', 'Cadê as dívidas? 🧐'],
      pending: ['Tudo em dia! ✨', 'Ninguém te deve nada... por enquanto 😏'],
      paid: ['Tudo quitado! Hora de comemorar! 🎉🍻', 'Pagamentos em dia! 🏆']
    },
    placeholders: {
      friend: 'Quem tá devendo? 👀',
      amount: 'Valor (em reais ou cervejas) 🍺',
      reason: 'Motivo criativo... 🎨'
    }
  };

  // Efeitos visuais aprimorados
  const cardHoverEffects = 'transform transition-all hover:scale-105 hover:rotate-1';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-rose-50/30 to-cyan-50/30 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header 
      />

      {/* Seção de Totalizador com Personalidade */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-8 border-4 border-dashed border-rose-100 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-center dark:text-white">
            <span className="text-gray-500">Galera tá devendo:</span>{' '}
            <span className="text-[#FF6B6B] animate-pulse">
              R${totalPending.toFixed(2).replace('.', ',')}
            </span>
            <div className="mt-2 text-sm text-gray-500">(Isso dá {Math.round(totalPending/5)} cervejas 🍻)</div>
          </h2>
        </div>
      </div>

      {/* Formulário com Personalidade */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl mb-8 border-4 border-rose-50 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-4 dark:text-white flex items-center gap-2">
            <Smile className="text-[#6ECCAF]" /> 
            Nova Dívida Criativa
            <span className="text-sm text-gray-500 ml-2">(sem culpa, só diversão!)</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder={funnyMessages.placeholders.friend}
              className="px-4 py-3 rounded-xl border-2 bg-transparent focus:ring-2 focus:ring-[#FF6B6B] transition-all"
              value={newDebt.friend}
              onChange={(e) => setNewDebt({ ...newDebt, friend: e.target.value })}
            />

            <div className="relative">
              <input
                type="number"
                placeholder={funnyMessages.placeholders.amount}
                className="w-full px-4 py-3 rounded-xl border-2 bg-transparent focus:ring-2 focus:ring-[#FF6B6B] transition-all"
                value={newDebt.amount}
                onChange={(e) => setNewDebt({ ...newDebt, amount: e.target.value })}
              />
              <span className="absolute right-3 top-3 text-gray-400">R$</span>
            </div>

            <input
              type="text"
              placeholder={funnyMessages.placeholders.reason}
              className="px-4 py-3 rounded-xl border-2 bg-transparent focus:ring-2 focus:ring-[#FF6B6B] transition-all"
              value={newDebt.reason}
              onChange={(e) => setNewDebt({ ...newDebt, reason: e.target.value })}
            />

            <button
              onClick={addDebt}
              className={`bg-[#FF6B6B] text-white px-6 py-3 rounded-xl hover:bg-[#ff5252] ${cardHoverEffects} flex items-center justify-center gap-2`}
            >
              <DollarSign className="w-5 h-5" />
              Registrar Dívida 🚨
            </button>
          </div>
        </div>

        {/* Cards de Dívida Aprimorados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDebts.map((debt, index) => (
            <div
              key={index}
              className={`group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl ${cardHoverEffects} border-4 ${
                debt.status === 'paid' ? 'border-[#6ECCAF]/30' : 'border-[#FF6B6B]/30'
              }`}
            >
              {/* Canto Interativo */}
              <div className="absolute -top-4 -right-4">
                <button
                  onClick={() => deleteDebt(index)}
                  className="p-2 rounded-full bg-white dark:bg-gray-900 shadow-lg hover:scale-110 transition-transform"
                >
                  <Trash className="w-5 h-5 text-[#FF6B6B]" />
                </button>
              </div>

              {/* Conteúdo Principal */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl animate-wiggle">
                    {debt.icon || '💸'}
                  </span>
                  <h3 className="font-bold dark:text-white text-xl">
                    {debt.friend}
                  </h3>
                </div>
                <StatusEmoji status={debt.status} />
              </div>

              {/* Valor com Destaque */}
              <p className="text-3xl font-bold dark:text-white mb-2 text-center">
                R${debt.amount.toFixed(2).replace('.', ',')}
              </p>

              {/* Motivo Criativo */}
              <div className="bg-rose-50 dark:bg-gray-700 p-4 rounded-xl mb-4">
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "{debt.reason}"
                </p>
              </div>

              {/* Botão de Ação Principal */}
              <button
                onClick={() => toggleStatus(index)}
                className={`w-full py-3 rounded-xl font-bold ${
                  debt.status === 'paid' 
                    ? 'bg-[#6ECCAF] hover:bg-[#5ab897] text-white'
                    : 'bg-[#FF6B6B] hover:bg-[#ff5252] text-white'
                } transition-all flex items-center justify-center gap-2`}
              >
                {debt.status === 'paid' ? (
                  <>
                    <X className="w-5 h-5" />
                    Marcar como Pendente
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Marcar como Pago
                  </>
                )}
              </button>

              {/* Lembrete Divertido */}
              <div className="mt-4 text-center">
                <button
                  onClick={() => toast.info(`📩 Enviamos um meme para ${debt.friend}!`)}
                  className="text-sm text-[#FF6B6B] hover:text-[#ff5252] flex items-center justify-center gap-1"
                >
                  <Bell className="w-4 h-4" />
                  Mandar um Zap! 💬
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Estado Vazio com Humor */}
        {filteredDebts.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4">🎭</div>
            <h3 className="text-xl font-bold dark:text-white">
              {filter === 'paid'
                ? funnyMessages.emptyStates.paid[Math.floor(Math.random() * 2)]
                : funnyMessages.emptyStates.all[Math.floor(Math.random() * 2)]}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {filter === 'paid'
                ? 'Agora pode chamar todo mundo pra happy hour! 🍻'
                : 'Primeira rodada de cervejas é por sua conta? 😜'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}