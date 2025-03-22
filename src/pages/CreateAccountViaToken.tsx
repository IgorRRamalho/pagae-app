import { Footer } from '@components/Footer';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Loader2, Rocket, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

function CreateAccountViaToken() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleAccountCreation = async () => {
      try {
        // Simular chamada à API
        const response = await fetch(`/api/create-account/${token}`);
        
        if (!response.ok) {
          throw new Error('Token inválido ou expirado');
        }

        // Se sucesso
        setStatus('success');

      } catch (error) {
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Erro desconhecido');
      }
    };

    handleAccountCreation();
  }, [token, navigate]);

  return (
    <div className="min-h-screen transform transition-all duration-300 bg-gradient-to-br from-gray-50/50 via-white to-gray-100/50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {status === 'loading' && (
            <>
              <div className="animate-pulse inline-block">
                <Loader2 className="w-24 h-24 text-[#9B5DE5] mx-auto animate-spin" />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 dark:text-white">
                <span className="bg-gradient-to-r from-[#7C3AED] to-[#6ECCAF] bg-clip-text text-transparent">
                  <Typewriter
                    words={['Criando sua conta...', 'Preparando tudo...', 'Quase lá!']}
                    loop={true}
                    cursor
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Estamos configurando seu espaço seguro no PagAê
                <span className="ml-2">🚀</span>
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <CheckCircle2 className="w-24 h-24 text-[#6ECCAF] mx-auto" strokeWidth={1.5} />
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 dark:text-white">
                <span className="bg-gradient-to-r from-[#6ECCAF] to-[#7C3AED] bg-clip-text text-transparent">
                  Conta criada! 🎉
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Sua conta está pronta para uso!
                <br />
                Clique abaixo para começar a gerenciar suas dívidas
              </p>

              <motion.button
                onClick={() => navigate('/app')}
                className="group relative inline-block bg-gradient-to-r from-[#7C3AED] to-[#6ECCAF] text-white px-8 py-4 rounded-full text-lg font-semibold 
                  hover:shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 shadow-lg
                  flex items-center gap-3 mx-auto hover:gap-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-5 h-5 transition-all group-hover:rotate-180" />
                <span>Acessar Minha Conta</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-full transition-opacity" />
              </motion.button>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Problemas para acessar?{' '}
                <button
                  onClick={() => window.location.reload()}
                  className="text-[#7C3AED] dark:text-[#9B5DE5] hover:underline"
                >
                  Tentar novamente
                </button>
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <motion.div
                animate={{ x: [-10, 10, -10] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <AlertTriangle className="w-24 h-24 text-[#FF6B6B] mx-auto" strokeWidth={1.5} />
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 dark:text-white">
                <span className="bg-gradient-to-r from-[#FF6B6B] to-[#9B5DE5] bg-clip-text text-transparent">
                  Ops! Algo deu errado 💥
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {errorMessage || 'Não conseguimos validar seu link de convite'}
                <br />
                <span className="text-[#9B5DE5]">Verifique se o link está correto</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="group relative inline-block bg-gradient-to-r from-[#FF6B6B] to-[#9B5DE5] text-white px-8 py-4 rounded-full text-lg font-semibold 
                    hover:shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 shadow-lg
                    flex items-center gap-3 mx-auto hover:gap-4"
                >
                  <Rocket className="w-5 h-5 transition-all group-hover:rotate-45" />
                  <span>Voltar para o início</span>
                </Link>

                <button
                  onClick={() => window.location.reload()}
                  className="group relative inline-block bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-full text-lg font-semibold 
                    hover:shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 shadow-lg
                    flex items-center gap-3 mx-auto hover:gap-4"
                >
                  <Sparkles className="w-5 h-5 transition-all group-hover:text-[#9B5DE5]" />
                  <span>Tentar novamente</span>
                </button>
              </div>
            </>
          )}

          {/* Efeitos de Fundo */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#9B5DE5]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#6ECCAF]/10 rounded-full blur-3xl animate-pulse delay-100" />
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

export default CreateAccountViaToken;