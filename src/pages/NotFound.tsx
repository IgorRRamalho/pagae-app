import { Link } from 'react-router-dom';
import { Sparkles, Ghost } from 'lucide-react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Footer } from '@components/Footer';



function NotFound() {
  return (
    <div className="min-h-screen transform transition-all duration-300 bg-gradient-to-br from-gray-50/50 via-white to-gray-100/50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Ícone Animado */}
          <div className="animate-bounce inline-block">
            <Ghost className="w-24 h-24 text-[#9B5DE5] mx-auto" strokeWidth={1.5} />
          </div>

          {/* Título Criativo */}
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 dark:text-white">
            <span className="bg-gradient-to-r from-[#FF6B6B] to-[#9B5DE5] bg-clip-text text-transparent">
              404 - Boo! 👻
            </span>
            <br />
            Essa página foi pro{' '}
            <span className="underline decoration-wavy decoration-[#6ECCAF]">
              <Typewriter
                words={['limbo', 'vácuo', 'nada', 'espaço sideral']}
                loop={true}
                cursor
                cursorStyle=''
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </h1>

          {/* Mensagem Engraçada */}
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Parece que alguém <span className="text-[#FF6B6B]">esqueceu</span> de pagar a conta do servidor... 
            <span className="ml-2">😅</span>
            <br />
            Enquanto resolvemos isso, que tal voltar para a{' '}
            <span className="font-semibold text-[#9B5DE5]">página segura</span>?
          </p>

          {/* Botão de Voltar */}
          <Link 
            to="/" 
            className="group relative inline-block bg-gradient-to-r from-[#FF6B6B] to-[#9B5DE5] text-white px-8 py-4 rounded-full text-lg font-semibold 
              hover:shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 shadow-lg items-center gap-3 mx-auto hover:gap-4"
          >
            <Sparkles className="w-5 h-5 transition-all group-hover:rotate-180 group-hover:text-yellow-300" />
            <span>✨ Leve-me de volta à segurança</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-full transition-opacity" />
          </Link>

          {/* Seção Extra de Entretenimento */}
          <div className="mt-16 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-4 dark:text-white flex items-center justify-center gap-2">
              <span className="text-[#9B5DE5]">🤔</span>
              Enquanto isso, você sabia que...
            </h3>
            <div className="text-gray-600 dark:text-gray-300 space-y-4">
              <p>👉 47% das dívidas entre amigos são esquecidas (mas não no PagAê!)</p>
              <p>👉 O botão acima é 300% mais eficaz que a tecla F5</p>
              <p>👉 Este fantasma é completamente inofensivo 👻</p>
            </div>
          </div>

          {/* Efeitos Visuais */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#9B5DE5]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#FF6B6B]/10 rounded-full blur-3xl animate-pulse delay-100" />
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

export default NotFound;