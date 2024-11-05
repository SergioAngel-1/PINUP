import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader, MapPin, Phone, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import alertify from 'alertifyjs';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    try {
      await emailjs.sendForm(
        'service_l2577g8',
        'template_h9uh50k',
        formRef.current,
        'T-ng2dpIc2Z1tTgNG'
      );
      alertify.success('¡Mensaje enviado exitosamente!');
      formRef.current.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      alertify.error('Error al enviar el mensaje');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-black" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-green-400 
          text-transparent bg-clip-text mb-4">
            Contáctanos
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Información de Contacto</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Ubicación</p>
                    <p className="text-gray-400">Calle XX, Medellín</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Teléfono</p>
                    <p className="text-gray-400">+57 ...</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-gray-400">info@pinupdance.co</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Horario de Atención</h3>
              <div className="space-y-3 text-gray-400">
                <p>Lunes - Viernes: 7:00 AM - 9:00 PM</p>
                <p>Sábado: 8:00 AM - 6:00 PM</p>
                <p>Domingo: 9:00 AM - 2:00 PM</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-200 mb-2">Nombre</label>
                <input
                  type="text"
                  name="user_name"
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-4
                  text-white focus:outline-none focus:border-purple-500 transition"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-200 mb-2">Email</label>
                <input
                  type="email"
                  name="user_email"
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-4
                  text-white focus:outline-none focus:border-purple-500 transition"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-200 mb-2">Mensaje</label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-4
                  text-white focus:outline-none focus:border-purple-500 transition resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                  required
                />
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
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}