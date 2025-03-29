import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowLeft, X, Ghost, Wallet, Coins, Users, Check, Plus, UserPlus, Laugh, Zap, Calculator, PartyPopper, ShieldAlert } from 'lucide-react'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { toast } from 'react-toastify'

// Tipos e constantes
type Participant = {
  id: string
  nome: string
  isGhost?: boolean
  emoji?: string
  salario?: number
  valor?: number
}

type Friend = {
  id: string
  nome: string
}

type Group = {
  id: string
  nome: string
  membros: Friend[]
}

type DivisaoMode = 'igual' | 'rico'

const ghostEmojis = ['👻', '💀', '🎃', '👾', '🦇', '🕷️', '🕸️', '😈']
const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

// Utilitários
const parseCurrency = (value: string): number =>
  parseFloat(value.replace(/\D/g, '')) / 100 || 0

const formatCurrency = (value?: number): string =>
  value ? currencyFormatter.format(value) : ''

const generateColor = (str: string): string => {
  let hash = 0
  for (let i = 0; i < str.length; i++)
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  return `hsl(${hash % 360}, 70%, 40%)`
}

// Componente principal
export default function DivisaoContas() {
  // Estados
  const [modoDivisao, setModoDivisao] = useState<DivisaoMode>('igual')
  const [participantes, setParticipantes] = useState<Participant[]>([])
  const [valorTotal, setValorTotal] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [showFriendSelector, setShowFriendSelector] = useState(false)
  const [showGroupSelector, setShowGroupSelector] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFriends, setSelectedFriends] = useState<string[]>([])
  const [ghostName, setGhostName] = useState('')
  const [showGhostInput, setShowGhostInput] = useState(false)

  // Dados mockados
  const existingFriends = useMemo(() => [
    { id: '1', nome: 'João Pizza' }, { id: '2', nome: 'Maria Churras' },
    { id: '3', nome: 'Zé da Bola' }, { id: '4', nome: 'Ana Cartão' }
  ], [])

  const groups = useMemo(() => [
    {
      id: '1',
      nome: 'Churrasco Semanal',
      membros: [existingFriends[0], existingFriends[1]]
    },
    {
      id: '2',
      nome: 'Futebol',
      membros: [existingFriends[2], existingFriends[3]]
    }
  ], [existingFriends])

  // Efeitos
  useEffect(() => {
    document.body.style.overflow = showFriendSelector || showGroupSelector ? 'hidden' : 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [showFriendSelector, showGroupSelector])

  // Memoizações
  const totalNumerico = useMemo(() => parseCurrency(valorTotal), [valorTotal])
  const participantesIds = useMemo(() =>
    new Set(participantes.map(p => p.id)), [participantes])
  const filteredFriends = useMemo(() =>
    existingFriends.filter(f =>
      f.nome.toLowerCase().includes(searchQuery.toLowerCase())
    ), [existingFriends, searchQuery])

  // Handlers
  const handleValorTotalChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setValorTotal(value)
  }, [])

  const validateInputs = useCallback(() => {
    if (!totalNumerico || totalNumerico <= 0) {
      toast.error('Valor total inválido!')
      return false
    }
    if (participantes.length === 0) {
      toast.error('Adicione pelo menos um participante!')
      return false
    }
    if (modoDivisao === 'rico' &&
      participantes.some(p => !p.salario || p.salario <= 0)) {
      toast.error('Preencha os salários de todos os participantes!')
      return false
    }
    return true
  }, [totalNumerico, participantes, modoDivisao])

  const calcularDivisao = useCallback(() => {
    if (!validateInputs()) return
    setShowResult(true)
  }, [validateInputs])

  // Lógica de participantes
  const toggleFriendSelection = useCallback((friendId: string) => {
    setSelectedFriends(prev =>
      prev.includes(friendId) ? prev.filter(id => id !== friendId) : [...prev, friendId]
    )
  }, [])

  const addSelectedParticipants = useCallback(() => {
    const newParticipants = existingFriends
      .filter(f => selectedFriends.includes(f.id))
      .map(f => ({
        id: f.id,
        nome: f.nome,
        isGhost: false
      }))

    setParticipantes(prev => [...prev, ...newParticipants])
    setSelectedFriends([])
    setShowFriendSelector(false)
  }, [existingFriends, selectedFriends])

  const importGroupMembers = useCallback((group: Group) => {
    const newMembers = group.membros
      .filter(m => !participantesIds.has(m.id))
      .map(m => ({ id: m.id, nome: m.nome, isGhost: false }))

    if (newMembers.length === 0) {
      toast.error('Todos os membros já foram adicionados!')
      return
    }

    setParticipantes(prev => [...prev, ...newMembers])
    setShowGroupSelector(false)

    if (newMembers.length < group.membros.length) {
      toast.info(`${newMembers.length} membros adicionados. 
        ${group.membros.length - newMembers.length} já estavam na lista.`)
    }
  }, [participantesIds])

  const addGhostParticipant = useCallback(() => {
    if (!ghostName.trim()) return

    const newGhost = {
      id: crypto.randomUUID(),
      nome: ghostName.trim(),
      isGhost: true,
      emoji: ghostEmojis[Math.floor(Math.random() * ghostEmojis.length)]
    }

    setParticipantes(prev => [...prev, newGhost])
    setGhostName('')
    setShowGhostInput(false)
  }, [ghostName])

  const removeParticipant = useCallback((id: string) => {
    setParticipantes(prev => prev.filter(p => p.id !== id))
  }, [])

  // Componentes internos
  const ParticipantAvatar = useCallback(({
    name,
    isGhost,
    emoji
  }: {
    name: string;
    isGhost?: boolean;
    emoji?: string
  }) => (
    isGhost ? (
      <span className="text-3xl">{emoji}</span>
    ) : (
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm"
        style={{ backgroundColor: generateColor(name) }}
      >
        {name.split(' ')
          .map(p => p[0])
          .join('')
          .toUpperCase()
          .substring(0, 2)}
      </div>
    )
  ), [])

  const ParticipantCard = useCallback(({ participant }: { participant: Participant }) => {
    const [localSalary, setLocalSalary] = useState('')

    const handleSalaryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, '')
      setLocalSalary(rawValue)
      const numericValue = parseFloat(rawValue) / 100 || 0
      setParticipantes(prev =>
        prev.map(p =>
          p.id === participant.id ? { ...p, salario: numericValue } : p
        )
      )
    }, [participant.id])

    const displayValue = useMemo(() =>
      localSalary ?
        (parseFloat(localSalary) / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }) : '',
      [localSalary])

    return (
      <div className={`group relative p-4 rounded-2xl shadow-sm transition-all
        ${participant.isGhost ?
          'bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-900/30 dark:to-pink-900/30 hover:shadow-purple-100/30' :
          'bg-gradient-to-br from-blue-50/80 to-green-50/80 dark:from-blue-900/30 dark:to-green-900/30 hover:shadow-blue-100/30'}`}
      >
        <div className="flex items-start gap-3">
          <ParticipantAvatar name={participant.nome} isGhost={participant.isGhost} emoji={participant.emoji} />
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
                  {participant.nome}
                </h3>
                {participant.isGhost && (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Ghost className="w-4 h-4 text-purple-600/80 dark:text-purple-300/80" />
                    <span className="text-xs font-medium text-purple-600/90 dark:text-purple-300/90">
                      Fantasma VIP
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={() => removeParticipant(participant.id)}
                className="p-1 -m-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {modoDivisao === 'rico' && (
              <div className="pt-2">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Coins className="w-5 h-5 text-amber-500/90 dark:text-amber-400/80" />
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={displayValue}
                    onChange={handleSalaryChange}
                    className="w-full pl-10 pr-12 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:text-white"
                    placeholder="Salário..."
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    BRL
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }, [ParticipantAvatar, modoDivisao, removeParticipant])

  const calcularResultado = useCallback(() => {
    if (modoDivisao === 'igual') {
      const valorPorPessoa = totalNumerico / participantes.length
      return participantes.map(p => ({
        ...p,
        valor: valorPorPessoa
      }))
    }

    const salarios = participantes.map(p => p.salario || 0)
    const maiorSalario = Math.max(...salarios)
    const ricos = participantes.filter(p => p.salario === maiorSalario)

    return participantes.map(p => ({
      ...p,
      valor: ricos.includes(p) ? totalNumerico / ricos.length : 0
    }))
  }, [modoDivisao, participantes, totalNumerico])

  // Renderização
  return (
    <div className="min-h-screen px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto py-12"
      >
        {/* Cabeçalho */}
        <header className="flex items-center gap-4 mb-8">
          <Coins className="text-purple-700 dark:text-purple-300 w-8 h-8" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Divisor de Contas
            <span className="ml-2 text-2xl" role="img" aria-label="Celebração">🎉</span>
          </h1>
        </header>

        {/* Modais de seleção */}
        <AnimatePresence>
          {(showFriendSelector || showGroupSelector) && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md mx-4 shadow-2xl border border-gray-100 dark:border-gray-700 flex flex-col"
                style={{ maxHeight: '90vh' }}
              >
                {/* Cabeçalho do modal */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {showGroupSelector ? (
                      <button
                        onClick={() => {
                          setShowGroupSelector(false)
                          setShowFriendSelector(true)
                        }}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setShowFriendSelector(false)
                          setShowGroupSelector(true)
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
                      setShowFriendSelector(false)
                      setShowGroupSelector(false)
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Conteúdo do modal */}
                <div className="flex-1 overflow-hidden">
                  {showGroupSelector ? (
                    <div className="h-full flex flex-col">
                      <div className="relative mb-4">
                        <input
                          type="text"
                          placeholder="🔍 Buscar grupo..."
                          className="w-full p-3 pl-10 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500"
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
                              className="w-full p-4 text-left rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors border border-gray-200 dark:border-gray-600"
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
                          className="w-full p-3 pl-10 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500"
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
                    <ParticipantCard
                      key={participant.id}
                      participant={participant}
                    />
                  ))
                )}
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
                    {calcularResultado().map((participant, index) => (
                      <div key={index} className="p-3 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <ParticipantAvatar name={participant.nome} isGhost={participant.isGhost} emoji={participant.emoji} />
                          <span className="font-medium dark:text-white">{participant.nome}</span>
                        </div>
                        <span className={`${participant.valor > 0 ? 'text-green-600' : 'text-gray-500'} font-bold`}>
                          {formatCurrency(participant.valor)}
                        </span>
                      </div>
                    ))}

                    <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
                      Total: {formatCurrency(parseFloat(valorTotal))} • {participantes.length} {participantes.length === 1 ? 'pessoa' : 'pessoas'} •
                      <span className="ml-2">🎉 Sua turma está pronta pra próxima! 🎉</span>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Footer */}
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
