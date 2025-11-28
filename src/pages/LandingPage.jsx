import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHamburger, FaMotorcycle, FaUtensils, FaBars, FaTimes } from 'react-icons/fa';

const LandingPage = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [wordIndex, setWordIndex] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const images = [
        "/image/hero.png",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80", // Feast
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1920&q=80", // Pizza
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1920&q=80"  // Burger
    ];

    const words = ["Magic", "Flavor", "Passion"];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const wordTimer = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(wordTimer);
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans">
            {/* Navbar */}
            {/* Navbar */}
            <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-orange-500 tracking-wider z-50 relative">AddyBites</h1>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center bg-black/30 backdrop-blur-md px-8 py-3 rounded-full border border-white/10">
                        <Link to="/" className="hover:text-orange-400 transition font-medium text-sm uppercase tracking-wide">Home</Link>
                        <Link to="/menu" className="hover:text-orange-400 transition font-medium text-sm uppercase tracking-wide">Menu</Link>
                        <Link to="/about" className="hover:text-orange-400 transition font-medium text-sm uppercase tracking-wide">About</Link>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex space-x-4">
                        <Link to="/login" className="px-6 py-2 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition font-medium">Login</Link>
                        <Link to="/signin" className="px-6 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition font-medium shadow-lg hover:shadow-orange-500/30">Sign Up</Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-2xl text-white z-50 relative focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-0 left-0 w-full bg-gray-900/95 backdrop-blur-xl border-b border-gray-800 p-6 pt-24 flex flex-col space-y-6 md:hidden shadow-2xl"
                        >
                            <Link to="/" className="text-xl font-medium hover:text-orange-500 transition" onClick={() => setIsMenuOpen(false)}>Home</Link>
                            <Link to="/menu" className="text-xl font-medium hover:text-orange-500 transition" onClick={() => setIsMenuOpen(false)}>Menu</Link>
                            <Link to="/about" className="text-xl font-medium hover:text-orange-500 transition" onClick={() => setIsMenuOpen(false)}>About</Link>
                            <div className="h-px bg-gray-800 w-full my-4"></div>
                            <Link to="/login" className="text-center w-full py-3 rounded-xl border border-orange-500 text-orange-500 font-medium" onClick={() => setIsMenuOpen(false)}>Login</Link>
                            <Link to="/signin" className="text-center w-full py-3 rounded-xl bg-orange-500 text-white font-medium shadow-lg" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Hero Section */}
            <div className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Slideshow */}
                <div className="absolute inset-0 z-0">
                    <AnimatePresence mode='wait'>
                        <motion.img
                            key={currentImage}
                            src={images[currentImage]}
                            alt="Delicious Food"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 0.6, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            className="w-full h-full object-cover absolute inset-0"
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-black/60"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl flex flex-col items-center gap-2"
                    >
                        <span>Taste the</span>
                        <span className="inline-block relative min-w-[200px] text-center">
                            <AnimatePresence mode='wait'>
                                <motion.span
                                    key={words[wordIndex]}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute left-0 w-full text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600"
                                >
                                    {words[wordIndex]}
                                </motion.span>
                            </AnimatePresence>
                            <span className="invisible">Passion</span> {/* Spacer for width */}
                        </span>
                        <span>in Every Bite</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto drop-shadow-md"
                    >
                        Premium ingredients, world-class chefs, and lightning-fast delivery right to your doorstep.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Link to="/menu" className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white text-lg font-bold rounded-full shadow-xl hover:shadow-orange-500/40 hover:scale-105 transform transition duration-300">
                            Order Now
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 px-8 bg-gray-900">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    <FeatureCard
                        icon={<FaMotorcycle className="text-5xl text-orange-500" />}
                        title="Fast Delivery"
                        desc="Hot and fresh food delivered to your door in under 30 minutes."
                        delay={0}
                    />
                    <FeatureCard
                        icon={<FaUtensils className="text-5xl text-orange-500" />}
                        title="Fresh Ingredients"
                        desc="We use only the finest, locally sourced ingredients for our dishes."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={<FaHamburger className="text-5xl text-orange-500" />}
                        title="Gourmet Taste"
                        desc="Recipes crafted by top chefs to give you an unforgettable experience."
                        delay={0.4}
                    />
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -10 }}
        className="bg-gray-800/50 backdrop-blur-sm p-10 rounded-3xl shadow-xl text-center border border-gray-700 hover:border-orange-500/50 transition duration-300 group"
    >
        <div className="mb-6 flex justify-center transform group-hover:scale-110 transition duration-300">{icon}</div>
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-orange-400 transition">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
);

export default LandingPage;
