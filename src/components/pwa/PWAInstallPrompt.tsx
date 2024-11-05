import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Apple, Chrome, Share } from "lucide-react";

interface InstallInstructions {
  title: string;
  steps: string[];
  icon: typeof Apple | typeof Chrome;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // Check if running on iOS
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIOSDevice);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowPrompt(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowInstructions(true);
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const instructions: InstallInstructions = isIOS
    ? {
        title: "Instalar en iPhone/iPad",
        steps: [
          "Toca el botón Compartir",
          "Desplázate y selecciona 'Añadir a Pantalla de Inicio'",
          "Confirma tocando 'Añadir'",
        ],
        icon: Apple,
      }
    : {
        title: "Instalar en Chrome",
        steps: [
          "Haz clic en el botón de instalación",
          "Selecciona 'Instalar' en el diálogo",
          "¡Listo! La app se instalará automáticamente",
        ],
        icon: Chrome,
      };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-gradient-to-r 
          from-purple-900/90 to-black/90 backdrop-blur-lg rounded-xl p-4 shadow-2xl border 
          border-purple-500/20 z-50"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">
                Instala PINUP Dance
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Instala nuestra app para una mejor experiencia y acceso rápido a
                tus clases
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleInstallClick}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 
                  text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 
                  transition transform hover:scale-105"
                >
                  {isIOS ? (
                    <Share className="w-4 h-4" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span>Instalar App</span>
                </button>
                <button
                  onClick={() => setShowPrompt(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition"
                >
                  Ahora no
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowPrompt(false)}
              className="text-gray-400 hover:text-white transition p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-purple-500/20"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <instructions.icon className="w-6 h-6 text-purple-400" />
                  <h4 className="text-white font-medium">
                    {instructions.title}
                  </h4>
                </div>
                <ol className="space-y-2">
                  {instructions.steps.map((step, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 text-gray-300 text-sm"
                    >
                      <span
                        className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center 
                      justify-center text-purple-400 text-xs"
                      >
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
