import Logo from '@components/Logo';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile
} from 'firebase/auth';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, LockKeyhole, Mail, User } from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../../firebaseConfig';

const googleProvider = new GoogleAuthProvider();

const AuthPageMobile = () => {
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

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigate(from, { replace: true });
            } else {
                setCheckingAuth(false);
            }
        });
        return unsubscribe;
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
            }
            navigate(from, { replace: true });
        } catch (error) {
            handleAuthError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
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
        const errorCode = (error as { code?: string }).code || 'unknown-error';
        const errorMessage = getFriendlyError(errorCode);
        toast.error(errorMessage);
    };

    const getFriendlyError = (errorCode: string) => {
        const errorMap: Record<string, string> = {
            'auth/invalid-email': 'E-mail inválido',
            'auth/user-not-found': 'Usuário não encontrado',
            'auth/wrong-password': 'Senha incorreta',
            'auth/email-already-in-use': 'E-mail já cadastrado',
            'auth/weak-password': 'Senha deve ter pelo menos 6 caracteres',
            'auth/popup-closed-by-user': 'Login cancelado',
            'auth/network-request-failed': 'Erro de conexão',
            'auth/too-many-requests': 'Muitas tentativas. Tente mais tarde',
            'unknown-error': 'Erro desconhecido'
        };
        return errorMap[errorCode] || errorMap['unknown-error'];
    };

    if (checkingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <div className=" scale-150">
                <Logo />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl"
            >
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {isLogin ? 'Bem-vindo de volta' : 'Criar conta'}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        {isLogin ? 'Faça login para continuar' : 'Comece sua jornada conosco'}
                    </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-5">
                    {!isLogin && (
                        <div className="space-y-1">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Nome completo
                            </label>
                            <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-xl">
                                <User className="text-gray-500 shrink-0" size={20} />
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Seu nome"
                                    className="w-full bg-transparent placeholder:text-gray-500 text-gray-900 dark:text-white"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    autoComplete="name"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            E-mail
                        </label>
                        <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-xl">
                            <Mail className="text-gray-500 shrink-0" size={20} />
                            <input
                                id="email"
                                type="email"
                                placeholder="exemplo@email.com"
                                className="w-full bg-transparent placeholder:text-gray-500 text-gray-900 dark:text-white"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                autoComplete="email"
                                inputMode="email"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Senha
                        </label>
                        <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-xl">
                            <LockKeyhole className="text-gray-500 shrink-0" size={20} />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder={isLogin ? 'Sua senha' : 'Mínimo 6 caracteres'}
                                className="w-full bg-transparent placeholder:text-gray-500 text-gray-900 dark:text-white"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                autoComplete={isLogin ? 'current-password' : 'new-password'}
                                minLength={6}
                                required
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-500 active:text-gray-700"
                                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                                disabled={isLoading}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white rounded-xl font-medium
                                   flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={24} />
                        ) : isLogin ? (
                            'Entrar'
                        ) : (
                            'Cadastrar'
                        )}
                    </button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
                    <span className="px-4 text-gray-500 text-sm">ou</span>
                    <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full h-14 flex items-center justify-center gap-3 bg-white dark:bg-gray-700 active:bg-gray-50
                               rounded-xl border border-gray-200 dark:border-gray-600 active:scale-95 disabled:opacity-70"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                        Continuar com Google
                    </span>
                </button>

                <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
                    {isLogin ? 'Não tem uma conta?' : 'Já possui uma conta?'}{' '}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-purple-600 font-semibold active:text-purple-700 focus:outline-none"
                        disabled={isLoading}
                    >
                        {isLogin ? 'Cadastre-se' : 'Fazer login'}
                    </button>
                </p>
            </motion.div>
        </div>
    );
};

export default AuthPageMobile;