
import { SocialProof } from "@components/SocialProof";
import { Sparkles, UserPlus } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import screencapture from '@assets/screencapture.png';
import Footer from "@components/Footer";
import NavLanding from "@components/NavLanding";

function LandingMobile() {
    return (
        <div className="min-h-screen pb-14 bg-gradient-to-br from-gray-50/50 via-white to-gray-100/50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

            {/* Seção Hero Atualizada */}
            <section className="px-4 py-8 space-y-6 text-center">
                <div className="animate-fade-in-up">
                    <div className="inline-flex items-center bg-red-100 dark:bg-red-900/80 px-4 py-1.5 rounded-full mb-4 mx-auto justify-center">
                        <Sparkles className="w-4 h-4 mr-2 text-red-600 dark:text-red-300" />
                        <span className="text-sm text-red-700 dark:text-red-300 font-medium">🚨 Beta aberto</span>
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight mb-4 dark:text-white text-center">
                        <span className="bg-gradient-to-r from-[#DC2626] to-[#7C3AED] bg-clip-text text-transparent">
                            Chega de ser banco de amigos! 💪
                        </span>
                        <div className="mt-4 text-xl text-gray-800 dark:text-gray-100">
                            O PagAê controla quem te deve
                        </div>
                    </h1>

                    <div className="text-base text-gray-800 dark:text-gray-300 max-w-md mx-auto">
                        <p className="text-center">
                            O jeito{' '}
                            <span className="font-semibold text-[#7C3AED] dark:text-[#9B5DE5]">
                                descomplicado
                            </span>{' '}
                            de gerenciar
                            <div className="px-2 py-1 mx-1 bg-red-100/50 dark:bg-red-900/20 rounded-lg mt-2 inline-block">
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
                        </p>
                    </div>
                </div>

                <div className="animate-fade-in-up delay-100">
                    <button
                        className="group relative bg-gradient-to-r from-[#DC2626] to-[#7C3AED] text-white 
    px-6 py-3 rounded-full text-sm font-semibold 
    hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto
    active:scale-95 hover:ring-4 hover:ring-purple-500/30"
                    >
                        <UserPlus className="w-5 h-5" />
                        <span>💸 Resolve a treta agora - Grátis!</span>
                    </button>

                    <SocialProof />

                    <div className="flex flex-nowrap justify-center md:justify-start gap-2 md:gap-4 mt-8 px-4 dark:text-white">
                        {['🤙 100% Grátis', '🎉 Cadastro fácil', '📱 No celular'].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-center gap-2 px-3 py-2 bg-white/90 dark:bg-gray-800/90 
  border border-gray-200 dark:border-gray-700 rounded-full text-sm md:text-base w-full basis-1/3"
                            >
                                <span className="text-lg">{item.split(' ')[0]}</span>
                                <span className="text-xs md:text-sm truncate">{item.split(' ').slice(1).join(' ')}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seção Print do site*/}
            <section className="relative py-12 bg-gradient-to-br from-purple-50/70 to-blue-50/70 dark:from-gray-900 dark:to-purple-900/10 overflow-hidden">
                <div className="px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 dark:text-white relative">
                            <span className="bg-gradient-to-r from-[#7C3AED] to-[#DC2626] bg-clip-text text-transparent">
                                Na Prática
                            </span>
                            <div className="h-1 bg-gradient-to-r from-purple-500 via-red-500 to-red-600 rounded-full mt-2 w-1/3 mx-auto animate-pulse-scale opacity-90" />
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-md mx-auto text-sm">
                            Veja na pele como é simples resolver suas tretas financeiras
                        </p>
                    </div>

                    <div className="relative group perspective-1000 hover:perspective-2000 transition-all duration-500 max-w-3xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-4 border-gray-800 dark:border-gray-900 overflow-hidden 
            transform group-hover:rotate-x-[3deg] group-hover:rotate-y-[2deg] transition-transform duration-300">
                            <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                                <div className="flex space-x-1.5">
                                    {['#FF5F56', '#FFBD2E', '#27C93F'].map((color, i) => (
                                        <div key={i} className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: color }} />
                                    ))}
                                </div>

                            </div>

                            <div className="aspect-video bg-gradient-to-br from-purple-50/30 to-blue-50/30 dark:from-gray-700/30 dark:to-purple-900/20 relative overflow-hidden">
                                <img
                                    src={screencapture}
                                    alt="App Demo"
                                    className="w-full h-full object-center scale-[1.01] transform transition-transform group-hover:scale-105 duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/30 dark:from-gray-900/30 to-transparent pointer-events-none" />
                            </div>
                        </div>

                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 bg-gradient-to-r from-purple-500/20 to-red-500/20 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    <div className="mt-10 text-center max-w-md mx-auto">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 font-medium">
                            <span className="bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent font-semibold">
                                Toque para explorar
                            </span>{' '}
                            a experiência fluida do PagAê
                        </p>
                        <button className="relative bg-gradient-to-r from-purple-600 to-red-600 text-white px-8 py-3 rounded-xl font-semibold text-sm 
            hover:shadow-2xl hover:scale-105 active:scale-95 transition-all 
            hover:ring-4 hover:ring-purple-500/30">
                            <span className="relative z-10">🚀 Experimentar Agora - É Grátis!</span>
                            <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-20 bg-white/20 transition-opacity" />
                        </button>
                    </div>

                    {/* Elementos decorativos */}
                    <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-400/10 rounded-full blur-2xl animate-float" />
                    <div className="absolute -bottom-40 -right-20 w-64 h-64 bg-red-400/10 rounded-full blur-2xl animate-float delay-1000" />
                </div>
            </section>

            {/* Seção Vantagens */}
            <section className="relative py-12 bg-gradient-to-br from-gray-50/50 to-purple-50/70 dark:from-gray-900 dark:to-purple-900/10 overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.6)]">
                <div className="px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 dark:text-white relative">
                            <span className="bg-gradient-to-r from-[#DC2626] to-[#7C3AED] bg-clip-text text-transparent">
                                Vantagens que Fazem Diferença
                            </span>
                            <div className="h-1 bg-gradient-to-r from-red-500 via-purple-500 to-purple-600 rounded-full mt-2 w-3/4 mx-auto animate-pulse-scale opacity-90" />
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-md mx-auto text-sm">
                            Funcionalidades pensadas para resolver de verdade - sem complicar sua vida
                        </p>
                    </div>

                    <div className="grid gap-5 max-w-2xl mx-auto">
                        {[
                            {
                                icon: '🔍',
                                title: 'Controle Total',
                                text: 'Sabe quem deve e quanto, sem drama. Tudo no seu painel, rapidinho.',
                                color: 'from-red-500 to-purple-600'
                            },
                            {
                                icon: '👥',
                                title: 'Grupos de Amigos',
                                text: 'Crie grupos ilimitados e acabe com a bagunça de "quem paga o quê?".',
                                color: 'from-teal-500 to-indigo-600'
                            },
                            {
                                icon: '🎯',
                                title: 'Interface Simples e Direta',
                                text: 'A interface é tão fácil que até quem não entende de tecnologia vai se sentir um expert em 1 minuto. 😎',
                                color: 'from-purple-500 to-pink-600'
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="relative bg-white dark:bg-gray-800 p-6 rounded-3xl 
                    shadow-xl hover:shadow-2xl transition-all duration-300 
                    border border-gray-100 dark:border-gray-700/70
                    hover:border-purple-200/50 active:scale-[0.98]
                    motion-safe:animate-fade-in-up group"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div className="relative z-10">
                                    <div className="mb-5 flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#DC2626] to-[#7C3AED] flex items-center justify-center text-2xl shadow-lg transition-transform group-hover:scale-110">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-xl font-bold dark:text-white pr-4 bg-gradient-to-r from-[#DC2626] to-[#7C3AED] bg-clip-text text-transparent">
                                            {item.title}
                                        </h3>
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed 
                        font-[450] tracking-wide text-ce
                        bg-gradient-to-r from-gray-700/80 to-gray-900/90 dark:from-gray-200/80 dark:to-gray-100/90 
                        bg-clip-text text-transparent">
                                        {item.text}
                                    </p>

                                    <div className="mt-4">
                                        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-600 to-transparent 
                            group-hover:via-[#7C3AED] transition-all duration-500" />
                                    </div>
                                </div>

                                {/* Gradiente dinâmico no hover */}
                                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 
                    bg-gradient-to-br from-[#DC2626] to-[#7C3AED] pointer-events-none 
                    transition-opacity duration-300" />
                            </div>
                        ))}
                    </div>

                    {/* Elementos decorativos ajustados */}
                    <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-400/5 rounded-full animate-float" />
                    <div className="absolute -bottom-40 -right-20 w-64 h-64 bg-red-400/5 rounded-full animate-float delay-1000" />
                </div>
            </section>

            {/* Seção Depoimentos*/}
            <section className="relative py-12 bg-gradient-to-br from-blue-50/50 to-teal-50/50 dark:from-gray-900 dark:to-blue-900/10 overflow-hidden">
                <div className="px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 dark:text-white relative">
                            <span className="bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
                                Quem Usa Aprova
                            </span>
                            <div className="h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-blue-600 rounded-full mt-2 w-1/3 mx-auto animate-pulse-scale opacity-90" />
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-md mx-auto text-sm">
                            A voz da experiência - quem já resolveu suas tretas financeiras
                        </p>
                    </div>

                    <div className="grid gap-5 max-w-2xl mx-auto">
                        {[
                            {
                                text: 'Nunca mais briguei por dinheiro depois do PagAê!',
                                author: 'Julinho da Van',
                                role: 'Motorista Profissional',
                                emoji: '🚐'
                            },
                            {
                                text: 'Uso até pra dividir as compras do mês!',
                                author: 'Maria do Bairro',
                                role: 'Especialista em Economia',
                                emoji: '🛒'
                            },
                            {
                                text: 'O app que realmente entende a vida real',
                                author: 'Zé do Churrasco',
                                role: 'Mestre do Churras',
                                emoji: '🍖'
                            }
                        ].map((depo, i) => (
                            <div
                                key={i}
                                className="relative bg-white/90 dark:bg-gray-800/90 p-6 rounded-3xl 
                    shadow-lg hover:shadow-xl transition-all duration-300
                    border border-blue-100/30 dark:border-blue-900/30
                    group hover:border-teal-200/50"
                            >
                                <div className="absolute -top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-2xl shadow-md">
                                    {depo.emoji}
                                </div>

                                <p className="text-lg italic mb-6 dark:text-gray-200 relative z-10
                    bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-100 dark:to-gray-300 
                    bg-clip-text text-transparent font-medium">
                                    "{depo.text}"
                                </p>

                                <div className="border-t border-blue-100 dark:border-blue-900/50 pt-4">
                                    <div className="font-bold text-sm bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
                                        {depo.author}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {depo.role}
                                    </div>
                                </div>

                                {/* Efeito de fundo hover */}
                                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 bg-gradient-to-br from-teal-400/20 to-blue-500/20 transition-opacity" />
                            </div>
                        ))}
                    </div>

                    {/* Elementos decorativos temáticos */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl animate-float" />
                    <div className="absolute -bottom-40 -left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-2xl animate-float delay-1000" />
                </div>
            </section>
            <NavLanding />
            <Footer/>            
        </div>
    );
}

export default LandingMobile;