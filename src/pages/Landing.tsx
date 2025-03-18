import { Footer } from '@components/Footer';
import HeaderLanding from '@components/HeaderLanding';
import PagaeMemoryGame from '@components/LandingGame';
import { SocialProof } from '@components/SocialProof';
import { Sparkles, UserPlus } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';

function Landing() {
  return (
    <div id="hero" className="min-h-screen transform transition-all duration-300 bg-gradient-to-br from-gray-50/50 via-white to-gray-100/50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <HeaderLanding />

      {/* Seção Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center bg-red-100 dark:bg-red-900/80 px-6 py-2 rounded-full mb-6 border border-red-200 dark:border-red-800">
            <Sparkles className="w-5 h-5 mr-2 text-red-600 dark:text-red-300" />
            <span className="text-red-700 dark:text-red-300 font-medium">🚨 Beta aberto</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 dark:text-white">
            <span 
              className="bg-gradient-to-r from-[#DC2626] to-[#7C3AED] bg-clip-text text-transparent"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              Chega de ser banco de amigos! 💪
            </span>
            <br />
            <span className="text-gray-800 dark:text-gray-100">
              O PagAê controla quem te deve e <span 
                className="underline decoration-wavy decoration-teal-500 dark:decoration-teal-300"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                cobra por você
              </span>.
            </span>
          </h1>

          <p className="text-xl text-gray-800 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            O jeito <span className="font-semibold text-[#7C3AED] dark:text-[#9B5DE5]">descomplicado</span> de gerenciar
            <span className="px-2 py-1 mx-1 bg-red-100/50 dark:bg-red-900/20 rounded-lg">
              <Typewriter
                words={[
                  '💰 dinheiro entre amigos',
                  '🍕 conta da pizza',
                  '🍻 rodada do bar',
                  '🚗 gasolina da viagem',
                  '🎉 festa da galera',
                  '💰 cerveja do churrasco',
                ]}
                loop={true}
                cursor
                cursorStyle='_'
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={5000}
              />
            </span>
            sem perder a <span className="border-b-2 border-teal-500 dark:border-teal-300">✌️ paz</span>
          </p>
        </div>

        <div className="animate-fade-in-up delay-100">
          <button 
            className="group relative bg-gradient-to-r from-[#DC2626] to-[#7C3AED] dark:from-[#B91C1C] dark:to-[#6D28D9] 
            text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform transition-all 
            duration-500 hover:scale-[1.02] hover:-translate-y-1 shadow-lg flex items-center gap-3 mx-auto hover:gap-4"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
            <UserPlus className="w-5 h-5 transition-all group-hover:w-6 group-hover:h-6" />
            <span>💸 Resolve a treta agora - É grátis!</span>
            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-all">🤑</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-full transition-opacity" />
          </button>

          <SocialProof />

          <div className="flex justify-center space-x-4 mt-8">
            {['🤙 100% Gratuito', '🎉 Cadastro fácil', '📱 Funciona no celular'].map((item, i) => (
              <div 
                key={i} 
                className="flex items-center gap-2 px-4 text-gray-900 dark:text-white py-2 bg-white/90 dark:bg-gray-800/90 
                border border-gray-200 dark:border-gray-700 rounded-full shadow-sm">
                <span className="text-xl">{item.split(' ')[0]}</span>
                <span className="text-sm font-medium">{item.split(' ').slice(1).join(' ')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Demonstração */}
      <section id="demo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative group">
        <div className="relative bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl overflow-hidden transition-all duration-500 
          hover:shadow-3xl hover:-translate-y-2 border-8 border-white dark:border-gray-900">

          <div className="flex items-center px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-600">
            <div className="flex space-x-2">
              {['#FF5F56', '#FFBD2E', '#27C93F'].map((color, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="relative aspect-[16/9] bg-gray-100/50 dark:bg-gray-600/20">
            <img
              src="/screencapture.png"
              alt="Interface do PagAê"
              className="w-full h-full object-contain object-left-top p-4 md:p-8"
            />

            <div className="absolute bottom-8 right-8 bg-white dark:bg-gray-900 p-5 rounded-xl shadow-lg max-w-xs 
              border border-gray-100 dark:border-gray-700 hidden md:block transform transition-transform 
              group-hover:translate-x-0 translate-x-16">
              <h3 className="font-bold text-lg mb-3 dark:text-white flex items-center gap-2">
                <span className="text-[#7C3AED] dark:text-[#9B5DE5]">✨</span>
                Destaques
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  { icon: '✅', text: 'Status claro de cada dívida' },
                  { icon: '📅', text: 'Lembretes automáticos' },
                  { icon: '🔒', text: 'Pagamentos seguros' }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 dark:text-gray-300">
                    <span className="text-xl">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
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