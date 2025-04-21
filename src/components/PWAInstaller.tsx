import { useEffect, useState, useCallback } from 'react';

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      console.log('Evento beforeinstallprompt capturado', e);
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const installApp = useCallback(async () => {
    if (!deferredPrompt) return;
    
    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      console.log('Escolha do usuário:', choiceResult.outcome);
    } catch (error) {
      console.error('Erro na instalação:', error);
    } finally {
      setDeferredPrompt(null);
    }
  }, [deferredPrompt]);

  if (!deferredPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <button 
        onClick={installApp}
        className="group relative bg-gradient-to-r from-[#DC2626] to-[#7C3AED] dark:from-[#B91C1C] dark:to-[#6D28D9] 
        text-white px-6 py-3 rounded-full text-lg font-semibold hover:shadow-xl transform transition-all 
        duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-lg flex items-center gap-3
        border-2 border-white/20 hover:border-white/40"
      >
        <span className="relative">
          📱
          <span className="absolute -right-2 -top-2 animate-ping">✨</span>
        </span>
        <span className="hidden md:inline">Instalar App PagAê!</span>
        <span className="md:hidden">Instalar</span>
        <span className="ml-2 transition-all duration-300 opacity-0 group-hover:opacity-100">🚀</span>
        <div className="absolute inset-0 transition-opacity rounded-full opacity-0 bg-white/10 group-hover:opacity-20" />
      </button>
    </div>
  );
}
