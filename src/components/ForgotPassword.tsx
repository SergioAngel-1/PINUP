import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader, ArrowLeft } from "lucide-react";
import emailjs from "@emailjs/browser";
import alertify from "alertifyjs";

interface ForgotPasswordProps {
  onBack: () => void;
}

export default function ForgotPassword({ onBack }: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        "service_l2577g8",
        "template_vn3s44f",
        {
          user_email: email,
          reset_link: `https://yourapp.com/reset-password?email=${encodeURIComponent(
            email
          )}`,
        },
        "T-ng2dpIc2Z1tTgNG'"
      );
      alertify.success("Instrucciones enviadas a tu email");
      setEmail("");
      onBack();
    } catch (error) {
      alertify.error("Error al enviar las instrucciones");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8">
      <button
        onClick={onBack}
        className="text-gray-400 hover:text-white transition flex items-center space-x-2 mb-8"
      >
        <ArrowLeft size={20} />
        <span>Volver</span>
      </button>

      <h2 className="text-2xl font-bold text-white mb-6">
        Recuperar Contraseña
      </h2>

      <p className="text-gray-300 mb-8">
        Ingresa tu email y te enviaremos las instrucciones para restablecer tu
        contraseña.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-200 mb-2">Email</label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
              size={20}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-10
              text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500
              transition"
              placeholder="tu@email.com"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg
          font-semibold flex items-center justify-center space-x-2 hover:from-purple-700 
          hover:to-pink-700 transition transform hover:scale-105 disabled:opacity-50 
          disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Enviando...</span>
            </>
          ) : (
            <span>Enviar Instrucciones</span>
          )}
        </button>
      </form>
    </div>
  );
}
