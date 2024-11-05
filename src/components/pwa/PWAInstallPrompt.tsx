import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show our custom prompt
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
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // We no longer need the prompt regardless of outcome
    setDeferredPrompt(null);
    setShowPrompt(false);
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
                  <Download className="w-4 h-4" />
                  <span>Instalar</span>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
