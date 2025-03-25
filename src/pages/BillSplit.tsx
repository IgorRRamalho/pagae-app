import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Wallet, Laugh, Coins, UserPlus, Zap, PartyPopper, ShieldAlert, Users, X, Ghost, Check, Plus, Search, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

type Participant = {
  id: string;
  nome: string;
  isGhost?: boolean;
  emoji?: string;
};

type Friend = {
  id: string;
  nome: string;
};

type Group = {
  id: string;
  nome: string;
  membros: Friend[];
};

const ghostEmojis = ['👻', '💀', '🎃', '👾', '🦇', '🕷️', '🕸️', '😈'];

const getInitials = (name: string) => {
  return name.split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const generateColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 40%)`;
};

export default function DivisaoContas() {
  const [modoDivisao, setModoDivisao] = useState<'igual' | 'rico'>('igual');
  const [participantes, setParticipantes] = useState<Participant[]>([]);
  const [valorTotal, setValorTotal] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showFriendSelector, setShowFriendSelector] = useState(false);
  const [showGroupSelector, setShowGroupSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [ghostName, setGhostName] = useState('');
  const [showGhostInput, setShowGhostInput] = useState(false);

  const [existingFriends] = useState<Friend[]>([
    { id: '1', nome: 'João Pizza' },
    { id: '2', nome: 'Maria Churras' },
    { id: '3', nome: 'Zé da Bola' },
    { id: '4', nome: 'Ana Cartão' },
  ]);

  const [groups] = useState<Group[]>([
    {
      id: '1',
      nome: 'Churrasco Semanal',
      membros: [
        { id: '1', nome: 'João Pizza' },
        { id: '2', nome: 'Maria Churras' },
      ]
    },
    {
      id: '2',
      nome: 'Futebol',
      membros: [
        { id: '3', nome: 'Zé da Bola' },
        { id: '4', nome: 'Ana Cartão' }
      ]
    }
  ]);

  useEffect(() => {
    document.body.style.overflow = showFriendSelector || showGroupSelector ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showFriendSelector, showGroupSelector]);

  const calcularDivisao = () => {
    if (!valorTotal || participantes.length === 0) {
      toast.error('Adicione participantes e informe o valor total!');
      return;
    }
    setShowResult(true);
  };

  const toggleFriendSelection = (friendId: string) => {
    setSelectedFriends(prev =>
      prev.includes(friendId)
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  const addSelectedParticipants = () => {
    const newParticipants = existingFriends
      .filter(friend => selectedFriends.includes(friend.id))
      .map(friend => ({
        id: friend.id,
        nome: friend.nome,
        isGhost: false
      }));

    setParticipantes(prev => [...prev, ...newParticipants]);
    setSelectedFriends([]);
    setShowFriendSelector(false);
  };

  const importGroupMembers = (group: Group) => {
    const newMembers = group.membros
      .filter(member =>
        !participantes.some(participant => participant.id === member.id)
      )
      .map(member => ({
        id: member.id,
        nome: member.nome,
        isGhost: false
      }));

    if (newMembers.length === 0) {
      toast.error('Todos os membros deste grupo já foram adicionados!');
      return;
    }

    setParticipantes(prev => [...prev, ...newMembers]);
    setShowGroupSelector(false);

    if (newMembers.length < group.membros.length) {
      toast.info(`Adicionados ${newMembers.length} membros. 
        ${group.membros.length - newMembers.length} já estavam na lista.`);
    }
  };

  const addGhostParticipant = () => {
    if (!ghostName.trim()) return;

    const newGhost = {
      id: crypto.randomUUID(),
      nome: ghostName.trim(),
      isGhost: true,
      emoji: ghostEmojis[Math.floor(Math.random() * ghostEmojis.length)]
    };

    setParticipantes(prev => [...prev, newGhost]);
    setGhostName('');
    setShowGhostInput(false);
  };

  const removeParticipant = (id: string) => {
    setParticipantes(prev => prev.filter(p => p.id !== id));
  };

  const filteredFriends = existingFriends.filter(friend =>
    friend.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ParticipantAvatar = ({ name, isGhost, emoji }: { name: string; isGhost?: boolean; emoji?: string }) => (
    isGhost ? (
      <span className="text-3xl">{emoji}</span>
    ) : (
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm"
        style={{ backgroundColor: generateColor(name) }}
      >
        {getInitials(name)}
      </div>
    )
  );

  const ParticipantCard = ({ participant }: { participant: Participant }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`group relative p-4 rounded-2xl shadow-lg ${participant.isGhost
        ? 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50'
        : 'bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/50 dark:to-green-900/50'
        }`}
    >
      <div className="flex items-center gap-4">
        <ParticipantAvatar name={participant.nome} isGhost={participant.isGhost} emoji={participant.emoji} />

        <div className="flex-1">
          <h3 className="text-lg font-medium dark:text-white">{participant.nome}</h3>
          {participant.isGhost && (
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-300">
              <Ghost className="w-4 h-4" />
              <span className="text-sm">Fantasma VIP</span>
            </div>
          )}
        </div>

        <button
          onClick={() => removeParticipant(participant.id)}
          className="text-red-500 hover:text-red-700 transition-colors opacity-70 hover:opacity-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen px-6 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto py-12"
      >
        {/* Cabeçalho */}
        <header className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
            <Coins className="text-purple-700 dark:text-purple-300 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Divisor de Contas
            <span className="ml-2 text-2xl" role="img" aria-label="Celebração">🎉</span>
          </h1>
        </header>

        {/* Seletor de Amigos e Grupos */}
        <AnimatePresence>
          {(showFriendSelector || showGroupSelector) && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md mx-4 shadow-2xl
                  border border-gray-100 dark:border-gray-700 flex flex-col"
                style={{ maxHeight: '90vh' }}
              >
                {/* Header com navegação */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {showGroupSelector ? (
                      <button
                        onClick={() => {
                          setShowGroupSelector(false);
                          setShowFriendSelector(true);
                        }}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setShowFriendSelector(false);
                          setShowGroupSelector(true);
                        }}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <Users className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </button>
                    )}
                    <h2 className="text-xl font-bold dark:text-white">
                      {showGroupSelector ? 'Seus Grupos' : 'Seus Amigos'}
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setShowFriendSelector(false);
                      setShowGroupSelector(false);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Conteúdo principal */}
                <div className="flex-1 overflow-hidden">
                  {showGroupSelector ? (
                    <div className="h-full flex flex-col">
                      <div className="relative mb-4">
                        <input
                          type="text"
                          placeholder="🔍 Buscar grupo..."
                          className="w-full p-3 pl-10 rounded-lg bg-gray-100 dark:bg-gray-700
                           text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500"
                        />
                        <Search className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                      </div>

                      <div className="flex-1 overflow-y-auto pr-2">
                        <div className="space-y-3">
                          {groups.map(group => (
                            <motion.button
                              key={group.id}
                              whileHover={{ scale: 1.01 }}
                              onClick={() => importGroupMembers(group)}
                              className="w-full p-4 text-left rounded-xl bg-gray-50 dark:bg-gray-700
                               hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors
                               border border-gray-200 dark:border-gray-600"
                            >
                              <div className="flex items-center gap-4">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-medium dark:text-white truncate">{group.nome}</h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                                    {group.membros.length} membros • Última atividade: 2 dias
                                  </p>
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col">
                      <div className="relative mb-4">
                        <input
                          type="text"
                          placeholder="🔍 Buscar amigos..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full p-3 pl-10 rounded-lg bg-gray-100 dark:bg-gray-700
                           text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500"
                        />
                        <Search className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                      </div>

                      <div className="flex-1 overflow-y-auto">
                        <div className="space-y-2 pr-2">
                          {filteredFriends.map(friend => {
                            const isDisabled = participantes.some(p => p.id === friend.id);
                            return (
                              <motion.label
                                key={friend.id}
                                whileHover={{ x: 4 }}
                                className={`flex items-center gap-4 p-3 rounded-xl transition-all
                                  ${isDisabled ? 'bg-gray-50 dark:bg-gray-700 opacity-70' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}
                                  overflow-hidden`}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedFriends.includes(friend.id)}
                                  onChange={() => !isDisabled && toggleFriendSelection(friend.id)}
                                  className={`flex-shrink-0 w-5 h-5 rounded-lg border-2 
                                    ${isDisabled ? 'border-gray-300' : 'border-purple-500 checked:bg-purple-500'}`}
                                  disabled={isDisabled}
                                />
                                <ParticipantAvatar name={friend.nome} />
                                <div className="flex-1 min-w-0">
                                  <span className="dark:text-white truncate">{friend.nome}</span>
                                  {isDisabled && (
                                    <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                      <Check className="w-4 h-4 flex-shrink-0" />
                                      <span className="truncate">Já adicionado</span>
                                    </div>
                                  )}
                                </div>
                              </motion.label>
                            );
                          })}
                        </div>
                      </div>

                      <AnimatePresence>
                        {showGhostInput && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2 overflow-hidden mt-4"
                          >
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Nome do fantasma..."
                                value={ghostName}
                                onChange={(e) => setGhostName(e.target.value)}
                                className="w-full p-3 pl-10 rounded-lg bg-gray-100 dark:bg-gray-700
                                 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500"
                              />
                              <Ghost className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={addGhostParticipant}
                                className="flex-1 bg-purple-500 text-white py-2.5 rounded-lg
                                 hover:bg-purple-600 flex items-center justify-center gap-2"
                                disabled={!ghostName.trim()}
                              >
                                <Plus className="w-4 h-4" /> Adicionar
                              </button>
                              <button
                                onClick={() => setShowGhostInput(false)}
                                className="px-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300
                                 py-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                              >
                                Cancelar
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {/* Footer condicional - só aparece no modo amigos */}
                {!showGroupSelector && (
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowGhostInput(!showGhostInput)}
                        className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300
                         py-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center gap-2"
                      >
                        <Ghost className="w-4 h-4" />
                        {showGhostInput ? 'Ocultar Fantasma' : 'Novo Fantasma'}
                      </button>

                      <button
                        onClick={addSelectedParticipants}
                        className="flex-1 bg-purple-500 text-white py-2.5 rounded-lg
                         hover:bg-purple-600 flex items-center justify-center gap-2"
                        disabled={selectedFriends.length === 0}
                      >
                        <UserPlus className="w-4 h-4" />
                        Adicionar ({selectedFriends.length})
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conteúdo Principal */}
        <main className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border-4 border-purple-100 dark:border-gray-700">
          <div className="space-y-6">
            {/* Valor Total */}
            <section>
              <label className="flex items-center gap-2 text-lg font-medium dark:text-white mb-4">
                <Wallet className="text-pink-600" />
                Valor Total da Farra 💸
              </label>
              <input
                type="number"
                value={valorTotal}
                onChange={(e) => setValorTotal(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-purple-100 dark:border-gray-700 bg-transparent
                         text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                         focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800"
                placeholder="Quanto foi a bagunça?"
              />
            </section>

            {/* Modos de Divisão */}
            <section>
              <div className="grid md:grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setModoDivisao('igual')}
                  className={`p-6 rounded-xl text-center transition-all ${modoDivisao === 'igual'
                    ? 'bg-purple-100 dark:bg-purple-900 border-4 border-purple-300 shadow-lg'
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                    }`}
                >
                  <Laugh className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 dark:text-white">
                    Divisão Amigável <span className="text-2xl">😇</span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">Igual para todos, sem stress!</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setModoDivisao('rico')}
                  className={`p-6 rounded-xl text-center transition-all ${modoDivisao === 'rico'
                    ? 'bg-green-100 dark:bg-green-900 border-4 border-green-300 shadow-lg'
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-green-900/20'
                    }`}
                >
                  <Zap className="w-12 h-12 mx-auto text-green-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 dark:text-white">
                    Ricaço Paga Tudo <span className="text-2xl">🤑</span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">O mais podreco assume!</p>
                </motion.button>
              </div>
            </section>

            {/* Lista de Participantes */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium dark:text-white">
                  <Users className="inline mr-2 text-blue-600" />
                  Turma ({participantes.length})
                </h2>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFriendSelector(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2.5 rounded-xl
                             flex items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <UserPlus className="w-5 h-5" />
                    Convidar Pessoas
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowGroupSelector(true)}
                    className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-5 py-2.5 rounded-xl
                             flex items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <Users className="w-5 h-5" />
                    Importar Grupo
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {participantes.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="col-span-2 p-8 text-center bg-gray-50 dark:bg-gray-700 rounded-xl"
                    >
                      <p className="text-gray-500 dark:text-gray-400">
                        Nenhum participante adicionado ainda. Convide seus amigos!
                      </p>
                    </motion.div>
                  ) : (
                    participantes.map(participant => (
                      <ParticipantCard key={participant.id} participant={participant} />
                    ))
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* Botão de Cálculo */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={calcularDivisao}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl
                        font-bold text-lg shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
              disabled={!valorTotal || participantes.length === 0}
            >
              <Calculator className="w-6 h-6" />
              Revelar o Verdicto!
            </motion.button>

            {/* Resultados */}
            <AnimatePresence>
              {showResult && (
                <motion.section
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="mt-6 p-6 bg-green-50 dark:bg-green-900 rounded-xl shadow-lg"
                >
                  <div className="text-center mb-4">
                    <PartyPopper className="w-12 h-12 mx-auto text-green-600 mb-2" />
                    <h3 className="text-xl font-bold dark:text-white">Resultado Final!</h3>
                  </div>

                  <div className="space-y-3">
                    {participantes.map((participant, index) => (
                      <div key={index} className="p-3 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <ParticipantAvatar name={participant.nome} isGhost={participant.isGhost} emoji={participant.emoji} />
                          <span className="font-medium dark:text-white">{participant.nome}</span>
                        </div>
                        <span className="text-green-600 font-bold">
                          R$ {(parseFloat(valorTotal) / participantes.length).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    ))}

                    <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
                      Total: R$ {parseFloat(valorTotal).toFixed(2).replace('.', ',')} • {participantes.length} {participantes.length === 1 ? 'pessoa' : 'pessoas'} •
                      <span className="ml-2">🎉 Sua turma está pronta pra próxima! 🎉</span>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        </main>

        <footer className="mt-6 text-center text-gray-600 dark:text-gray-400">
          <p className="flex items-center justify-center gap-2">
            <ShieldAlert className="w-5 h-5" />
            Lembre-se: Amigos de verdade lembram das dívidas... ou viram memes!
            <span className="text-2xl ml-2">😈</span>
          </p>
        </footer>
      </motion.div>
    </div>
  );
}