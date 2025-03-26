import { Sparkles, UserPlus, Bell } from "lucide-react";

export function MobileFooter() {
    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg">
            <div className="px-4 py-8">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="font-bold flex items-center gap-2 dark:text-white">
                            <Sparkles className="w-5 h-5 text-[#9B5DE5]" />
                            Feito com ❤️
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Dois amigos acabando com brigas de dinheiro! 🔥
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold flex items-center gap-2 dark:text-white">
                            <UserPlus className="w-5 h-5 text-[#FF6B6B]" />
                            Links Úteis
                        </h3>
                        <ul className="space-y-2">
                            {['💡 Como surgiu', '👨💻 Open Source', '🆘 Ajuda'].map((item, i) => (
                                <li key={i} className="text-sm text-gray-600 dark:text-gray-300">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold flex items-center gap-2 dark:text-white">
                            <Bell className="w-5 h-5 text-[#9B5DE5]" />
                            Newsletter
                        </h3>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Seu email"
                                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-sm"
                            />
                            <button className="bg-gradient-to-r from-[#FF6B6B] to-[#9B5DE5] text-white px-4 py-2 rounded-lg text-sm font-medium active:scale-95">
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-8 text-center">
                    <div className="flex justify-center gap-4 mb-4">
                        {['🐦', '📸', '👨💻', '💌'].map((icon, i) => (
                            <button key={i} className="text-xl">
                                {icon}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} PagAê • Feito com ☕ e 🍕
                    </p>
                </div>
            </div>
        </footer>
    );
}