import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHamburger, FaMotorcycle, FaUtensils } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-20 flex justify-between items-center px-8 py-6 bg-gradient-to-b from-black/70 to-transparent">
        <h1 className="text-3xl font-bold text-orange-500 tracking-wider">AddyBites</h1>
        <div className="space-x-6 hidden md:block">
          <Link to="/" className="hover:text-orange-400 transition">Home</Link>
          <Link to="/menu" className="hover:text-orange-400 transition">Menu</Link>
          <Link to="/about" className="hover:text-orange-400 transition">About</Link>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="px-4 py-2 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition">Login</Link>
          <Link to="/signin" className="px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/image/hero.png" alt="Delicious Food" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
          >
            Taste the <span className="text-orange-500">Magic</span> in Every Bite
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 mb-10"
          >
            Premium ingredients, world-class chefs, and lightning-fast delivery.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/menu" className="px-8 py-4 bg-orange-500 text-white text-lg font-bold rounded-full shadow-lg hover:bg-orange-600 hover:scale-105 transform transition duration-300">
              Order Now
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-8 bg-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<FaMotorcycle className="text-4xl text-orange-500" />}
            title="Fast Delivery"
            desc="Hot and fresh food delivered to your door in under 30 minutes."
          />
          <FeatureCard 
            icon={<FaUtensils className="text-4xl text-orange-500" />}
            title="Fresh Ingredients"
            desc="We use only the finest, locally sourced ingredients for our dishes."
          />
          <FeatureCard 
            icon={<FaHamburger className="text-4xl text-orange-500" />}
            title="Gourmet Taste"
            desc="Recipes crafted by top chefs to give you an unforgettable experience."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-gray-700 p-8 rounded-2xl shadow-xl text-center border border-gray-600 hover:border-orange-500/50 transition"
  >
    <div className="mb-6 flex justify-center">{icon}</div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-400">{desc}</p>
  </motion.div>
);

export default LandingPage;
