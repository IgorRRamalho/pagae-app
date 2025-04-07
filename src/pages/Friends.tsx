import GhostFriendForm from '@components/GhostFriendForm';
import { motion } from 'framer-motion';
import { Ghost, Plus, Search, ShieldAlert, Sparkles, UserCheck, UserX } from 'lucide-react';
import { useState } from 'react';


const Friends = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('ativos');
    const [showAddFriend, setShowAddFriend] = useState(false);

    // Dados de exemplo
    const friends = [
        {
            name: 'Zé da Pizza',
            avatar: '🍕',
            status: 'te deve',
            amount: 'R$ 47,50',
            lastInteraction: '2 dias atrás',
            isGhost: false
        },
        {
            name: 'Ana Uber',
            avatar: '🚗',
            status: 'você deve',
            amount: 'R$ 15,00',
            lastInteraction: '1 semana atrás',
            isGhost: false
        },
        {
            name: '@mafalda_artes',
            avatar: '👻',
            status: 'não cadastrado',
            amount: 'R$ 32,00',
            lastInteraction: '3 meses atrás',
            isGhost: true
        }
    ];

    return (
        <div className="min-h-full p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-4xl mx-auto"
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start mb-8">
                    <div className="flex items-center gap-3">
                        <Sparkles className="text-purple-600 dark:text-purple-400 h-8 w-8" />
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Seu Esquadrão
                            <span className="text-purple-600 dark:text-purple-400 ml-2">💸</span>
                        </h1>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setShowAddFriend(!showAddFriend)}
                        className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 text-white px-6 py-3 rounded-full 
                      flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Adicionar Parceiro</span>
                    </motion.button>
                </div>

                {/* Formulário Fantasma (aparece ao clicar no botão) */}
                {showAddFriend && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <GhostFriendForm />
                    </motion.div>
                )}

                {/* Filtros */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3.5 text-gray-500 dark:text-gray-400" />
                        <input
                            type="text"
                            placeholder="Procurar parceiro..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 
                        dark:border-gray-700 focus:border-purple-500"
                        />
                    </div>

                    <div className="flex gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                        {['ativos', 'fantasmas', 'arquivados'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
                          ${activeTab === tab
                                        ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                            >
                                {tab === 'fantasmas' && <Ghost className="w-4 h-4" />}
                                {tab === 'arquivados' && <ShieldAlert className="w-4 h-4" />}
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Lista de Amigos */}
                <div className="grid gap-4">
                    {friends
                        .filter(friend =>
                            friend.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                            (activeTab === 'fantasmas' ? friend.isGhost : !friend.isGhost)
                        )
                        .map((friend, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-gray-800 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 
                          hover:border-purple-200 dark:hover:border-purple-800 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Avatar */}
                                    <div className={`text-3xl p-3 rounded-lg ${friend.isGhost
                                        ? 'bg-purple-100 dark:bg-purple-900/50'
                                        : 'bg-gray-100 dark:bg-gray-700'}`}>
                                        {friend.avatar}
                                    </div>

                                    {/* Detalhes */}
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {friend.name}
                                            {friend.isGhost &&
                                                <span className="ml-2 text-sm text-purple-600 dark:text-purple-400">👻 Fantasma</span>}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {friend.status === 'te deve' ? (
                                                <span className="text-red-500">🔴 {friend.amount}</span>
                                            ) : friend.status === 'você deve' ? (
                                                <span className="text-green-500">🟢 {friend.amount}</span>
                                            ) : (
                                                <span className="text-gray-500">⚪ {friend.amount}</span>
                                            )}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            Última cobrança: {friend.lastInteraction}
                                        </p>
                                    </div>

                                    {/* Ações */}
                                    <div className="flex gap-2">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-purple-900/50"
                                            title={friend.isGhost ? "Cobrar Fantasma" : "Ver Detalhes"}
                                        >
                                            {friend.isGhost ? <UserX className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </div>

                {/* Empty State */}
                {friends.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 text-gray-500 dark:text-gray-400"
                    >
                        <Ghost className="mx-auto h-12 w-12 mb-4" />
                        <p className="text-lg">Nenhum parceiro encontrado!</p>
                        <p>Adicione amigos para começar a gerenciar as dívidas 🎉</p>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default Friends;