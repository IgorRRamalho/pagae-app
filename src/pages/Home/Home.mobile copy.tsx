import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Bell, Check, Crown, Plus, Skull, Sparkles, Trash, UserPlus, X } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
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
  isExpanded: boolean;
  onToggleExpand: (index: number) => void;
};

const DebtCard = ({ debt, index, toggleStatus, deleteDebt, isExpanded, onToggleExpand }: DebtCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => deleteDebt(index),
    onSwipedRight: () => toggleStatus(index),
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  return (
    <div {...swipeHandlers}>
      <motion.div
        ref={cardRef}
        style={{ opacity, scale }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
        role="article"
        aria-labelledby={`debt-${index}-title`}
        className={`relative bg-gradient-to-br ${
          debt.status === 'paid' 
            ? 'from-green-50/50 to-purple-50/50 dark:from-green-900/20 dark:to-purple-900/20' 
            : 'from-pink-50/50 to-purple-50/50 dark:from-pink-900/20 dark:to-purple-900/20'
        } p-4 rounded-2xl shadow-lg active:shadow-xl transition-all duration-300 border-l-4 ${
          debt.status === 'paid' 
            ? 'border-green-600 active:border-green-700' 
            : 'border-pink-600 active:border-pink-700'
        } active:-translate-y-1 focus-within:ring-4 focus-within:ring-purple-500/30 outline-none`}
        tabIndex={0}
      >
        <div className="absolute top-2 right-2">
          <motion.button
            aria-label={`Remover dívida de ${debt.friend}`}
            whileTap={{ scale: 0.9 }}
            onClick={() => deleteDebt(index)}
            className="p-2 text-red-500 transition-colors rounded-full bg-red-100/50 active:bg-red-200/50 dark:bg-red-900/20 dark:active:bg-red-800/30 dark:text-red-400"
          >
            <Trash className="w-5 h-5" />
          </motion.button>
        </div>

        <div 
          className="flex items-center gap-3 mb-3"
          onClick={() => onToggleExpand(index)}
        >
          <div 
            role="img"
            aria-label={debt.status === 'paid' ? 'Dívida quitada' : 'Dívida pendente'}
            className={`p-2 rounded-lg ${
              debt.status === 'paid' 
                ? 'bg-green-100/50 dark:bg-green-900/30 text-green-600' 
                : 'bg-pink-100/50 dark:bg-pink-900/30 text-pink-600'
            }`}
          >
            <span className="text-2xl" role="presentation">{debt.icon || '��'}</span>
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

        <div className="mb-3 text-center">
          <p 
            className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text"
            aria-label={`Valor: R$ ${debt.amount.toFixed(2).replace('.', ',')}`}
          >
            R${debt.amount.toFixed(2).replace('.', ',')}
          </p>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-3 mb-3 rounded-lg bg-white/50 dark:bg-gray-800">
                <p className="text-sm italic text-gray-600 dark:text-gray-300">"{debt.reason}"</p>
              </div>

              <div className="flex gap-2">
                <motion.button
                  aria-label={debt.status === 'paid' ? `Reabrir dívida com ${debt.friend}` : `Marcar dívida de ${debt.friend} como paga`}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleStatus(index)}
                  className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
                    debt.status === 'paid' 
                      ? 'bg-green-600 active:bg-green-700 text-white' 
                      : 'bg-gradient-to-r from-pink-600 to-purple-600 active:from-pink-700 active:to-purple-700 text-white'
                  } focus:ring-4 focus:ring-purple-500/30`}
                >
                  {debt.status === 'paid' ? (
                    <><X className="w-5 h-5" /> Reabrir</>
                  ) : (
                    <><Check className="w-5 h-5" /> Quitar</>
                  )}
                </motion.button>

                <motion.button
                  aria-label={`Enviar lembrete para ${debt.friend}`}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toast.info(`📩 Enviamos um lembrete para ${debt.friend}!`)}
                  className="flex items-center justify-center flex-1 gap-2 py-3 text-sm text-pink-600 rounded-xl active:text-pink-700 dark:text-pink-400 dark:active:text-pink-300 focus:ring-4 focus:ring-pink-500/30"
                >
                  <Bell className="w-5 h-5" /> Lembrete
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
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
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const totalPending = useMemo(() => 
    debts.filter(d => d.status === 'pending').reduce((sum, d) => sum + d.amount, 0)
  , [debts]);

  const filteredDebts = useMemo(() => 
    debts.filter(d =>
      (filter === 'all' || d.status === filter) &&
      [d.friend, d.reason].some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  , [debts, filter, searchQuery]);

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
      status: 'pending' as const,
    }];

    setDebts(newDebts);
    setNewDebt({ friend: '', amount: '', reason: '', icon: '💰' });
    setIsFormVisible(false);
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

  const toggleExpandCard = (index: number) => {
    setExpandedCardIndex(expandedCardIndex === index ? null : index);
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
    isFormVisible,
    setIsFormVisible,
    expandedCardIndex,
    toggleExpandCard
  };
};

export default function HomeMobile() {
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
    isFormVisible,
    setIsFormVisible,
    expandedCardIndex,
    toggleExpandCard
  } = useDebts();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDebt();
  };

  return (
    <div className="min-h-screen pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 space-y-4"
        role="main"
      >
        {/* Header Section */}
        <section aria-labelledby="total-heading">
          <div className="p-6 shadow-2xl bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl">
            <div className="space-y-3 text-center">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20">
                <Sparkles className="w-4 h-4 mr-2 text-white" />
                <span className="font-medium text-white">Total Pendente</span>
              </div>
              <h1 id="total-heading" className="text-4xl font-bold text-white">
                R${totalPending.toFixed(2).replace('.', ',')}
              </h1>
              <p className="text-sm text-purple-100/80">
                Equivale a {Math.round(totalPending / 5)} cervejas 🍺 ou {Math.round(totalPending / 40)} ingressos 🎫
              </p>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section aria-labelledby="search-heading">
          <div className="relative">
            <label htmlFor="search-input" className="sr-only">Pesquisar dívidas</label>
            <input
              id="search-input"
              type="text"
              placeholder="🔍 Procurar dívidas..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-12 pr-4 bg-white border-2 border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700 focus:ring-4 focus:ring-purple-500/30"
            />
            <Sparkles className="absolute left-4 top-3.5 text-gray-400" />
          </div>
        </section>

        {/* Debts List */}
        <section 
          id="debts-list"
          aria-live="polite"
          aria-relevant="additions removals"
          className="space-y-4"
        >
          <AnimatePresence>
            {filteredDebts.map((debt, i) => (
              <DebtCard
                key={`${debt.friend}-${i}`}
                debt={debt}
                index={i}
                toggleStatus={toggleStatus}
                deleteDebt={deleteDebt}
                isExpanded={expandedCardIndex === i}
                onToggleExpand={toggleExpandCard}
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

      {/* Bottom Navigation */}
      <nav 
        role="navigation"
        aria-label="Filtros de dívidas"
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="flex justify-around p-2">
          {['all', 'pending', 'paid'].map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={filter === tab}
              aria-controls={`${tab}-tab`}
              onClick={() => setFilter(tab as 'all' | 'pending' | 'paid')}
              className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 ${
                filter === tab
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {tab === 'pending' && <Skull className="w-5 h-5" />}
              {tab === 'paid' && <Crown className="w-5 h-5" />}
              {tab === 'all' && <Sparkles className="w-5 h-5" />}
              <span className="text-sm font-medium">
                {tab === 'pending' ? 'Pendentes' : tab === 'paid' ? 'Quitadas' : 'Todas'}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Add Debt Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsFormVisible(true)}
        className="fixed flex items-center justify-center text-white rounded-full shadow-lg bottom-20 right-4 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600"
        aria-label="Adicionar nova dívida"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Add Debt Form Bottom Sheet */}
      <AnimatePresence>
        {isFormVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setIsFormVisible(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="absolute bottom-0 left-0 right-0 p-6 pb-24 bg-white dark:bg-gray-800 rounded-t-3xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="flex items-center gap-3 text-2xl font-bold dark:text-white">
                  <UserPlus className="text-pink-600" /> Nova Dívida
                </h2>
                <button
                  onClick={() => setIsFormVisible(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="friend-input" className="block mb-1 text-sm font-medium dark:text-gray-300">
                    Quem tá devendo?
                  </label>
                  <input
                    id="friend-input"
                    type="text"
                    value={newDebt.friend}
                    onChange={e => setNewDebt(d => ({ ...d, friend: e.target.value }))}
                    className="w-full px-4 py-3 bg-transparent border-2 border-gray-200 rounded-xl dark:border-gray-700 focus:ring-4 focus:ring-purple-500/30"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="amount-input" className="block mb-1 text-sm font-medium dark:text-gray-300">
                    Valor R$
                  </label>
                  <input
                    id="amount-input"
                    type="number"
                    value={newDebt.amount}
                    onChange={e => setNewDebt(d => ({ ...d, amount: e.target.value }))}
                    className="w-full px-4 py-3 bg-transparent border-2 border-gray-200 rounded-xl dark:border-gray-700 focus:ring-4 focus:ring-purple-500/30"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="reason-input" className="block mb-1 text-sm font-medium dark:text-gray-300">
                    Motivo
                  </label>
                  <input
                    id="reason-input"
                    type="text"
                    value={newDebt.reason}
                    onChange={e => setNewDebt(d => ({ ...d, reason: e.target.value }))}
                    className="w-full px-4 py-3 bg-transparent border-2 border-gray-200 rounded-xl dark:border-gray-700 focus:ring-4 focus:ring-purple-500/30"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center w-full gap-2 py-4 font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl"
                >
                  <Plus className="w-5 h-5" /> Adicionar
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
