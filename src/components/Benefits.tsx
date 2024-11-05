import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Trophy, Music, Star, Zap } from 'lucide-react';

const benefits = [
  {
    icon: Heart,
    title: 'Salud y Bienestar',
    description: 'Mejora tu condición física y mental a través del baile'
  },
  {
    icon: Users,
    title: 'Comunidad',
    description: 'Únete a una familia apasionada por el baile urbano'
  },
  {
    icon: Trophy,
    title: 'Competencias',
    description: 'Participa en eventos y muestra tu talento'
  },
  {
    icon: Music,
    title: 'Música Actual',
    description: 'Aprende con los últimos éxitos musicales'
  },
  {
    icon: Star,
    title: 'Instructores Elite',
    description: 'Aprende de los mejores bailarines de la ciudad'
  },
  {
    icon: Zap,
    title: 'Energía Única',
    description: 'Vive una experiencia de baile incomparable'
  }
];

export default function Benefits() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-green-400 
          text-transparent bg-clip-text mb-4">
            ¿Por qué elegir PINUP?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Descubre los beneficios que nos hacen únicos en la escena del baile urbano
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-6 rounded-xl 
              border border-purple-500/20 backdrop-blur-sm hover:from-purple-900/30 
              hover:to-pink-900/30 transition duration-300"
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-lg 
              flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}