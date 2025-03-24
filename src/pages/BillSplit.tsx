import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Wallet, Laugh, Coins, UserPlus, Zap, PartyPopper, ShieldAlert, Users, X } from 'lucide-react';
import { useState, useEffect } from 'react';

type Participant = {
  id: string;
  nome: string;
  salario: string;
  isGhost?: boolean;
};

type Friend = {
  id: string;
  nome: string;
  isGhost?: boolean;
};

export default function DivisaoContas() {
  const [modoDivisao, setModoDivisao] = useState<'igual' | 'rico' | 'custom'>('igual');
  const [participantes, setParticipantes] = useState<Participant[]>([{
    id: crypto.randomUUID(),
    nome: '',
    salario: '',
    isGhost: true
  }]);
  const [valorTotal, setValorTotal] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showFriendSelector, setShowFriendSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [newGhostName, setNewGhostName] = useState('');
  const [existingFriends] = useState<Friend[]>([
    { id: '1', nome: 'João Silva' },
    { id: '2', nome: 'Maria Souza' },
    { id: '3', nome: 'Fantasminha', isGhost: true },
  ]);

  useEffect(() => {
    if (showFriendSelector) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showFriendSelector]);

  const calcularDivisao = () => {
    if (!validateForm()) return;
    setShowResult(true);
  };

  const validateForm = () => {
    if (!valorTotal) {
      alert('Por favor, informe o valor total!');
      return false;
    }
    if (participantes.some(p => !p.nome.trim())) {
      alert('Por favor, preencha o nome de todos os participantes!');
      return false;
    }
    return true;
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
        salario: '',
        isGhost: friend.isGhost
      }));

    setParticipantes(prev => [...prev, ...newParticipants]);
    setSelectedFriends([]);
    setShowFriendSelector(false);
  };

  const addGhostParticipant = () => {
    if (newGhostName.trim()) {
      setParticipantes(prev => [...prev, {
        id: crypto.randomUUID(),
        nome: newGhostName,
        salario: '',
        isGhost: true
      }]);
      setNewGhostName('');
    }
  };

  const updateParticipant = (index: number, field: keyof Participant, value: string) => {
    setParticipantes(prev =>
      prev.map((participant, i) =>
        i === index ? { ...participant, [field]: value } : participant
      )
    );
  };

  const removeParticipant = (index: number) => {
    setParticipantes(prev => prev.filter((_, i) => i !== index));
  };

  const filteredFriends = existingFriends.filter(friend =>
    friend.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ParticipantCard = ({ participant, index }: { participant: Participant, index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="group relative p-4 rounded-2xl bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex gap-4 items-center">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <span
              className="text-lg"
              role="img"
              aria-label={participant.isGhost ? "Participante fantasma" : "Participante"}
            >
              {participant.isGhost ? '👻' : '👤'}
            </span>
            <input
              value={participant.nome}
              onChange={(e) => updateParticipant(index, 'nome', e.target.value)}
              className={`w-full bg-transparent border-b-2 text-lg ${participant.isGhost
                  ? 'border-purple-100 dark:border-gray-600 focus:border-purple-500'
                  : 'border-transparent text-gray-400 dark:text-gray-500 cursor-not-allowed'
                } focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500`}
              placeholder={`Nome do participante ${index + 1}`}
              aria-required="true"
              readOnly={!participant.isGhost} // ✅ Correto: editar apenas fantasmas
            />
          </div>

          {modoDivisao === 'rico' && (
            <div className="flex items-center gap-2 ml-8">
              <Zap className="w-4 h-4 text-green-500" aria-hidden="true" />
              <input
                type="number"
                value={participant.salario}
                onChange={(e) => updateParticipant(index, 'salario', e.target.value)}
                className="bg-transparent border-b-2 border-green-100 dark:border-gray-600
                         focus:border-green-500 focus:ring-0 text-gray-900 dark:text-gray-100
                         placeholder-gray-400 dark:placeholder-gray-500 w-32"
                placeholder="Renda mensal"
                aria-label="Renda mensal do participante"
                disabled={!participant.isGhost}
              />
            </div>
          )}
        </div>

        {participant.isGhost && (
          <button
            onClick={() => removeParticipant(index)}
            className="text-red-500 hover:text-red-700 transition-colors opacity-70 hover:opacity-100"
            aria-label={`Remover participante ${participant.nome || index + 1}`}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto py-12"
      >
        {/* Cabeçalho */}
        <header className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
            <Coins className="text-purple-700 dark:text-purple-300 w-8 h-8" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Divisor de Contas
            <span className="ml-2 text-2xl" role="img" aria-label="Celebração">🎉</span>
          </h1>
        </header>

        {/* Seletor de Amigos */}
        <AnimatePresence>
          {showFriendSelector && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              role="dialog"
              aria-modal="true"
              aria-labelledby="friendSelectorTitle"
            >
              <div
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md mx-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 id="friendSelectorTitle" className="text-xl font-bold dark:text-white">
                    Adicionar Participantes
                  </h2>
                  <button
                    onClick={() => setShowFriendSelector(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
                    aria-label="Fechar"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="🔍 Pesquisar amigos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-3 mb-4 rounded-lg bg-gray-100 dark:bg-gray-700
                           border-2 border-transparent focus:border-purple-500
                           text-gray-900 dark:text-gray-100"
                  aria-label="Pesquisar participantes"
                />

                <div className="max-h-60 overflow-y-auto space-y-2">
                  {filteredFriends.map(friend => (
                    <label
                      key={friend.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFriends.includes(friend.id)}
                        onChange={() => toggleFriendSelection(friend.id)}
                        className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                        aria-label={`Selecionar ${friend.nome}`}
                      />
                      <span
                        className="text-lg"
                        role="img"
                        aria-label={friend.isGhost ? "Fantasma" : "Pessoa"}
                      >
                        {friend.isGhost ? '👻' : '👤'}
                      </span>
                      <span className="text-gray-900 dark:text-gray-100">{friend.nome}</span>
                    </label>
                  ))}
                </div>

                <div className="mt-4 space-y-4">
                  <div className="border-t pt-4 dark:border-gray-700">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newGhostName}
                        onChange={(e) => setNewGhostName(e.target.value)}
                        placeholder="Nome do fantasma"
                        className="flex-1 p-2 rounded-lg border-2 border-purple-100 dark:border-gray-600
                                 bg-transparent text-gray-900 dark:text-gray-100"
                        aria-label="Nome do participante fantasma"
                      />
                      <button
                        onClick={addGhostParticipant}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                        aria-label="Adicionar fantasma"
                      >
                        <UserPlus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={addSelectedParticipants}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                    aria-label="Adicionar participantes selecionados"
                  >
                    Adicionar Selecionados ({selectedFriends.length})
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border-4 border-purple-100 dark:border-gray-700">
          <div className="space-y-6">
            {/* Valor Total */}
            <section>
              <label className="flex items-center gap-2 text-lg font-medium dark:text-white">
                <Wallet className="text-pink-600" aria-hidden="true" />
                Valor Total <span role="img" aria-label="Dinheiro">💸</span>
              </label>
              <input
                type="number"
                value={valorTotal}
                onChange={(e) => setValorTotal(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-purple-100 dark:border-gray-700 bg-transparent
                         focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800
                         text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Digite o valor total"
                aria-required="true"
              />
            </section>

            {/* Modos de Divisão */}
            <section>
              <h2 className="sr-only">Modos de divisão</h2>
              <div className="grid md:grid-cols-2 gap-4" role="radiogroup" aria-label="Escolha o método de divisão">
                <motion.button
                  role="radio"
                  aria-checked={modoDivisao === 'igual'}
                  onClick={() => setModoDivisao('igual')}
                  className={`p-6 rounded-xl flex flex-col items-center gap-3 transition-colors
                    ${modoDivisao === 'igual'
                      ? 'bg-purple-100 dark:bg-purple-900 border-2 border-purple-300'
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20'}`}
                >
                  <Laugh className="w-8 h-8 text-purple-600" aria-hidden="true" />
                  <span className="font-medium dark:text-white">Igual Sem Chorar <span role="img" aria-label="Risada">😂</span></span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Divisão igualitária tradicional</span>
                </motion.button>

                <motion.button
                  role="radio"
                  aria-checked={modoDivisao === 'rico'}
                  onClick={() => setModoDivisao('rico')}
                  className={`p-6 rounded-xl flex flex-col items-center gap-3 transition-colors
                    ${modoDivisao === 'rico'
                      ? 'bg-green-100 dark:bg-green-900 border-2 border-green-300'
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-green-900/20'}`}
                >
                  <Zap className="w-8 h-8 text-green-600" aria-hidden="true" />
                  <span className="font-medium dark:text-white">Deixa o Rico Pagar <span role="img" aria-label="Dinheiro">💸</span></span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Proporcional à renda mensal</span>
                </motion.button>
              </div>
            </section>

            {/* Lista de Participantes */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium dark:text-white flex items-center gap-2">
                  <Users className="text-blue-600" aria-hidden="true" />
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Participantes ({participantes.length})
                  </span>
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowFriendSelector(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white
                           px-5 py-2.5 rounded-xl hover:shadow-lg transition-all
                           flex items-center gap-2 shadow-md"
                  aria-label="Abrir seletor de participantes"
                >
                  <UserPlus className="w-5 h-5" />
                  Adicionar
                </motion.button>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {participantes.map((participant, index) => (
                    <ParticipantCard
                      key={participant.id}
                      participant={participant}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </section>

            {/* Botão de Cálculo */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={calcularDivisao}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl
                        font-bold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              aria-live="polite"
            >
              <Calculator className="w-6 h-6" aria-hidden="true" />
              Calcular Divisão
            </motion.button>

            {/* Resultados */}
            {showResult && (
              <motion.section
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="mt-6 p-6 bg-green-50 dark:bg-green-900 rounded-xl"
                role="region"
                aria-live="polite"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-white">
                  <PartyPopper className="text-green-600" aria-hidden="true" /> Resultado Final!
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <span className="font-medium">João Silva</span>
                    <span className="text-green-600 font-bold">R$ 47,50</span>
                  </div>

                  <div className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
                    Valor total: R$ 190,00 • 4 pessoas <span role="img" aria-label="Celebração">🎊</span>
                  </div>
                </div>
              </motion.section>
            )}
          </div>
        </main>

        <footer className="mt-6 text-center text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
          <ShieldAlert className="w-5 h-5" aria-hidden="true" />
          <p>
            Lembre-se: Amigos verdadeiros pagam as dívidas... ou viram memes!{" "}
            <span role="img" aria-label="Diabo">😈</span>
          </p>
        </footer>
      </motion.div>
    </div>
  );
}