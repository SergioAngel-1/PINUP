import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  User,
  Mail,
  Lock,
  Star,
  Clock,
  Music,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import alertify from "alertifyjs";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  experience: string;
  schedule: string[];
  interests: string[];
}

const initialFormData: FormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  experience: "beginner",
  schedule: [],
  interests: [],
};

export default function JourneyRegistration({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const { register } = useAuthContext();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "schedule" | "interests"
  ) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step < 3) {
      setStep((prev) => prev + 1);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alertify.error("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      await register(formData.email, formData.password, formData.name);
      alertify.success("¡Registro exitoso! Bienvenido a PINUP Dance");
      onClose();
      navigate("/dashboard");
    } catch (error) {
      alertify.error(
        error instanceof Error ? error.message : "Error en el registro"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-200 mb-2">Nombre</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-10
                  text-white focus:outline-none focus:border-purple-500 transition"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-200 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-10
                  text-white focus:outline-none focus:border-purple-500 transition"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-200 mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-10
                  text-white focus:outline-none focus:border-purple-500 transition"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-200 mb-2">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-10
                  text-white focus:outline-none focus:border-purple-500 transition"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-200 mb-4">
                Nivel de Experiencia
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Principiante", "Intermedio", "Avanzado"].map((level) => (
                  <label
                    key={level}
                    className={`flex items-center justify-center p-4 rounded-lg border 
                    transition-colors cursor-pointer ${
                      formData.experience === level.toLowerCase()
                        ? "border-purple-500 bg-purple-500/20"
                        : "border-purple-500/30 bg-purple-900/20 hover:border-purple-500/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="experience"
                      value={level.toLowerCase()}
                      checked={formData.experience === level.toLowerCase()}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className="text-center">
                      <Star
                        className={`w-6 h-6 mx-auto mb-2 ${
                          formData.experience === level.toLowerCase()
                            ? "text-purple-400"
                            : "text-gray-400"
                        }`}
                      />
                      <span className="text-white">{level}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-200 mb-4">
                Horarios Preferidos
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Mañana (7AM - 12PM)",
                  "Tarde (12PM - 5PM)",
                  "Noche (5PM - 9PM)",
                  "Fines de semana",
                ].map((time) => (
                  <label
                    key={time}
                    className={`flex items-center p-4 rounded-lg border transition-colors 
                    cursor-pointer ${
                      formData.schedule.includes(time)
                        ? "border-purple-500 bg-purple-500/20"
                        : "border-purple-500/30 bg-purple-900/20 hover:border-purple-500/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={time}
                      checked={formData.schedule.includes(time)}
                      onChange={(e) => handleCheckboxChange(e, "schedule")}
                      className="hidden"
                    />
                    <div className="flex items-center space-x-3">
                      <Clock
                        className={`w-5 h-5 ${
                          formData.schedule.includes(time)
                            ? "text-purple-400"
                            : "text-gray-400"
                        }`}
                      />
                      <span className="text-white">{time}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-200 mb-4">
                Estilos de Baile
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Hip Hop",
                  "Break Dance",
                  "Popping",
                  "House",
                  "Locking",
                  "Dancehall",
                ].map((style) => (
                  <label
                    key={style}
                    className={`flex items-center p-4 rounded-lg border transition-colors 
                    cursor-pointer ${
                      formData.interests.includes(style)
                        ? "border-purple-500 bg-purple-500/20"
                        : "border-purple-500/30 bg-purple-900/20 hover:border-purple-500/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={style}
                      checked={formData.interests.includes(style)}
                      onChange={(e) => handleCheckboxChange(e, "interests")}
                      className="hidden"
                    />
                    <div className="flex items-center space-x-3">
                      <Music
                        className={`w-5 h-5 ${
                          formData.interests.includes(style)
                            ? "text-purple-400"
                            : "text-gray-400"
                        }`}
                      />
                      <span className="text-white">{style}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-gradient-to-b from-purple-900/90 to-black/95 
              backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-xl border border-purple-500/20 
              max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/20 
              scrollbar-track-transparent my-auto"
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-white transition"
              >
                <X size={24} />
              </button>

              <div className="flex items-center space-x-2 mb-8">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <h1 className="text-2xl font-bold text-white">
                  Comienza tu viaje en PINUP
                </h1>
              </div>

              <div className="mb-8">
                <div className="flex justify-between">
                  {[1, 2, 3].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`flex-1 h-2 rounded-full mx-1 ${
                        stepNumber <= step
                          ? "bg-purple-500"
                          : "bg-purple-500/20"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {renderStepContent()}

                <div className="flex items-center justify-between mt-8">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition"
                    >
                      <ArrowLeft size={20} />
                      <span>Anterior</span>
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 
                    to-pink-600 text-white px-6 py-2 rounded-full ml-auto hover:from-purple-700 
                    hover:to-pink-700 transition transform hover:scale-105 disabled:opacity-50 
                    disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <span>{step === 3 ? "Completar" : "Siguiente"}</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
