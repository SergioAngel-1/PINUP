import React from 'react';
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 
            to-green-400 text-transparent bg-clip-text mb-4">
              PINUP
            </h3>
            <p className="text-gray-400 mb-4">
              Transformando la escena del baile urbano en Medellín
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-500 transition">
                <Instagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition">
                <Facebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition">
                <Youtube />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>Calle 10 #30-45, Medellín</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5" />
                <span>+57 300 123 4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5" />
                <span>info@pinupdance.co</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Horario</h4>
            <div className="space-y-2 text-gray-400">
              <p>Lunes - Viernes: 7:00 AM - 9:00 PM</p>
              <p>Sábado: 8:00 AM - 6:00 PM</p>
              <p>Domingo: 9:00 AM - 2:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-900/20 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} PINUP Dance Academy. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}