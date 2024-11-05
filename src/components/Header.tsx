import React, { useState, useEffect } from "react";
import { Menu, X, LogIn, UserPlus, User, LogOut, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { HashLink as NavHashLink } from "react-router-hash-link";
import { useAuthContext } from "./AuthContext";
import AuthModal from "./AuthModals";
import { usePWA } from "../hooks/usePWA";
import alertify from "alertifyjs";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { user, logout } = useAuthContext();
  const { isInstallable, installApp } = usePWA();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    alertify.success("Sesión cerrada exitosamente");
    navigate("/");
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? "bg-black/80 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo2.png" alt="PINUP" className="w-auto h-8" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-green-400 text-transparent bg-clip-text">
                PINUP
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-white hover:text-purple-400 transition"
              >
                Inicio
              </Link>
              <Link
                to="/blog"
                className="text-white hover:text-purple-400 transition"
              >
                Blog
              </Link>
              <NavHashLink
                to="/#plans"
                className="text-white hover:text-purple-400 transition"
                smooth
              >
                Planes
              </NavHashLink>
              <NavHashLink
                to="/#contact"
                className="text-white hover:text-purple-400 transition"
                smooth
              >
                Contacto
              </NavHashLink>

              {isInstallable && (
                <button
                  onClick={installApp}
                  className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition"
                >
                  <Download size={18} />
                  <span>Instalar App</span>
                </button>
              )}

              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 text-white hover:text-purple-400 transition"
                  >
                    <User size={18} />
                    <span>{user.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full 
                    flex items-center space-x-2 transition transform hover:scale-105"
                  >
                    <LogOut size={18} />
                    <span>Salir</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    id="login-button"
                    onClick={() => setShowLoginModal(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full 
                    flex items-center space-x-2 transition transform hover:scale-105"
                  >
                    <LogIn size={18} />
                    <span>Iniciar Sesión</span>
                  </button>
                  <button
                    id="register-button"
                    onClick={() => setShowRegisterModal(true)}
                    className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full 
                    flex items-center space-x-2 transition transform hover:scale-105"
                  >
                    <UserPlus size={18} />
                    <span>Registrarse</span>
                  </button>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "calc(100vh - 72px)" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-x-0 top-[72px] md:hidden bg-black/80 backdrop-blur-md"
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1 px-4 py-6 space-y-4">
                    <Link
                      to="/"
                      className="block text-white hover:text-purple-400 py-2 transition-colors"
                      onClick={handleMenuItemClick}
                    >
                      Inicio
                    </Link>
                    <Link
                      to="/blog"
                      className="block text-white hover:text-purple-400 py-2 transition-colors"
                      onClick={handleMenuItemClick}
                    >
                      Blog
                    </Link>
                    <NavHashLink
                      to="/#plans"
                      className="block text-white hover:text-purple-400 py-2 transition-colors"
                      onClick={handleMenuItemClick}
                      smooth
                    >
                      Planes
                    </NavHashLink>
                    <NavHashLink
                      to="/#contact"
                      className="block text-white hover:text-purple-400 py-2 transition-colors"
                      onClick={handleMenuItemClick}
                      smooth
                    >
                      Contacto
                    </NavHashLink>
                    {isInstallable && (
                      <button
                        onClick={() => {
                          installApp();
                          handleMenuItemClick();
                        }}
                        className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 py-2 transition-colors"
                      >
                        <Download size={18} />
                        <span>Instalar App</span>
                      </button>
                    )}
                  </div>

                  <div className="p-4 border-t border-purple-500/20">
                    {user ? (
                      <div className="space-y-4">
                        <Link
                          to="/dashboard"
                          className="flex items-center space-x-2 text-white py-2"
                          onClick={handleMenuItemClick}
                        >
                          <User size={18} />
                          <span>{user.name}</span>
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            handleMenuItemClick();
                          }}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 
                          rounded-full flex items-center justify-center space-x-2 transition"
                        >
                          <LogOut size={18} />
                          <span>Salir</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            setShowLoginModal(true);
                            handleMenuItemClick();
                          }}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 
                          rounded-full flex items-center justify-center space-x-2 transition"
                        >
                          <LogIn size={18} />
                          <span>Iniciar</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowRegisterModal(true);
                            handleMenuItemClick();
                          }}
                          className="flex-1 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 
                          rounded-full flex items-center justify-center space-x-2 transition"
                        >
                          <UserPlus size={18} />
                          <span>Registro</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <AuthModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        type="login"
      />
      <AuthModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        type="register"
      />
    </>
  );
}
