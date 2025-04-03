import { Check, Crown, Plus, Skull, Sparkles, Trash, UserPlus, X } from 'lucide-react';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { useMemo, useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useSwipeable } from 'react-swipeable';

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

const MobileDebtCard = ({ debt, index, toggleStatus, deleteDebt }: DebtCardProps) => {
  const dragControls = useDragControls();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  const handlers = useSwipeable({
    onSwiping: (e) => {
      if (Math.abs(e.deltaX) > 50) setIsSwiping(true);
    },
    onSwiped: (e) => {
      setIsSwiping(false);
      if (e.dir === 'Left' && Math.abs(e.deltaX) > 100) {
        toggleStatus(index);
      }
      if (e.dir === 'Right' && Math.abs(e.deltaX) > 100) {
        deleteDebt(index);
      }
    },
    trackMouse: true
  });

  return (
    <motion.div
      {...handlers}
      ref={cardRef}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      dragControls={dragControls}
      whileTap={{ scale: 0.98 }}
      className={`relative touch-pan-y p-4 rounded-2xl shadow-lg mb-3 ${
        debt.status === 'paid' 
          ? 'bg-green-50/90 dark:bg-green-900/20' 
          : 'bg-pink-50/90 dark:bg-pink-900/20'
      }`}
      style={{ touchAction: 'pan-y' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 gap-3">
          <div className={`p-2 rounded-lg ${
            debt.status === 'paid' 
              ? 'bg-green-600/20 text-green-600' 
              : 'bg-pink-600/20 text-pink-600'
          }`}>
            <span className="text-2xl">{debt.icon || '💸'}</span>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold dark:text-white">{debt.friend}</h3>
            <p className="text-sm opacity-75 dark:text-white">
              {debt.status === 'paid' ? 'Quitado 🎉' : 'Pendente 🚨'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleStatus(index)}
            className="p-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:text-white"
          >
            {debt.status === 'paid' ? (
              <X className="w-5 h-5" />
            ) : (
              <Check className="w-5 h-5 dark:text-white" />
            )}
          </button>
          <button
            onClick={() => deleteDebt(index)}
            className="p-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:text-white"
          >
            <Trash className="w-5 h-5 dark:text-white" />
          </button>
        </div>
      </div>

      <div className="pl-2 mt-3">
        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
          R${debt.amount.toFixed(2).replace('.', ',')}
        </p>
        <p className="mt-1 text-sm opacity-75 dark:text-white">"{debt.reason}"</p>
      </div>

      <AnimatePresence>
        {isSwiping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl"
          />
        )}
      </AnimatePresence>
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
  const [isFormVisible, setIsFormVisible] = useState(false);
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
    setIsFormVisible
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
    setIsFormVisible
  } = useDebts();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDebt();
  };

  useEffect(() => {
    if (isFormVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFormVisible]);

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50 dark:bg-gray-900">
      <main className="flex flex-col flex-1 overflow-hidden">
        {/* Card Total */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="p-4 mx-4 mt-4 mb-6 shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl"
        >
          <div className="text-center text-white">
            <p className="text-sm opacity-90">Total Pendente</p>
            <p className="text-3xl font-bold">R${totalPending.toFixed(2).replace('.', ',')}</p>
            <p className="mt-2 text-xs opacity-90">
              {Math.round(totalPending / 5)} cervejas 🍺 ou {Math.round(totalPending / 40)} ingressos 🎫
            </p>
          </div>
        </motion.div>

        {/* Search Bar */}
        <div className="relative px-4 mb-4">
          <input
            type="text"
            placeholder="🔍 Procurar dívidas..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 text-gray-900 placeholder-gray-500 bg-white border-none shadow-sm dark:bg-gray-800 rounded-xl dark:text-white dark:placeholder-gray-400"
          />
          <Sparkles className="absolute left-7 top-3.5 text-gray-400 dark:text-gray-500" />
        </div>

        {/* Filtros */}
        <div className="sticky top-0 z-10 px-4 py-2 mb-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="flex gap-2 pb-2 overflow-x-auto">
            {['all', 'pending', 'paid'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as 'all' | 'pending' | 'paid')}
                className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm ${
                  filter === tab
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
              >
                {tab === 'pending' && <Skull className="w-4 h-4" />}
                {tab === 'paid' && <Crown className="w-4 h-4" />}
                {tab === 'all' && <Sparkles className="w-4 h-4" />}
                {tab === 'pending' ? 'Pendentes' : tab === 'paid' ? 'Quitadas' : 'Todas'}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Dívidas com Scroll Interno */}
        <div className="flex-1 px-4 pb-24 overflow-y-auto">
          <AnimatePresence>
            {filteredDebts.map((debt, i) => (
              <MobileDebtCard
                key={`${debt.friend}-${i}`}
                debt={debt}
                index={i}
                toggleStatus={toggleStatus}
                deleteDebt={deleteDebt}
              />
            ))}
          </AnimatePresence>

          {/* Empty State */}
          {!filteredDebts.length && (
            <div className="py-12 text-center">
              <div className="mb-4 text-6xl">🎭</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {filter === 'paid' ? 'Tudo quitado! 🎉' : 'Nada por aqui...'}
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {filter === 'paid' 
                  ? 'Hora de comemorar! 🍻' 
                  : 'Arraste para baixo para adicionar ➕'}
              </p>
            </div>
          )}
        </div>

        {/* Botão Flutuante de Adicionar */}
        <AnimatePresence>
          {!isFormVisible && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFormVisible(true)}
              className="fixed p-4 text-white rounded-full shadow-lg bottom-24 right-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-xl hover:from-purple-700 hover:to-pink-700 active:shadow-inner"
              aria-label="Adicionar nova dívida"
            >
              <Plus className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Formulário Flutuante */}
        <AnimatePresence>
          {isFormVisible && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/20 dark:bg-white/10 backdrop-blur-sm"
                onClick={() => setIsFormVisible(false)}
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 20 }}
                className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-white pb-36 dark:bg-gray-800 rounded-t-3xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="flex items-center gap-3 text-2xl font-bold dark:text-white">
                    <UserPlus className="text-pink-600" /> Nova Dívida
                  </h2>
                  <button
                    onClick={() => setIsFormVisible(false)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <X className="w-6 h-6 dark:text-white" />
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
            </>
          )}
        </AnimatePresence>

        {/* Notificação de Gestos */}
        <AnimatePresence>
          {!isFormVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed left-0 right-0 flex justify-center bottom-6"
            >
              <div className="flex items-center gap-2 px-4 py-2 text-sm text-white rounded-full bg-black/80 dark:bg-white/10">
                <span className="opacity-75">Arraste os cards para</span>
                <span className="text-green-400">↔️ ações rápidas</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}