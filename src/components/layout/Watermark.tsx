
import { useEffect, useState } from 'react';

const Watermark = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Proteção contra remoção - verifica periodicamente se a marca d'água ainda existe
  useEffect(() => {
    const interval = setInterval(() => {
      const watermarkElement = document.getElementById('watermark-2lecybersec');
      if (!watermarkElement) {
        setIsVisible(true);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="watermark-2lecybersec"
      className="fixed bottom-4 right-4 z-50 pointer-events-none select-none"
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '12px',
        color: '#6b7280',
        textShadow: '0 1px 2px rgba(0,0,0,0.1)',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
    >
      <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md border border-gray-200 shadow-sm">
        <span className="text-xs">Powered by</span>
        <a
          href="https://2lecybersec.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-medium pointer-events-auto"
          style={{ textDecoration: 'none' }}
        >
          2lecybersec.com
        </a>
      </div>
    </div>
  );
};

export default Watermark;
