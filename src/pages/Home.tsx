import { Bell, Check, DollarSign, Smile, Sparkles, Trash, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

type Debt = {
  amount: number;
  friend: string;
  reason: string;
  icon: string;
  status: 'pending' | 'paid';
};

type DebtCardProps = {
  debt: Debt;
  index: number;
  toggleStatus: (i: number) => void;
  deleteDebt: (i: number) => void;
};

const DebtCard = ({ debt, index, toggleStatus, deleteDebt }: DebtCardProps) => (
  <div className={`group relative bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${debt.status === 'paid'
      ? 'border-[#6ECCAF] hover:border-[#6ECCAF]/80'
      : 'border-[#FF6B6B] hover:border-[#FF6B6B]/80'
    } hover:-translate-y-1`}>

    {/* Botão de Excluir */}
    <div className="absolute top-3 right-3">
      <button
        onClick={() => deleteDebt(index)}
        className="p-1.5 rounded-lg bg-[#FF6B6B]/10 hover:bg-[#FF6B6B]/20 text-[#FF6B6B] hover:text-[#ff5252] transition-colors"
      >
        <Trash className="w-4 h-4" />
      </button>
    </div>

    {/* Cabeçalho */}
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 rounded-lg ${debt.status === 'paid'
          ? 'bg-[#6ECCAF]/20 text-[#6ECCAF]'
          : 'bg-[#FF6B6B]/20 text-[#FF6B6B]'
        }`}>
        <span className="text-2xl">{debt.icon || '💸'}</span>
      </div>
      <div>
        <h3 className="font-bold dark:text-white text-lg">
          {debt.friend}
        </h3>
        <p className={`text-sm ${debt.status === 'paid'
            ? 'text-[#6ECCAF]'
            : 'text-[#FF6B6B]'
          }`}>
          {debt.status === 'paid' ? 'Quitado 🎉' : 'Pendente 🚨'}
        </p>
      </div>
    </div>

    {/* Valor */}
    <div className="text-center mb-4">
      <p className="text-3xl font-bold dark:text-white">
        R${debt.amount.toFixed(2).replace('.', ',')}
      </p>
    </div>

    {/* Motivo */}
    <div className="bg-[#FF6B6B]/5 dark:bg-gray-700 p-3 rounded-lg mb-4">
      <p className="text-gray-600 dark:text-gray-300 italic text-sm">
        "{debt.reason}"
      </p>
    </div>

    {/* Botão Principal */}
    <button
      onClick={() => toggleStatus(index)}
      className={`w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${debt.status === 'paid'
          ? 'bg-[#6ECCAF] hover:bg-[#5ab897] text-white'
          : 'bg-[#FF6B6B] hover:bg-[#ff5252] text-white'
        }`}
    >
      {debt.status === 'paid' ? (
        <>
          <X className="w-4 h-4" />
          Reabrir Dívida
        </>
      ) : (
        <>
          <Check className="w-4 h-4" />
          Marcar como Pago
        </>
      )}
    </button>

    {/* Ação Secundária */}
    <div className="mt-3 text-center">
      <button
        onClick={() => toast.info(`📩 Enviamos um lembrete para ${debt.friend}!`)}
        className="text-[#FF6B6B] hover:text-[#ff5252] text-sm flex items-center justify-center gap-1 transition-colors"
      >
        <Bell className="w-4 h-4" />
        Enviar Lembrete
      </button>
    </div>
  </div>
);

const useDebts = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debts, setDebts] = useState<Debt[]>([
    { amount: 25, friend: 'Alex', reason: 'Tacos da madrugada 🌮', icon: '🍕', status: 'pending' },
    { amount: 50, friend: 'Sarah', reason: 'Assinatura da Netflix 🎬', icon: '🎮', status: 'paid' },
    { amount: 30, friend: 'Mike', reason: 'Ingressos do show 🎵', icon: '🎫', status: 'pending' },
    { amount: 15, friend: 'Emma', reason: 'Café da manhã ☕', icon: '☕', status: 'paid' },
  ]);

  const [newDebt, setNewDebt] = useState({ friend: '', amount: '', reason: '', icon: '💰' });

  const totalPending = useMemo(() => {
    return debts
      .filter(d => d.status === 'pending')
      .reduce((sum, d) => sum + d.amount, 0);
  }, [debts]);

  const filteredDebts = useMemo(() => {
    return debts.filter(d =>
      (filter === 'all' || d.status === filter) &&
      [d.friend, d.reason].some(f => f && f.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [debts, filter, searchQuery]);

  const addDebt = () => {
    if (!newDebt.friend || !Number(newDebt.amount)) {
      toast.error('Preencha nome e valor corretamente!');
      return;
    }

    setDebts([
      ...debts,
      {
        amount: +newDebt.amount,
        friend: newDebt.friend,
        reason: newDebt.reason || 'Dívida registrada 🎉',
        icon: newDebt.icon,
        status: 'pending',
      },
    ]);

    setNewDebt({ friend: '', amount: '', reason: '', icon: '💰' });
    toast.success('Dívida adicionada! 🚀');
  };

  const toggleStatus = (index: number) => {
    const newDebts = [...debts];
    newDebts[index].status = newDebts[index].status === 'paid' ? 'pending' : 'paid';
    setDebts(newDebts);
    if (newDebts[index].status === 'paid') toast(`🎉 ${newDebts[index].friend} está quites!`);
  };

  const deleteDebt = (index: number) => {
    setDebts(prev => prev.filter((_, idx) => idx !== index));
    toast.info('Dívida removida! 🗑️');
  };

  return {
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    newDebt,
    setNewDebt,
    totalPending,
    filteredDebts,
    addDebt,
    toggleStatus,
    deleteDebt,
  };
};

export default function Home() {
  const {
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    newDebt,
    setNewDebt,
    totalPending,
    filteredDebts,
    addDebt,
    toggleStatus,
    deleteDebt,
  } = useDebts();

  return (

    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Seção de Total Pendente */}
      <div className="bg-white/80 dark:bg-gray-800 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border-4 border-red-500/20 mb-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center text-red-500 bg-red-500/10 px-6 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5 mr-2" />🚨 Total Pendente
          </div>
          <h2 className="text-5xl font-extrabold dark:text-white bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
            R${totalPending.toFixed(2).replace('.', ',')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Equivale a {Math.round(totalPending / 5)} cervejas ou {Math.round(totalPending / 40)} ingressos
          </p>
        </div>
      </div>

      {/* Formulário de Nova Dívida */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl mb-8 border-4 border-rose-50 dark:border-gray-700">
        <h3 className="text-2xl font-bold mb-4 dark:text-white flex items-center gap-2">
          <Smile className="text-green-500" /> Nova Dívida
          <span className="text-sm text-gray-500">(sem culpa, só diversão!)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Quem tá devendo? 👀"
            value={newDebt.friend}
            onChange={e => setNewDebt(d => ({ ...d, friend: e.target.value }))}
            className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-red-500 transition-all"
          />

          <input
            type="number"
            placeholder="Valor 🍺"
            value={newDebt.amount}
            onChange={e => setNewDebt(d => ({ ...d, amount: e.target.value }))}
            className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-red-500"
          />

          <input
            type="text"
            placeholder="Motivo 🎨"
            value={newDebt.reason}
            onChange={e => setNewDebt(d => ({ ...d, reason: e.target.value }))}
            className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-red-500"
          />

          <button
            onClick={addDebt}
            className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-all flex items-center justify-center gap-2"
          >
            <DollarSign className="w-5 h-5" /> Registrar Dívida 🚨
          </button>
        </div>
      </div>

      {/* Lista de Dívidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDebts.map((debt, i) => (
          <DebtCard
            key={debt.friend + i}
            debt={debt}
            index={i}
            toggleStatus={toggleStatus}
            deleteDebt={deleteDebt}
          />
        ))}
      </div>

      {/* Mensagem de Lista Vazia */}
      {!filteredDebts.length && (
        <div className="text-center py-12 animate-fade-in">
          <div className="text-6xl mb-4">🎭</div>
          <h3 className="text-xl font-bold dark:text-white">
            {filter === 'paid' ? 'Tudo quitado! 🎉🍻' : 'Nada por aqui... 🧐'}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {filter === 'paid' ? 'Hora de comemorar!' : 'Primeira rodada é por sua conta? 😜'}
          </p>
        </div>
      )}
    </div>

  );
}