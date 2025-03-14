import { Bell, CreditCard, Send, UserPlus, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import screencapture from '../public/screencapture.png';

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-gray-100/50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center bg-[#FF6B6B]/10 px-6 py-2 rounded-full mb-6 border border-[#FF6B6B]/20">
            <Sparkles className="w-5 h-5 mr-2 text-[#FF6B6B]" />
            <span className="text-[#FF6B6B] font-medium">Beta Aberta Disponivel!</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 dark:text-white">
            <span className="bg-gradient-to-r from-[#FF6B6B] to-[#9B5DE5] bg-clip-text text-transparent">
              Amizades sem dívidas
            </span>
            <br />
            esquecidas
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            O jeito <span className="font-semibold text-[#9B5DE5]">descomplicado</span> de gerenciar 
            <span className="px-2 py-1 mx-1 bg-[#FF6B6B]/10 rounded-lg">💰 dinheiro entre amigos</span> 
            sem perder a <span className="border-b-2 border-[#6ECCAF]">✌️ paz</span>
          </p>
        </div>

        <div className="animate-fade-in-up delay-100">
          <button className="group relative bg-gradient-to-r from-[#FF6B6B] to-[#9B5DE5] text-white px-8 py-4 rounded-full text-lg font-semibold 
            hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 shadow-lg
            flex items-center gap-3 mx-auto hover:gap-4">
            <UserPlus className="w-5 h-5 transition-all group-hover:w-6 group-hover:h-6" />
            <span>Comece Agora - É Grátis!</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-full transition-opacity" />
          </button>
          
          <div className="mt-4 flex justify-center items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <div className="h-px w-8 bg-current opacity-30" />
            Já usam o PagAê
            <div className="h-px w-8 bg-current opacity-30" />
          </div>
          
          <div className="flex justify-center space-x-4 mt-3">
            {/* Avatares de usuários fictícios */}
            {['😎', '🤩', '🥳'].map((emoji, i) => (
              <div 
                key={i}
                className="w-10 h-10 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm 
                  border-2 border-[#FF6B6B]/10 hover:border-[#9B5DE5]/30 transition-all"
              >
                <span className="text-xl">{emoji}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative group">
        <div className="relative bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl overflow-hidden transition-all duration-500 
          hover:shadow-3xl hover:-translate-y-2 border-8 border-white dark:border-gray-900">
          
          {/* Browser Mockup */}
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
            <div className="flex-1 text-center text-sm text-gray-500 dark:text-gray-400 font-medium">
              pagae.app/dashboard
            </div>
          </div>

          {/* Image Container */}
          <div className="relative aspect-[16/9] bg-gray-100/50 dark:bg-gray-600/20">
            <img
              src={screencapture}
              alt="Interface intuitiva do PagAê mostrando lista de dívidas, gráficos de resumo e ações rápidas"
              className="w-full h-full object-contain object-left-top p-4 md:p-8"
            />
            
            {/* Interactive Highlight */}
            <div className="absolute bottom-8 right-8 bg-white dark:bg-gray-900 p-5 rounded-xl shadow-lg max-w-xs 
              border border-gray-100 dark:border-gray-700 hidden md:block transform transition-transform 
              group-hover:translate-x-0 translate-x-16">
              <h3 className="font-bold text-lg mb-3 dark:text-white flex items-center gap-2">
                <span className="text-[#9B5DE5]">✨</span>
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

        {/* Gradient Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#9B5DE5]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#FF6B6B]/10 rounded-full blur-3xl" />
        </div>
      </main>

      {/* Value Proposition Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        <h2 className="text-4xl font-bold text-center dark:text-white">
          Por que os amigos{' '}
          <span className="relative inline-block">
            <span className="relative z-10">amam</span>
            <div className="absolute bottom-0 h-3 w-full bg-[#FF6B6B]/30 -rotate-1" />
          </span>{' '}
          o PagAê?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: <CreditCard className="w-8 h-8 text-white" />,
              bg: 'bg-[#4A90E2]',
              title: 'Rastreamento em Tempo Real',
              text: 'Atualizações instantâneas de quem deve o quê'
            },
            {
              icon: <Bell className="w-8 h-8 text-white" />,
              bg: 'bg-[#6ECCAF]',
              title: 'Lembretes sem Constrangimento',
              text: 'Notificações automáticas e personalizáveis'
            },
            {
              icon: <Send className="w-8 h-8 text-white" />,
              bg: 'bg-[#FF6B6B]',
              title: 'Pagamento Integrado',
              text: 'Conecte sua carteira digital e resolva em segundos'
            }
          ].map((feature, i) => (
            <div 
              key={i}
              className="group relative p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl 
                transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-transparent"
            >
              <div className={`${feature.bg} w-16 h-16 rounded-2xl mb-6 flex items-center justify-center 
                transform group-hover:rotate-12 transition-all`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.text}</p>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#9B5DE5]/20 rounded-2xl 
                pointer-events-none transition-all" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Landing;