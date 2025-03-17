import { Bell, Send, Sparkles, UserPlus } from "lucide-react";
import { Tooltip } from "react-tooltip";

export function Footer() {
    return (
        <footer className="relative mt-12 border-t border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50/50 via-white to-gray-100/50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Background Gradients */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#9B5DE5]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF6B6B]/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Sobre Nós */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold flex items-center gap-2 dark:text-white">
                            <Sparkles className="w-5 h-5 text-[#9B5DE5]" />
                            Feito com ❤️ por
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Dois amigos acabando com as brigas de divisão de contas entre amigos! 🔥
                           
                        </p>

                    </div>

                    {/* Links Úteis */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold flex items-center gap-2 dark:text-white">
                            <UserPlus className="w-5 h-5 text-[#FF6B6B]" />
                            Juntos nessa
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { label: 'Como surgiu', emoji: '💡' },
                                { label: 'Open Source', emoji: '👨💻' },
                                { label: 'Ajuda', emoji: '🆘' },
                            ].map((item, i) => (
                                <li key={i}>
                                    <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-[#FF6B6B] dark:text-gray-300 dark:hover:text-[#9B5DE5] transition-colors">
                                        <span>{item.emoji}</span>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold flex items-center gap-2 dark:text-white">
                            <Bell className="w-5 h-5 text-[#9B5DE5]" />
                            Vem construir com a gente!
                        </h3>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Seu email mais esperto"
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gradient-to-r from-[#FF6B6B] to-[#9B5DE5] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                <span>Vem!</span>
                            </button>
                        </form>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Queremos sua opinião! (e prometemos não encher sua caixa de entrada) ✌️
                        </p>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
                    {/* Social Links */}
                    <div className="flex space-x-6 mb-4 md:mb-0">
                        {[
                            { icon: '🐦', label: 'Twitter', url: '#' },
                            { icon: '📸', label: 'Instagram', url: '#' },
                            { icon: '👨💻', label: 'GitHub', url: '#' },
                            { icon: '💌', label: 'Contato', url: 'mailto:oi@pagae.app' },
                        ].map((social, i) => (
                            <div key={i}>
                                <a
                                    href={social.url}
                                    className="text-2xl hover:text-[#FF6B6B] dark:hover:text-[#9B5DE5] transition-colors relative group"
                                    data-tooltip-id={`social-tooltip-${i}`}
                                >
                                    {social.icon}
                                    <Tooltip id={`social-tooltip-${i}`} content={social.label} />
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="text-center md:text-right space-y-1">
                        <p className="text-gray-600 dark:text-gray-400">
                            © {new Date().getFullYear()} PagAê • Ideia pequena, sonho grande! 🚀
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                            Feito na madrugada com ☕ e 🍕 • De amigos para amigos! 💚
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}