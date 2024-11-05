import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-black text-white">
        <Routes>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route
            path="*"
            element={
              <>
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}
