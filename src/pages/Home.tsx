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
    // Estados do formulário
    const [newDebt, setNewDebt] = React.useState({
      friend: '',
      amount: '',
      reason: '',
      icon: '💰'
    });

    // Função para adicionar dívida
    const addDebt = () => {
      if (!newDebt.friend || !newDebt.amount) {
        toast.error('Preencha pelo menos nome e valor!', { icon: '❌' });
        return;
      }
      
      setDebts([...debts, {
        amount: Number(newDebt.amount),
        friend: newDebt.friend,
        reason: newDebt.reason || 'Sem motivo específico 🤷',
        icon: newDebt.icon,
        status: 'pending'
      }]);

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
    const filteredDebts = debts
      .filter(debt => 
        (filter === 'all' || debt.status === filter) &&
        (debt.friend.toLowerCase().includes(searchQuery.toLowerCase()) ||
        debt.reason.toLowerCase().includes(searchQuery.toLowerCase())
      ));

    // Totalizador
    const totalPending = debts
      .filter(d => d.status === 'pending')
      .reduce((sum, d) => sum + d.amount, 0);

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header/>

        <main className="max-w-6xl mx-auto px-6 py-12">
          {/* Seção de Controles Aprimorada */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold dark:text-white mb-2">
                Contas Pendentes: 
                <span className="text-[#FF6B6B] ml-2">R${totalPending.toFixed(2).replace('.', ',')}</span>
              </h2>
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="🔍 Buscar por nome ou motivo..."
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {(['all', 'pending', 'paid'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full capitalize transition-all
                    ${filter === f 
                      ? 'bg-[#4A90E2] text-white shadow-lg' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'}
                    flex items-center gap-2`}
                >
                  {f === 'all' ? 'Todos' : f === 'pending' ? 'Pendentes' : 'Pagos'}
                  {f === 'pending' && <Frown className="w-4 h-4" />}
                  {f === 'paid' && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          {/* Formulário Interativo */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-8 
            transition-all hover:shadow-lg">
            <h3 className="text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
              <Smile className="text-[#6ECCAF]" /> Nova Dívida
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Amigo"
                className="px-4 py-2 rounded-lg border bg-transparent
                  focus:ring-2 focus:ring-[#9B5DE5] transition-all"
                value={newDebt.friend}
                onChange={(e) => setNewDebt({...newDebt, friend: e.target.value})}
              />
              
              <div className="relative">
                <input
                  type="number"
                  placeholder="Valor"
                  className="w-full px-4 py-2 rounded-lg border bg-transparent
                    focus:ring-2 focus:ring-[#9B5DE5] transition-all"
                  value={newDebt.amount}
                  onChange={(e) => setNewDebt({...newDebt, amount: e.target.value})}
                />
                <span className="absolute right-3 top-3 text-gray-400">R$</span>
              </div>

              <input
                type="text"
                placeholder="Motivo (opcional)"
                className="px-4 py-2 rounded-lg border bg-transparent
                  focus:ring-2 focus:ring-[#9B5DE5] transition-all"
                value={newDebt.reason}
                onChange={(e) => setNewDebt({...newDebt, reason: e.target.value})}
              />

              <button 
                onClick={addDebt}
                className="bg-[#9B5DE5] text-white px-6 py-2 rounded-lg 
                  hover:bg-[#8247c4] transform transition-all duration-300 
                  hover:scale-105 flex items-center justify-center gap-2
                  active:scale-95">
                <DollarSign className="w-5 h-5" />
                Adicionar
              </button>
            </div>
          </div>

          {/* Grid de Dívidas Aprimorado */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDebts.map((debt, index) => (
              <div 
                key={index}
                className="group relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md 
                  hover:shadow-lg transition-all cursor-pointer border-2 border-transparent
                  hover:border-[#9B5DE5]">
                
                {/* Menu de Ações */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => toggleStatus(index)}
                    className="p-1.5 rounded-full bg-green-100 dark:bg-green-900 hover:bg-green-200 
                      dark:hover:bg-green-800 text-green-600 dark:text-green-300">
                    {debt.status === 'paid' ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                  </button>
                  
                  <button
                    onClick={() => deleteDebt(index)}
                    className="p-1.5 rounded-full bg-red-100 dark:bg-red-900 hover:bg-red-200 
                      dark:hover:bg-red-800 text-red-600 dark:text-red-300">
                    <Trash className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl animate-bounce">{debt.icon}</span>
                    <h3 className="font-bold dark:text-white">{debt.friend}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold 
                    ${debt.status === 'paid' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' 
                      : 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300'}
                    transition-colors`}>
                    {debt.status === 'paid' ? '✨ Pago' : '⏳ Pendente'}
                  </span>
                </div>

                <p className="text-2xl font-bold dark:text-white mb-2">
                  R${debt.amount.toFixed(2).replace('.', ',')}
                </p>
                
                <p className="text-gray-600 dark:text-gray-300">
                  {debt.reason}
                </p>

                {/* Botão de Lembrete */}
                <button 
                  onClick={() => toast.info(`📩 Lembrete enviado para ${debt.friend}!`)}
                  className="mt-4 w-full py-2 rounded-lg bg-gray-100 dark:bg-gray-700 
                    hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2 
                    justify-center text-sm">
                  <Bell className="w-4 h-4" />
                  Enviar Lembrete Amigável
                </button>
              </div>
            ))}
          </div>

          {/* Estado Vazio */}
          {filteredDebts.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-bold dark:text-white">
                {filter === 'paid' 
                  ? 'Todas as dívidas foram pagas!' 
                  : 'Nenhuma dívida encontrada!'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {filter === 'paid' 
                  ? 'Parabéns, você é um ótimo cobrador!' 
                  : 'Que tal adicionar uma nova dívida?'}
              </p>
            </div>
          )}
        </main>
      </div>
    );
}