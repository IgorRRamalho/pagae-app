import { useState, useEffect } from 'react';

interface DebtItem {
  id: number;
  icon: string;
  phrase: string;
}

interface Card extends DebtItem {
  uniqueId: number;
}

const DEBT_ITEMS: DebtItem[] = [
  { id: 1, icon: '🍕', phrase: "Pizza não é de graça!" },
  { id: 2, icon: '🚖', phrase: "Uber dividido, né?" },
  { id: 3, icon: '🍺', phrase: "Rodou a cerveja..." },
  { id: 4, icon: '🎮', phrase: "Vasco não paga!" },
  { id: 5, icon: '🧋', phrase: "Açaí é investimento" },
  { id: 6, icon: '🎁', phrase: "Presente de aniversário?" },
];

const PagaeMemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [showMessage, setShowMessage] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const startGame = () => {
    setIsGameStarted(true);
    setGameOver(false);
    setTimeLeft(60);
    initializeGame();
  };

  const initializeGame = () => {
    setIsShuffling(true);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setShowMessage('');
    setTimeLeft(60); // Reinicia o tempo aqui

    setTimeout(() => {
      const newCards = [...DEBT_ITEMS, ...DEBT_ITEMS]
        .sort(() => Math.random() - 0.5)
        .map((item, index) => ({ ...item, uniqueId: index }));
      setCards(newCards);
      setIsShuffling(false);
    }, 800);
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isGameStarted && !gameOver && timeLeft > 0) {
      timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }

    return () => clearInterval(timerId);
  }, [isGameStarted, gameOver, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 || solved.length === DEBT_ITEMS.length) {
      setGameOver(true);
      setShowMessage(timeLeft === 0 ? "O caloteiro fugiu! 😭" : "Caloteiro pego! 🎉");
    }
  }, [timeLeft, solved.length]);

  const handleClick = (id: number) => {
    if (!isGameStarted || gameOver || flipped.length === 2) return;

    if (flipped.length === 1) {
      const firstCard = cards.find((card) => card.uniqueId === flipped[0]);
      const secondCard = cards.find((card) => card.uniqueId === id);

      setFlipped([...flipped, id]);
      setMoves(moves + 1);

      if (firstCard?.id === secondCard?.id) {
        setSolved([...solved, firstCard.id]);
        setShowMessage(secondCard.phrase);
        setTimeout(() => setShowMessage(''), 2000);
      }

      setTimeout(() => setFlipped([]), 1000);
    } else {
      setFlipped([id]);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-gradient-to-br from-pink-400 to-orange-400 shadow-2xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Memória da Dívida!</h2>
        {!isGameStarted ? (
          <div className="space-y-4">
            <p className="text-white/90">Encontre os pares antes que o caloteiro fuja!</p>
            <button
              onClick={startGame}
              className="bg-white/20 hover:bg-white/30 px-8 py-3 rounded-full text-white font-semibold transition-colors text-lg"
            >
              Começar!
            </button>
          </div>
        ) : (
          <>
            <p className="text-white/90">Tempo restante: {formatTime(timeLeft)}</p>
            <div className="mt-4 text-white font-medium">
              Movimentos: {moves} | Acertos: {solved.length}
            </div>
          </>
        )}
      </div>

      {showMessage && (
        <div className={`animate-bounce text-center mb-4 p-3 rounded-xl font-bold ${
          gameOver ? 'bg-red-500/90 text-white' : 'bg-white/20 text-white'
        }`}>
          {showMessage}
        </div>
      )}

      {isGameStarted && (
        <>
          <div className={`grid grid-cols-4 gap-3 mb-6 min-h-[400px]`}>
            {cards.map((card) => {
              const isFlipped = flipped.includes(card.uniqueId) || solved.includes(card.id);
              return (
                <button
                  key={card.uniqueId}
                  onClick={() => handleClick(card.uniqueId)}
                  disabled={isFlipped || flipped.length === 2 || gameOver || isShuffling}
                  className={`aspect-square text-4xl flex items-center justify-center rounded-xl transition-all duration-300 ${
                    isFlipped 
                      ? 'bg-white rotate-0 scale-100' 
                      : 'bg-white/20 rotate-3 scale-95 hover:rotate-0 hover:scale-100'
                  } ${solved.includes(card.id) ? 'opacity-50' : ''} ${
                    isShuffling ? 'animate-shuffle' : ''
                  }`}
                >
                  <span className={`transition-all duration-300 ${
                    isShuffling ? 'opacity-0' : 'opacity-100'
                  }`}>
                    {isFlipped ? card.icon : '?'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={initializeGame}
              className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full text-white font-semibold transition-colors"
            >
              Jogar Novamente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PagaeMemoryGame;

