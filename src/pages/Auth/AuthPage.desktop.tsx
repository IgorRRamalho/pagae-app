import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile
} from 'firebase/auth';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, LockKeyhole, Mail, Sparkles, User } from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '@components/Logo';
import { auth } from '../../../firebaseConfig';


const googleProvider = new GoogleAuthProvider();

const AuthPageDesktop = () => {
    const [isLogin, setIsLogin] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [checkingAuth, setCheckingAuth] = React.useState(true);
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    });
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/app';

    // IDs únicos para acessibilidade
    const nameId = 'name-input';
    const emailId = 'email-input';
    const passwordId = 'password-input';

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigate(from, { replace: true });
            } else {
                setCheckingAuth(false);
            }
        });

        return () => unsubscribe();
    }, [navigate, from]);

    React.useEffect(() => {
        const initialIsLogin = location.state?.isLogin ?? true;
        setIsLogin(initialIsLogin);
    }, [location.state]);



    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, formData.email, formData.password);
                toast.success('Login realizado com sucesso!');
                navigate(from, { replace: true });
            } else {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                );
                await updateProfile(userCredential.user, {
                    displayName: formData.name
                });

                toast.success(`Bem-vindo, ${formData.name}!`);
                navigate(from, { replace: true });
            }
        } catch (error) {
            handleAuthError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            await signInWithPopup(auth, googleProvider);
            toast.success('Login com Google realizado!');
            navigate(from, { replace: true });
        } catch (error) {
            handleAuthError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAuthError = (error: unknown) => {
        const message = error instanceof Error ? error.message : 'Erro desconhecido';
        const friendlyError = getFriendlyError(message);
        toast.error(friendlyError);
    };

    const getFriendlyError = (error: string) => {
        const errorMap: Record<string, string> = {
            'auth/invalid-email': 'E-mail inválido',
            'auth/user-not-found': 'Usuário não encontrado',
            'auth/wrong-password': 'Senha incorreta',
            'auth/email-already-in-use': 'E-mail já cadastrado',
            'auth/weak-password': 'Senha fraca (mínimo 6 caracteres)',
            'auth/popup-closed-by-user': 'Login cancelado pelo usuário'
        };

        return errorMap[error.replace('Firebase: ', '').replace(/ \(auth\/.*?\)\.?/, '')] ||
            'Erro na autenticação';
    };

    if (checkingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <Logo />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
                role="main"
                aria-labelledby="form-title"
            >
                <div className="flex items-center gap-3 mb-8">
                    <Sparkles className="text-purple-600 h-8 w-8" aria-hidden="true" />
                    <h1 id="form-title" className="text-2xl font-bold dark:text-white">
                        {isLogin ? 'Acesse sua conta' : 'Crie sua conta'}
                    </h1>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                    {!isLogin && (
                        <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                            <User className="text-gray-600 dark:text-gray-400 h-5 w-5" aria-hidden="true" />
                            <div className="flex-1">
                                <label htmlFor={nameId} className="sr-only">
                                    Nome completo
                                </label>
                                <input
                                    id={nameId}
                                    placeholder="Nome completo"
                                    className="w-full bg-transparent outline-none"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    aria-required="true"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                        <Mail className="text-gray-600 dark:text-gray-400 h-5 w-5" aria-hidden="true" />
                        <div className="flex-1">
                            <label htmlFor={emailId} className="sr-only">
                                E-mail
                            </label>
                            <input
                                id={emailId}
                                type="email"
                                placeholder="Seu melhor e-mail"
                                className="w-full bg-transparent outline-none"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                aria-required="true"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                        <LockKeyhole className="text-gray-600 dark:text-gray-400 h-5 w-5" aria-hidden="true" />
                        <div className="flex-1">
                            <label htmlFor={passwordId} className="sr-only">
                                Senha
                            </label>
                            <input
                                id={passwordId}
                                type={showPassword ? 'text' : 'password'}
                                placeholder={isLogin ? 'Sua senha' : 'Crie uma senha segura'}
                                className="w-full bg-transparent outline-none"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                minLength={6}
                                required
                                aria-required="true"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                        >
                            {showPassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-all
                                   focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        aria-live="polite"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-5 w-5 mx-auto animate-spin" aria-hidden="true" />
                                <span className="sr-only">Processando...</span>
                            </>
                        ) : isLogin ? (
                            'Entrar'
                        ) : (
                            'Cadastrar'
                        )}
                    </button>
                </form>

                <div className="my-6 flex items-center" aria-hidden="true">
                    <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
                    <span className="px-4 text-gray-600 dark:text-gray-400 text-sm">Ou continue com</span>
                    <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 p-3 rounded-lg border border-gray-200 dark:border-gray-600 transition-all
                               focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    disabled={isLoading}
                    aria-label="Entrar com Google"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span className="font-medium text-gray-700 dark:text-gray-200">Google</span>
                </button>

                <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
                    {isLogin ? 'Novo por aqui?' : 'Já tem uma conta?'}{' '}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-purple-600 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
                        aria-label={isLogin ? 'Criar nova conta' : 'Ir para login'}
                    >
                        {isLogin ? 'Criar conta' : 'Fazer login'}
                    </button>
                </p>
            </motion.div>
        </div>
    );
};

export default AuthPageDesktop;