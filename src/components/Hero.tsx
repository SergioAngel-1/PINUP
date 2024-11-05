import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import JourneyRegistration from "./JourneyRegistration";
import { useAuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [showRegistration, setShowRegistration] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      setShowRegistration(true);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div
        className="absolute inset-0 bg-[url('/bannerPinUp.webp')] 
        bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 via-black/80 to-black/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-green-400 text-transparent bg-clip-text">
              PINUP DANCE
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Donde el arte urbano cobra vida
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleButtonClick}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full 
            font-semibold text-lg flex items-center space-x-2 mx-auto hover:from-purple-700 
            hover:to-pink-700 transition"
          >
            <Sparkles className="w-5 h-5" />
            <span>
              {user
                ? `Ir al Panel ${
                    user.role === "admin"
                      ? "de Administración"
                      : user.role === "teacher"
                      ? "de Profesor"
                      : "de Estudiante"
                  }`
                : "Comienza Tu Viaje"}
            </span>
          </motion.button>
        </motion.div>

        {/* Floating shapes animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-purple-500/20 rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                scale: [1, Math.random() + 0.5],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <JourneyRegistration
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
      />
    </div>
  );
}
