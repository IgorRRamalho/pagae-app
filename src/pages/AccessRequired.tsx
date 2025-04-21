import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Pizza, Beer, WalletCards, Home } from 'lucide-react';
import { auth } from '../../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Logo from '@components/Logo';

const AccessRequired = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const from = location.state?.from?.pathname || '/app';
    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) navigate(from, { replace: true });
        });
        return () => unsubscribe();
    }, [navigate, from]);

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            await signInWithPopup(auth, googleProvider);
            toast.success('Beleza, acesso liberado! 🎉');
            navigate(from, { replace: true });
        } catch (error) {
            toast.error('Opa, deu ruim no login... 😅 Tenta de novo?');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <Logo />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl relative overflow-hidden"
            >
                {/* Efeitos de Gradiente */}
                <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#9B5DE5]/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#FF6B6B]/10 rounded-full blur-3xl" />

                <div className="flex gap-8">
                    {/* Seção Esquerda - Motivos */}
                    <div className="flex-1 space-y-6 pr-8 border-r border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-3 text-[#FF6B6B]">
                            <WalletCards className="h-8 w-8" />
                            <h1 className="text-3xl font-bold">Cadê meu dinheiro? 💸</h1>
                        </div>

                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Pra gente guardar quem te deve:
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-[#6ECCAF]">
                                <Pizza className="h-6 w-6" />
                                <span className="font-medium">Conta da pizza 🍕</span>
                            </div>
                            <div className="flex items-center gap-3 text-[#9B5DE5]">
                                <Beer className="h-6 w-6" />
                                <span className="font-medium">Rodada do bar 🍻</span>
                            </div>
                            <div className="flex items-center gap-3 text-[#FF6B6B]">
                                <Sparkles className="h-6 w-6" />
                                <span className="font-medium">E todas as outras dívidas!</span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                            Só precisamos saber quem você é pra salvar suas tretas!<br />
                            (Não se preocupa, não cobramos nada 😉)
                        </p>
                    </div>

                    {/* Seção Direita - Login */}
                    <div className="flex-1 space-y-6 pl-8">
                        <div className="flex items-center gap-3">
                            <Sparkles className="text-[#9B5DE5] h-8 w-8" />
                            <h2 className="text-2xl font-bold dark:text-white">
                                Bora resolver! 🚀
                            </h2>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 p-3 rounded-lg border border-gray-200 dark:border-gray-600 transition-all relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>

                            <span className="font-medium text-gray-700 dark:text-gray-200">
                                {isLoading ? 'Aguenta aí... 🕒' : 'Entrar com Google'}
                            </span>
                        </motion.button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">ou</span>
                            </div>
                        </div>

                        <motion.div className="space-y-4">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link
                                    to="/auth"
                                    state={{ ...location.state?.from, isLogin: true }} // Indica que é login
                                    className="block w-full text-center bg-gradient-to-r from-[#6ECCAF] to-[#9B5DE5] hover:from-[#4da58b] hover:to-[#7d47b8] text-white py-3 rounded-lg font-medium transition-all"
                                >
                                    Entrar com E-mail 📩
                                </Link>
                            </motion.div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">ou</span>
                                </div>
                            </div>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link
                                    to="/auth"
                                    state={{ ...location.state?.from, isLogin: false }} // Indica que é cadastro
                                    className="block w-full text-center border-2 border-[#9B5DE5] text-[#9B5DE5] hover:bg-[#9B5DE5]/10 py-3 rounded-lg font-medium transition-all"
                                >
                                    Criar conta nova ✨
                                </Link>
                            </motion.div>
                        </motion.div>

                        <p className="text-center text-gray-500 dark:text-gray-300 mt-4 text-sm">
                            Clica aí e já era! Não levamos mais de 1 minuto ⏱️
                        </p>
                    </div>
                </div>

                {/* Mensagem Final Descontraída */}
                <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                    <p>Prometemos não:</p>
                    <div className="flex justify-center gap-4 mt-2">
                        <span>📬 Enviar spam</span>
                        <span>💸 Cobrar nada</span>
                        <span>👻 Assustar seus amigos</span>
                    </div>
                </div>

                {/* Botão para voltar à Landing Page */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 flex justify-center"
                >
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-[#9B5DE5] hover:text-[#7d47b8] transition-colors font-medium"
                    >
                        <Home className="h-5 w-5" />
                        <span>Ah, quero voltar pra página inicial!</span>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AccessRequired;