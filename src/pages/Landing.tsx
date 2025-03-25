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
      <section id="demo" className="max-w-full md:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[70vw] mx-auto px-4 py-8 md:py-12">
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl md:rounded-[2rem] shadow-xl 
          overflow-hidden border-4 md:border-8 border-gray-800 dark:border-gray-900">

          {/* Cabeçalho simplificado para mobile */}
          <div className="flex items-center px-4 py-2 md:px-6 md:py-4 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex space-x-1 md:space-x-2">
              {['#FF5F56', '#FFBD2E', '#27C93F'].map((color, i) => (
                <div key={i} className="w-2 h-2 md:w-3 md:h-3 rounded-full" style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>

          <div className="relative aspect-[16/9] bg-gray-100/50 dark:bg-gray-600/20">
            <img
              src={screencapture}
              alt="Demonstração da interface do aplicativo"
              className="w-full h-full object-center"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Seção Funcionalidades */}
      <section id="vantagens" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">
          <span
            className="bg-gradient-to-r from-[#DC2626] to-[#7C3AED] dark:from-[#B91C1C] dark:to-[#6D28D9] 
            bg-clip-text text-transparent"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            Vantagens sem firula
          </span>
          <div className="mt-4 text-2xl text-gray-700 dark:text-gray-300">🚀 Pra você não se enrolar</div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: '👀',
              bg: 'bg-blue-600 dark:bg-blue-300',
              textColor: 'text-blue-50 dark:text-blue-900',
              title: 'Controle Total',
              text: 'Saiba exatamente quem deve e quanto'
            },
            {
              icon: '📅',
              bg: 'bg-teal-600 dark:bg-teal-300',
              textColor: 'text-teal-50 dark:text-teal-900',
              title: 'Lembretes Automáticos',
              text: 'Configure uma vez e esqueça'
            },
            {
              icon: '💸',
              bg: 'bg-red-600 dark:bg-red-300',
              textColor: 'text-red-50 dark:text-red-900',
              title: 'Pagamento Fácil',
              text: 'Integração com principais carteiras digitais'
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl 
                transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-transparent"
            >
              <div className={`${feature.bg} ${feature.textColor} w-16 h-16 rounded-2xl mb-6 flex items-center 
                justify-center transform group-hover:rotate-12 transition-all`}>
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seção Depoimentos */}
      <section id="depoimentos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">
          O que tão falando
          <div className="mt-2 text-2xl text-teal-600 dark:text-teal-300">Quem usa recomenda</div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              text: 'Finalmente parei de ser o chato que cobra! O app faz isso por mim',
              author: 'Julinho da Van 🚐'
            },
            {
              text: 'Uso até pra dividir as compras do mercado!',
              author: 'Maria do Bairro 🛒'
            },
            {
              text: 'O grupo de amigos nunca mais discutiu por dinheiro',
              author: 'Zé do Churrasco 🍖'
            }
          ].map((depoimento, i) => (
            <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <p className="text-lg italic mb-4 dark:text-gray-300">"{depoimento.text}"</p>
              <div className="border-t-2 border-teal-500/20 dark:border-teal-300/20 pt-4">
                <span className="font-bold dark:text-white">{depoimento.author}</span>
              </div>
            </div>
          ))}
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