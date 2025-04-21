import { Bell, Check, Crown, DollarSign, Plus, Skull, Sparkles, Trash, UserPlus, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState, useEffect, useRef } from 'react';
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
  isLast: boolean;
};

const DebtCard = ({ debt, index, toggleStatus, deleteDebt, isLast }: DebtCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300 }}
      role="article"
      aria-labelledby={`debt-${index}-title`}
      className={`group relative bg-gradient-to-br ${
        debt.status === 'paid' 
          ? 'from-green-50/50 to-purple-50/50 dark:from-green-900/20 dark:to-purple-900/20' 
          : 'from-pink-50/50 to-purple-50/50 dark:from-pink-900/20 dark:to-purple-900/20'
      } p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${
        debt.status === 'paid' 
          ? 'border-green-600 hover:border-green-700' 
          : 'border-pink-600 hover:border-pink-700'
      } hover:-translate-y-1 focus-within:ring-4 focus-within:ring-purple-500/30 outline-none`}
      tabIndex={0}
    >
      <div className="absolute top-3 right-3">
        <motion.button
          aria-label={`Remover dívida de ${debt.friend}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => deleteDebt(index)}
          className="p-1.5 rounded-lg bg-red-100/50 hover:bg-red-200/50 dark:bg-red-900/20 dark:hover:bg-red-800/30 text-red-500 dark:text-red-400 transition-colors"
        >
          <Trash className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div 
          role="img"
          aria-label={debt.status === 'paid' ? 'Dívida quitada' : 'Dívida pendente'}
          className={`p-2 rounded-lg ${
            debt.status === 'paid' 
              ? 'bg-green-100/50 dark:bg-green-900/30 text-green-600' 
              : 'bg-pink-100/50 dark:bg-pink-900/30 text-pink-600'
          }`}
        >
          <span className="text-2xl" role="presentation">{debt.icon || '💸'}</span>
        </div>
        <div>
          <h2 id={`debt-${index}-title`} className="text-lg font-bold dark:text-white">
            {debt.friend}
          </h2>
          <p className={`text-sm ${
            debt.status === 'paid' 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-pink-600 dark:text-pink-400'
          }`}>
            {debt.status === 'paid' ? 'Quitado 🎉' : 'Pendente 🚨'}
          </p>
        </div>
      </div>

      <div className="mb-4 text-center">
        <p 
          className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text"
          aria-label={`Valor: R$ ${debt.amount.toFixed(2).replace('.', ',')}`}
        >
          R${debt.amount.toFixed(2).replace('.', ',')}
        </p>
      </div>

      <div className="p-3 mb-4 rounded-lg bg-white/50 dark:bg-gray-800">
        <p className="text-sm italic text-gray-600 dark:text-gray-300">"{debt.reason}"</p>
      </div>

      <motion.button
        aria-label={debt.status === 'paid' ? `Reabrir dívida com ${debt.friend}` : `Marcar dívida de ${debt.friend} como paga`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => toggleStatus(index)}
        className={`w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 ${
          debt.status === 'paid' 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white'
        } focus:ring-4 focus:ring-purple-500/30`}
      >
        {debt.status === 'paid' ? (
          <><X className="w-4 h-4" /> Reabrir Dívida</>
        ) : (
          <><Check className="w-4 h-4" /> Marcar como Pago</>
        )}
      </motion.button>

      <div className="mt-3 text-center">
        <motion.button
          aria-label={`Enviar lembrete para ${debt.friend}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toast.info(`📩 Enviamos um lembrete para ${debt.friend}!`)}
          className="flex items-center justify-center gap-1 p-1 text-sm text-pink-600 rounded-lg hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 focus:ring-4 focus:ring-pink-500/30"
        >
          <Bell className="w-4 h-4" /> Enviar Lembrete
        </motion.button>
      </div>
    </motion.div>
  );
};

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
  const formRef = useRef<HTMLFormElement>(null);
  const lastAddedDebtRef = useRef<HTMLDivElement>(null);

  const totalPending = useMemo(() => 
    debts.filter(d => d.status === 'pending').reduce((sum, d) => sum + d.amount, 0)
  , [debts]);

  const filteredDebts = useMemo(() => 
    debts.filter(d =>
      (filter === 'all' || d.status === filter) &&
      [d.friend, d.reason].some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
  , [debts, filter, searchQuery]));

  const addDebt = () => {
    if (!newDebt.friend || !Number(newDebt.amount)) {
      toast.error('Preencha nome e valor corretamente!');
      return;
    }

    const newDebts = [...debts, {
      amount: +newDebt.amount,
      friend: newDebt.friend,
      reason: newDebt.reason || 'Dívida registrada 🎉',
      icon: newDebt.icon,
      status: 'pending',
    }];

    setDebts(newDebts);
    setNewDebt({ friend: '', amount: '', reason: '', icon: '💰' });
    toast.success('Dívida adicionada! 🚀');
    
    // Focus on new debt card
    setTimeout(() => lastAddedDebtRef.current?.focus(), 100);
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
    formRef,
    lastAddedDebtRef
  };
};

export default function HomeDesktop() {
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
    formRef,
    lastAddedDebtRef
  } = useDebts();

  useEffect(() => {
    if (filteredDebts.length > 0) {
      lastAddedDebtRef.current = document.querySelector<HTMLDivElement>('[data-last-debt="true"]');
    }
  }, [filteredDebts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDebt();
  };

  return (
    <div className="min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto space-y-8"
        role="main"
      >
        {/* Header Section */}
        <section aria-labelledby="total-heading">
          <div className="p-8 shadow-2xl bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl">
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center px-6 py-2 rounded-full bg-white/20">
                <Sparkles className="w-5 h-5 mr-2 text-white" />
                <span className="font-medium text-white">Total Pendente</span>
              </div>
              <h1 id="total-heading" className="text-5xl font-bold text-white">
                R${totalPending.toFixed(2).replace('.', ',')}
              </h1>
              <p className="text-purple-100/80">
                Equivale a {Math.round(totalPending / 5)} cervejas 🍺 ou {Math.round(totalPending / 40)} ingressos 🎫
              </p>
            </div>
          </div>
        </section>

        {/* Add Debt Form */}
        <section aria-labelledby="new-debt-heading">
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-6 bg-white border border-gray-200 shadow-xl dark:bg-gray-800 rounded-2xl dark:border-gray-700"
          >
            <h2 id="new-debt-heading" className="flex items-center gap-3 mb-6 text-2xl font-bold dark:text-white">
              <UserPlus className="text-pink-600" /> Nova Dívida
            </h2>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="space-y-1">
                <label htmlFor="friend-input" className="sr-only">Nome do devedor</label>
                <input
                  id="friend-input"
                  type="text"
                  placeholder="Quem tá devendo?"
                  value={newDebt.friend}
                  onChange={e => setNewDebt(d => ({ ...d, friend: e.target.value }))}
                  className="w-full px-4 py-3 bg-transparent border-2 border-gray-200 rounded-xl dark:border-gray-700 focus:ring-4 focus:ring-purple-500/30"
                  aria-required="true"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="amount-input" className="sr-only">Valor</label>
                <input
                  id="amount-input"
                  type="number"
                  placeholder="Valor R$"
                  value={newDebt.amount}
                  onChange={e => setNewDebt(d => ({ ...d, amount: e.target.value }))}
                  className="w-full px-4 py-3 bg-transparent border-2 border-gray-200 rounded-xl dark:border-gray-700 focus:ring-4 focus:ring-purple-500/30"
                  aria-required="true"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="reason-input" className="sr-only">Motivo</label>
                <input
                  id="reason-input"
                  type="text"
                  placeholder="Motivo"
                  value={newDebt.reason}
                  onChange={e => setNewDebt(d => ({ ...d, reason: e.target.value }))}
                  className="w-full px-4 py-3 bg-transparent border-2 border-gray-200 rounded-xl dark:border-gray-700 focus:ring-4 focus:ring-purple-500/30"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:shadow-lg focus:ring-4 focus:ring-purple-500/30"
              >
                <Plus className="w-5 h-5" /> Adicionar
              </motion.button>
            </div>
          </motion.form>
        </section>

        {/* Filters */}
        <section aria-labelledby="filters-heading">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="relative flex-1 w-full">
              <label htmlFor="search-input" className="sr-only">Pesquisar dívidas</label>
              <input
                id="search-input"
                type="text"
                placeholder="🔍 Procurar dívidas..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full py-3 pl-12 pr-4 bg-white border-2 border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700 focus:ring-4 focus:ring-purple-500/30"
              />
              <Sparkles className="absolute left-3 top-3.5 text-gray-400" />
            </div>

            <div 
              role="tablist"
              aria-labelledby="filters-heading"
              className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-xl"
            >
              {['all', 'pending', 'paid'].map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={filter === tab}
                  aria-controls={`${tab}-tab`}
                  onClick={() => setFilter(tab as any)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    filter === tab
                      ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  } focus:ring-4 focus:ring-purple-500/30`}
                >
                  {tab === 'pending' && <Skull className="w-4 h-4" />}
                  {tab === 'paid' && <Crown className="w-4 h-4" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Debts Grid */}
        <section 
          id="debts-list"
          aria-live="polite"
          aria-relevant="additions removals"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredDebts.map((debt, i) => (
              <DebtCard
                key={`${debt.friend}-${i}`}
                debt={debt}
                index={i}
                toggleStatus={toggleStatus}
                deleteDebt={deleteDebt}
                isLast={i === filteredDebts.length - 1}
                ref={i === filteredDebts.length - 1 ? lastAddedDebtRef : null}
                data-last-debt={i === filteredDebts.length - 1 ? "true" : undefined}
              />
            ))}
          </AnimatePresence>
        </section>

        {/* Empty State */}
        <AnimatePresence>
          {!filteredDebts.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="alert"
              aria-live="polite"
              className="py-12 text-center"
            >
              <div className="mb-4 text-6xl" role="img" aria-hidden="true">🎭</div>
              <h3 className="text-xl font-bold dark:text-white">
                {filter === 'paid' ? 'Tudo quitado! 🎉' : 'Nada por aqui...'}
              </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                {filter === 'paid' 
                  ? 'Hora de comemorar! 🍻' 
                  : 'Primeira rodada é por sua conta? 😜'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}