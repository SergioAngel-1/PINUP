import React from 'react';
import { motion } from 'framer-motion';
import { Star, Zap, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Básico',
    price: '99.900',
    icon: Star,
    color: 'from-purple-500 to-purple-600',
    features: [
      '2 clases semanales',
      'Acceso al área de práctica',
      'Comunidad de bailarines',
      'Progreso personalizado'
    ]
  },
  {
    name: 'Premium',
    price: '149.900',
    icon: Zap,
    color: 'from-pink-500 to-purple-500',
    popular: true,
    features: [
      '4 clases semanales',
      'Acceso ilimitado al área de práctica',
      'Workshops exclusivos',
      'Seguimiento personalizado',
      'Descuentos en eventos'
    ]
  },
  {
    name: 'Elite',
    price: '199.900',
    icon: Crown,
    color: 'from-green-400 to-purple-500',
    features: [
      'Clases ilimitadas',
      'Acceso 24/7 al área de práctica',
      'Workshops VIP',
      'Entrenamiento privado mensual',
      'Acceso prioritario a eventos',
      'Merchandising exclusivo'
    ]
  }
];

export default function Plans() {
  return (
    <section className="py-20 bg-black" id="plans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-green-400 
          text-transparent bg-clip-text mb-4">
            Planes de Membresía
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus objetivos y comienza tu viaje en el baile
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-gradient-to-b from-purple-900/20 to-black/40 rounded-2xl p-8 
              border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all 
              duration-300 ${plan.popular ? 'transform scale-105 md:-translate-y-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 
                  rounded-full text-sm font-medium">
                    Más Popular
                  </span>
                </div>
              )}

              <div className={`bg-gradient-to-r ${plan.color} w-16 h-16 rounded-xl 
              flex items-center justify-center mb-6`}>
                <plan.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">${plan.price}</span>
                <span className="text-gray-400">/mes</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full bg-gradient-to-r ${plan.color} text-white py-3 rounded-xl 
              font-semibold hover:opacity-90 transition-opacity transform hover:scale-105`}>
                Comenzar Ahora
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}