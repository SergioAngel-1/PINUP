import React from 'react';
import { motion } from 'framer-motion';

const blogPosts = [
  {
    id: 1,
    title: 'Descubre el poder del baile urbano',
    excerpt: 'El baile urbano no es solo un ejercicio, es una forma de expresión que libera el cuerpo y la mente...',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800',
    date: '2024-03-01'
  },
  {
    id: 2,
    title: 'Los beneficios del hip hop en tu salud',
    excerpt: 'El hip hop es más que un género musical, es un estilo de vida que puede mejorar tu condición física...',
    image: 'https://images.unsplash.com/photo-1557330359-ffb0deed6163?q=80&w=800',
    date: '2024-02-28'
  },
  {
    id: 3,
    title: 'Técnicas básicas para principiantes',
    excerpt: 'Aprende los fundamentos del baile urbano con estos consejos prácticos para empezar tu viaje...',
    image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?q=80&w=800',
    date: '2024-02-25'
  }
];

export default function Blog() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-green-400 
          text-transparent bg-clip-text mb-4">
            Blog de PINUP 
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explora nuestros artículos sobre baile, música y cultura urbana
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: post.id * 0.1 }}
              className="bg-gradient-to-b from-purple-900/20 to-black/40 rounded-2xl overflow-hidden 
              border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <time className="text-purple-400 text-sm">{post.date}</time>
                <h2 className="text-xl font-semibold text-white mt-2 mb-3">{post.title}</h2>
                <p className="text-gray-400 mb-4">{post.excerpt}</p>
                <button className="text-purple-400 hover:text-purple-300 transition-colors">
                  Leer más →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}