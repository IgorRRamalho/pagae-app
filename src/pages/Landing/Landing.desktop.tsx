import Footer from '@components/Footer';
import HeaderLanding from '@components/NavLanding';
import PagaeMemoryGame from '@components/LandingGame';
import { SocialProof } from '@components/SocialProof';
import { Sparkles, UserPlus } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import screencapture from '@assets/screencapture.png';

function LandingDesktop() {
    return (
        <div className="min-h-screen overflow-x-hidden transition-all duration-700 bg-gradient-to-br from-gray-50/50 via-white to-gray-100/50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <HeaderLanding />

            {/* Seção Hero */}
            <section className="flex flex-col items-center justify-center min-h-screen px-4 py-12 mx-auto text-center max-w-7xl sm:px-6 lg:px-8 md:py-20">
                <div className="w-full max-w-3xl animate-fade-in-up">
                    <div className="inline-flex items-center bg-red-100 dark:bg-red-900/80 px-4 py-1.5 md:px-6 md:py-2 rounded-full mb-4 md:mb-6">
                        <Sparkles className="w-4 h-4 mr-2 text-red-600 md:w-5 md:h-5 dark:text-red-300" />
                        <span className="text-sm font-medium text-red-700 md:text-base dark:text-red-300">🚨 Beta aberto</span>
                    </div>

                    <h1 className="px-2 mb-4 text-3xl font-extrabold tracking-tight md:text-5xl lg:text-6xl md:mb-6 dark:text-white">
                        <span className="bg-gradient-to-r from-[#DC2626] to-[#7C3AED] bg-clip-text text-transparent">
                            Chega de ser banco de amigos! 💪
                        </span>
                        <br />
                        <span className="inline-block mt-4 text-2xl text-gray-800 md:text-4xl dark:text-gray-100">
                            O PagAê controla quem te deve e{' '}
                            <span className="underline decoration-wavy decoration-teal-500 dark:decoration-teal-300">
                                cobra por você
                            </span>.
                        </span>
                    </h1>

                    <p className="max-w-3xl px-4 mx-auto mb-6 text-base leading-relaxed text-gray-800 md:text-xl dark:text-gray-300">
                        O jeito{' '}
                        <span className="font-semibold text-[#7C3AED] dark:text-[#9B5DE5]">
                            descomplicado
                        </span>{' '}
                        de gerenciar
                        <div className="px-2 py-1 mx-1 mt-2 rounded-lg bg-red-100/50 dark:bg-red-900/20 md:mt-0 md:inline-block">
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
                        <span className="block mt-2 md:inline md:mt-0">
                            sem perder a{' '}
                            <span className="border-b-2 border-teal-500 dark:border-teal-300">
                                ✌️ paz
                            </span>
                        </span>
                    </p>
                </div>

                <div className="delay-100 animate-fade-in-up">
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

                    <div className="flex flex-col justify-center gap-3 px-4 mt-8 md:flex-row md:gap-4 dark:text-white">
                        {['🤙 100% Grátis', '🎉 Cadastro fácil', '📱 No celular'].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-full bg-white/90 dark:bg-gray-800/90 dark:border-gray-700 md:text-base"
                            >
                                <span className="text-xl">{item.split(' ')[0]}</span>
                                <span>{item.split(' ').slice(1).join(' ')}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <div className="relative bg-gradient-to-br from-purple-50/80 to-blue-50/80 dark:from-gray-900 dark:to-purple-900/10 overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.6)]">
                {/* Elementos decorativos compartilhados (APENAS ESTES) */}
                <div className="absolute rounded-full -top-40 -left-40 w-96 h-96 bg-purple-400/20 blur-3xl animate-float -z-10" />
                <div className="absolute delay-1000 rounded-full -bottom-60 -right-40 w-80 h-80 bg-blue-400/20 blur-3xl animate-float -z-10" />
                <div className="absolute -top-1/4 left-1/2 w-[800px] h-[800px] bg-purple-400/10 rounded-full blur-3xl animate-float -z-10" />
                <div className="absolute -bottom-1/3 right-1/4 w-[700px] h-[700px] bg-red-400/10 rounded-full blur-3xl animate-float delay-1000 -z-10" />

                {/* Seção Demonstração */}
                <section id="demo" className="relative py-24 scroll-mt-32">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {/* Título com animação */}
                        <div className="mb-16 text-center">
                            <h2 className="relative mb-4 text-5xl font-bold dark:text-white">
                                <span className="bg-gradient-to-r from-[#7C3AED] to-[#DC2626] bg-clip-text text-transparent px-1">
                                    Na Prática
                                </span>
                                <div className="flex items-center justify-center gap-3 mt-4 text-2xl text-gray-600 dark:text-gray-300">
                                    <span className="animate-pulse">✨</span>
                                    <span>Veja a mágica acontecer</span>
                                    <span className="animate-bounce">👇</span>
                                </div>
                            </h2>
                        </div>

                        {/* Container principal com efeito 3D */}
                        <div className="relative transition-all duration-700 transform group perspective-3000 hover:perspective-2000">
                            {/* Efeito de grid dinâmico */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 dark:opacity-20" />

                            {/* Mockup com interações */}
                            <div className="max-w-full mx-auto transform transition-transform duration-500 group-hover:scale-[1.02]">
                                <div className="relative bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl hover:shadow-3xl 
                transition-all duration-500 border-4 border-gray-800/20 dark:border-gray-900 overflow-hidden
                hover:border-purple-500/30">

                                    {/* Cabeçalho estilizado */}
                                    <div className="flex items-center px-6 py-3 border-b border-gray-100 bg-gray-50/50 dark:bg-gray-700/30 dark:border-gray-600">
                                        <div className="flex space-x-2">
                                            {['#FF5F56', '#FFBD2E', '#27C93F'].map((color, i) => (
                                                <div key={i} className="w-3 h-3 transition-transform rounded-full shadow-sm hover:scale-125" style={{ backgroundColor: color }} />
                                            ))}
                                        </div>
                                        <div className="flex-1 mx-4 text-sm font-medium text-center text-gray-500 truncate dark:text-gray-400">
                                            pagae.app/demo
                                        </div>
                                    </div>

                                    {/* Container da imagem com gradiente overlay */}
                                    <div className="relative aspect-[16/9] bg-gray-100/50 dark:bg-gray-600/20 overflow-hidden">
                                        <img
                                            src={screencapture}
                                            alt="Demonstração da interface do aplicativo"
                                            className="w-full h-full object-center scale-100 group-hover:scale-[1.03] transition-transform duration-700"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/40 to-transparent dark:from-gray-900/40" />
                                    </div>
                                </div>
                            </div>

                            {/* Elementos decorativos animados */}
                            <div className="absolute rounded-full -top-40 -left-40 w-96 h-96 bg-purple-400/20 blur-3xl animate-float -z-10" />
                            <div className="absolute delay-1000 rounded-full -bottom-60 -right-40 w-80 h-80 bg-blue-400/20 blur-3xl animate-float -z-10" />
                        </div>

                        {/* Rodapé interativo */}
                        <div className="max-w-2xl mx-auto mt-16 text-center">
                            <p className="mb-8 text-xl font-medium text-gray-600 dark:text-gray-300">
                                Interface <span className="font-bold text-transparent bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text">fácil de usar</span>, sem manual de instruções necessário.
                            </p>

                            <button className="relative px-10 py-4 overflow-hidden text-lg font-semibold text-white transition-all duration-300 shadow-2xl bg-gradient-to-r from-purple-600 to-red-600 rounded-2xl hover:shadow-3xl hover:-translate-y-1 hover:scale-105 group/button">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <span className="animate-pulse">🚀</span>
                                    Experimentar Agora - É Grátis!
                                </span>
                                <div className="absolute inset-0 opacity-0 group-hover/button:opacity-30 bg-[length:200%_200%] 
                bg-[position:0%_0%] hover:bg-[position:100%_100%] transition-all duration-700 
                bg-gradient-to-r from-white/10 via-white/20 to-white/10" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Seção Funcionalidades */}
                <section id="recursos" className="relative py-24 backdrop-blur-md scroll-mt-32">
                    <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {/* Titulo aprimorado */}
                        <div className="mb-20 text-center">
                            <h2 className="relative inline-block mb-4 text-5xl font-bold dark:text-white">
                                <span className="bg-gradient-to-r from-[#DC2626] to-[#7C3AED] bg-clip-text text-transparent px-1">
                                    Tudo Que Você Precisa (E Mais Um Pouco)
                                </span>
                                <div className="absolute -bottom-4 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 via-purple-500 to-purple-600 rounded-full animate-pulse-scale opacity-90" />
                            </h2>
                            <p className="max-w-2xl mx-auto mt-8 text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                                Tudo o que você precisa, e nada do que você não precisa. Simples assim!
                            </p>
                        </div>

                        {/* Cards em grid dinâmico com interações melhoradas */}
                        <div className="grid gap-8 md:grid-cols-3 group/cards">
                            {[
                                {
                                    icon: '🔍',
                                    title: 'Controle Total',
                                    text: 'Visualize todas as dívidas em tempo real com dashboard detalhado',
                                    color: 'from-red-500/20 to-purple-600/20'
                                },
                                {
                                    icon: '👥',
                                    title: 'Gestão de Grupos',
                                    text: 'Organize por amigos, eventos ou qualquer contexto necessário',
                                    color: 'from-teal-500/20 to-indigo-600/20'
                                },
                                {
                                    icon: '🎯',
                                    title: 'Simplicidade',
                                    text: 'Interface minimalista que você domina em 1 minuto',
                                    color: 'from-purple-500/20 to-pink-600/20'
                                }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="relative group bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-2xl hover:shadow-3xl 
                    transition-all duration-300 hover:-translate-y-3 hover:rotate-1 hover:z-10
                    border border-gray-100/50 dark:border-gray-700/30 hover:border-purple-200/50"
                                >
                                    {/* Efeito de gradiente sutil */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-30 
                    transition-opacity duration-300 rounded-[2rem]`} />

                                    <div className="relative z-10">
                                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#DC2626] to-[#7C3AED] flex items-center 
                        justify-center text-4xl mb-8 shadow-lg transition-transform group-hover:scale-110">
                                            {item.icon}
                                        </div>

                                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#DC2626] to-[#7C3AED] bg-clip-text 
                        text-transparent">
                                            {item.title}
                                        </h3>

                                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed font-[450]">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>
                </section>
                {/* Elementos decorativos de fundo */}
                <div className="absolute -top-1/4 -left-40 w-[800px] h-[800px] bg-purple-400/10 rounded-full blur-3xl 
        animate-float" />
                <div className="absolute -bottom-1/3 -right-40 w-[700px] h-[700px] bg-red-400/10 rounded-full blur-3xl 
        animate-float delay-1000" />
            </div>

            <section id="depoimentos" className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-50/50 to-teal-50/50 dark:from-gray-900 dark:to-blue-900/10 scroll-mt-32">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-20 text-center">
                        <h2 className="relative mb-4 text-5xl font-bold dark:text-white">
                            <span className="text-transparent bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text">
                                Vozes da Comunidade
                            </span>
                            <div className="flex items-center justify-center gap-2 mt-4 text-2xl text-gray-600 dark:text-gray-300">
                                <span>Quem usa recomenda de olhos fechados</span>
                                <span className="animate-pulse">👌</span>
                            </div>
                        </h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3 group/depo">
                        {[
                            {
                                text: 'O app salvou nossa amizade! Nunca mais briguei por dinheiro',
                                author: 'Julinho da Van',
                                role: 'Motorista Profissional',
                                emoji: '🚐'
                            },
                            {
                                text: 'Uso até pra dividir as comprinhas do mês! Simplesmente mágico',
                                author: 'Maria do Bairro',
                                role: 'Especialista em Economia',
                                emoji: '🛒'
                            },
                            {
                                text: 'Finalmente uma app que entende como funciona a vida real',
                                author: 'Zé do Churrasco',
                                role: 'Mestre do Churras',
                                emoji: '🍖'
                            }
                        ].map((depo, i) => (
                            <div
                                key={i}
                                className="relative bg-white/90 dark:bg-gray-800/90 p-8 rounded-[2rem] shadow-2xl 
                    hover:shadow-3xl transition-all duration-300 hover:-translate-y-3
                    border-2 border-transparent hover:border-blue-200/50 dark:hover:border-teal-400/30
                    hover:rotate-1 hover:z-10"
                            >
                                {/* Efeito de gradiente flutuante */}
                                <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover/depo:opacity-10 
                    bg-gradient-to-br from-teal-400/30 to-blue-500/30 transition-opacity duration-500" />

                                <div className="absolute flex items-center justify-center w-16 h-16 text-3xl shadow-xl -top-6 right-6 rounded-2xl bg-gradient-to-br from-teal-400 to-blue-500">
                                    {depo.emoji}
                                </div>

                                <p className="mb-8 text-xl italic font-medium leading-relaxed text-transparent dark:text-gray-200 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-100 dark:to-gray-300 bg-clip-text">
                                    "{depo.text}"
                                </p>

                                <div className="pt-6 border-t border-blue-100 dark:border-blue-900/50">
                                    <div className="text-lg font-bold text-transparent bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text">
                                        {depo.author}
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="text-lg">{depo.emoji}</span>
                                        {depo.role}
                                    </div>
                                </div>

                                {/* Efeito de brilho dinâmico */}
                                <div className="absolute inset-0 rounded-[2rem] pointer-events-none 
                    opacity-0 hover:opacity-20 bg-white/5 transition-opacity" />
                            </div>
                        ))}
                    </div>


                    {/* Elementos decorativos temáticos */}
                    <div className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-teal-400/10 rounded-full 
        blur-3xl animate-float" />
                    <div className="absolute -bottom-60 -right-40 w-[700px] h-[700px] bg-blue-400/10 rounded-full 
        blur-3xl animate-float delay-1000" />
                </div>
            </section>

            {/* Jogo */}

            <div className="relative w-full pt-16 pb-0 transition-all duration-500 shadow-2xl bg-gradient-to-br from-purple-50/60 to-blue-50/60 dark:from-gray-800/50 dark:to-purple-900/10 backdrop-blur-sm hover:shadow-3xl group/game">
                {/* Elementos decorativos */}
                <div className="absolute rounded-full -top-20 -left-20 w-96 h-96 bg-purple-400/10 blur-3xl animate-float -z-10" />
                <div className="absolute delay-1000 rounded-full -bottom-28 -right-20 w-80 h-80 bg-blue-400/10 blur-3xl animate-float -z-10" />
                {/* Container do conteúdo */}
                <div className="max-w-3xl p-4 mx-auto sm:px-6 lg:px-8">
                    {/* Título estilizado */}
                    <div className="mb-12 text-center">
                        <h3 className="mb-4 text-3xl font-bold dark:text-white">
                            <span className="bg-gradient-to-r from-[#7C3AED] to-[#DC2626] bg-clip-text text-transparent">
                                🧠 Treine sua memória enquanto se diverte
                            </span>
                        </h3>
                    </div>

                    {/* Container do jogo com borda interativa */}
                    <div className="relative p-6 transition-all duration-300 border-2 shadow-xl bg-white/90 dark:bg-gray-800/90 rounded-3xl border-purple-100/50 dark:border-gray-700/50 group-hover/game:border-purple-200/80">
                        <PagaeMemoryGame />
                    </div>

                    {/* Rodapé decorativo */}
                    <div className="mt-8 text-center">
                        <p className="text-sm italic text-gray-600 dark:text-gray-400">
                            Dica: Lembre dos pares! Ajudei? 🚀
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LandingDesktop;