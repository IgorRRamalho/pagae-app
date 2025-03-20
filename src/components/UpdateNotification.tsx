// src/components/UpdateNotification.tsx
import { useEffect, useState } from 'react';

export default function UpdateNotification() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setUpdateAvailable(true);
      });
    }
  }, []);

  const reloadApp = () => {
    window.location.reload();
  };

  if (!updateAvailable) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50">
      <button 
        onClick={reloadApp}
        className="flex items-center gap-2 hover:bg-blue-700 transition-colors"
      >
        🔄 Nova atualização disponível! Clique para recarregar!
      </button>
    </div>
  );
}