import { Footer } from '@components/Footer';
import HeaderLanding from '@components/HeaderLanding';
import PagaeMemoryGame from '@components/LandingGame';
import { SocialProof } from '@components/SocialProof';
import { Sparkles, UserPlus } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import screencapture from '@assets/screencapture.png';

function Landing() {
  return (
    <div className="min-h-screen transition-all duration-700 bg-gradient-to-br from-gray-50/50 via-white to-gray-100/50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <HeaderLanding />

      {/* Seção Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center space-y-6">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center bg-red-100 dark:bg-red-900/80 px-4 py-1.5 md:px-6 md:py-2 rounded-full mb-4 md:mb-6">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2 text-red-600 dark:text-red-300" />
            <span className="text-sm md:text-base text-red-700 dark:text-red-300 font-medium">🚨 Beta aberto</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 md:mb-6 px-2 dark:text-white">
            <span className="bg-gradient-to-r from-[#DC2626] to-[#7C3AED] bg-clip-text text-transparent">
              Chega de ser banco de amigos! 💪
            </span>
            <br />
            <span className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 mt-4 inline-block">
              O PagAê controla quem te deve e{' '}
              <span className="underline decoration-wavy decoration-teal-500 dark:decoration-teal-300">
                cobra por você
              </span>.
            </span>
          </h1>

          <p className="text-base md:text-xl text-gray-800 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            O jeito{' '}
            <span className="font-semibold text-[#7C3AED] dark:text-[#9B5DE5]">
              descomplicado
            </span>{' '}
            de gerenciar
            <div className="px-2 py-1 mx-1 bg-red-100/50 dark:bg-red-900/20 rounded-lg mt-2 md:mt-0 md:inline-block">
              <Typewriter
                words={['💰 dinheiro entre amigos', '🍕 conta da pizza', '🍻 rodada do bar']}
                loop={true}
                cursor
                cursorStyle='_'
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={5000}
              />
            </div>
            <span className="block md:inline mt-2 md:mt-0">
              sem perder a{' '}
              <span className="border-b-2 border-teal-500 dark:border-teal-300">
                ✌️ paz
              </span>
            </span>
          </p>
        </div>

        <div className="animate-fade-in-up delay-100">
          <button
            className="group relative bg-gradient-to-r from-[#DC2626] to-[#7C3AED] text-white 
  px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-lg font-semibold 
  hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto
  hover:scale-105 hover:bg-[length:400%_100%] bg-[length:200%_100%]
  hover:bg-gradient-to-r hover:from-[#7C3AED] hover:to-[#DC2626]
  hover:ring-8 hover:ring-purple-500/50"
          >
            <UserPlus className="w-4 h-4 md:w-5 md:h-5" />
            <span>💸 Resolve a treta agora - Grátis!</span>
          </button>

          <SocialProof />

          <div className="flex flex-col  md:flex-row justify-center gap-3 md:gap-4 mt-8 px-4 dark:text-white">
            {['🤙 100% Grátis', '🎉 Cadastro fácil', '📱 No celular'].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 
                border border-gray-200 dark:border-gray-700 rounded-full text-sm md:text-base"
              >
                <span className="text-xl">{item.split(' ')[0]}</span>
                <span>{item.split(' ').slice(1).join(' ')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Demonstração */}
      <section id="demo" className="relative py-24 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-purple-900/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Título adicionado */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 dark:text-white">
              <span className="bg-gradient-to-r from-[#7C3AED] to-[#DC2626] dark:from-[#6D28D9] dark:to-[#B91C1C] 
          bg-clip-text text-transparent">
                Na Prática
              </span>
              <div className="mt-4 text-2xl text-gray-600 dark:text-gray-300">✨ Veja como funciona</div>
            </h2>
          </div>

          {/* Container externo estilizado */}
          <div className="relative group perspective-3000 transform transition-all duration-700 hover:rotate-x-3">
            {/* Efeitos de fundo */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] 
        bg-[size:24px_24px] opacity-20 dark:opacity-10" />

            {/* Mockup original preservado */}
            <div className="max-w-full md:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[70vw] mx-auto">
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl md:rounded-[2rem] shadow-2xl hover:shadow-3xl 
          transition-all duration-500 border-4 md:border-8 border-gray-800 dark:border-gray-900 overflow-hidden">

                {/* Cabeçalho original */}
                <div className="flex items-center px-4 py-2 md:px-6 md:py-4 bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex space-x-1 md:space-x-2">
                    {['#FF5F56', '#FFBD2E', '#27C93F'].map((color, i) => (
                      <div key={i} className="w-2 h-2 md:w-3 md:h-3 rounded-full" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>

                {/* Conteúdo da imagem */}
                <div className="relative aspect-[16/9] bg-gray-100/50 dark:bg-gray-600/20">
                  <img
                    src={screencapture}
                    alt="Demonstração da interface do aplicativo"
                    className="w-full h-full object-center"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Elementos decorativos externos */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl 
        dark:bg-purple-600/30 -z-10" />
            <div className="absolute -bottom-16 -right-24 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl 
        dark:bg-blue-600/30 -z-10" />
          </div>

          {/* Rodapé explicativo novo */}
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Interface <span className="font-bold text-purple-600 dark:text-purple-400">limpa</span> que qualquer um domina em segundos
            </p>
            <div className="mt-6">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 
          text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Experimentar Agora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Funcionalidades */}
      <section id="vantagens" className="relative overflow-hidden py-24 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titulo com sublinhado animado */}
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4 dark:text-white relative inline-block">
              <span className="bg-gradient-to-r from-[#DC2626] to-[#7C3AED] dark:from-[#B91C1C] dark:to-[#6D28D9] bg-clip-text text-transparent">
                Vantagens sem Firula
              </span>
              <div className="absolute -bottom-4 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-purple-600 rounded-full animate-pulse-scale" />
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300 mt-8">🚀 Tecnologia que resolve de verdade</p>
          </div>

          {/* Cards em layout dinâmico */}
          <div className="grid gap-8 md:grid-cols-3 transform md:-rotate-1 hover:rotate-0 transition-transform duration-500">
            {[
              {
                icon: '👀',
                title: 'Controle Total',
                text: 'Saiba exatamente quem deve e quanto',
                color: 'from-red-500 to-purple-600'
              },
              {
                icon: '👥',
                title: 'Grupos de Amigos',
                text: 'Crie grupos para gerenciar as dívidas de todos de forma organizada.',
                color: 'from-teal-500 to-indigo-600'
              },
              {
                icon: '🧹',
                title: 'Interface Limpa e Objetiva',
                text: 'A interface foi projetada para ser direta ao ponto, sem enrolação e de fácil navegação.',
                color: 'from-purple-500 to-pink-600'
              }
            ].map((item, i) => (
              <div key={i} className="relative group bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl`} />
                <div className="text-6xl mb-6 animate-float">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="depoimentos" className="py-24 bg-gray-50 dark:bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4 dark:text-white">
              <span className="bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
                Quem usa aprova
              </span>
              <div className="mt-4 text-2xl text-gray-600 dark:text-gray-300">💬 A galera fala por experiência</div>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 transform hover:skew-y-1 transition-transform duration-500">
            {[
              {
                text: 'O app salvou nossa amizade! Nunca mais briguei por dinheiro',
                author: 'Julinho da Van',
                role: '🚐 Motorista Profissional',
                emoji: '🚐'
              },
              {
                text: 'Uso até pra dividir as comprinhas do mês! Simplesmente mágico',
                author: 'Maria do Bairro',
                role: '🛒 Especialista em Economia',
                emoji: '🛒'
              },
              {
                text: 'Finalmente uma app que entende como funciona a vida real',
                author: 'Zé do Churrasco',
                role: '🍖 Mestre do Churras',
                emoji: '🍖'
              }
            ].map((depo, i) => (
              <div key={i} className="relative group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="text-4xl mb-4 absolute -top-6 right-6 opacity-20 dark:opacity-30">{depo.emoji}</div>
                <p className="text-xl italic mb-6 dark:text-gray-300 relative z-10">"{depo.text}"</p>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="font-bold text-lg dark:text-white">{depo.author}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{depo.role}</div>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-teal-400 rounded-2xl transition-all duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jogo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PagaeMemoryGame />
      </div>

      <Footer />
    </div>
  );
}

export default Landing;