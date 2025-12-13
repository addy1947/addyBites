import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CartButton from './CartButton';
import { useAuth } from '../context/AuthContext';
import { CgProfile } from 'react-icons/cg';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const RENDER_WEBSITE_LINK = import.meta.env.VITE_RENDER_WEBSITE_LINK;

const Head = (props) => {
    const [query, setQuery] = useState('');
    const { user, loading } = useAuth();
    const [showCart, setShowCart] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Make setShowCart available globally through window object
    React.useEffect(() => {
        window.setShowCart = setShowCart;
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!query.trim()) {
            return; // Don't search if query is empty
        }


        if (props.setLoading) props.setLoading(true);

        try {
            const res = await axios.get(`${RENDER_WEBSITE_LINK}/products/search?q=` + encodeURIComponent(query.trim()));

            props.a(res.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
            // Handle error, e.g., show a message to the user
        } finally {
            if (props.setLoading) props.setLoading(false);
        }
    };

    return (
        <div className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-lg transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">

                    {/* Top Row: Logo + Mobile Toggle */}
                    <div className="w-full md:w-auto flex justify-between items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="group flex items-center gap-2">
                                <span className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent group-hover:from-orange-400 group-hover:to-red-500 transition-all duration-300">
                                    Addy<span className="text-white">Bites</span>
                                </span>
                            </Link>
                        </div>

                        {/* Mobile Actions (Cart + Toggle) */}
                        <div className="flex items-center gap-4 md:hidden">
                            {!loading && <CartButton showCart={showCart} setShowCart={setShowCart} size="small" />}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-300 hover:text-white focus:outline-none text-2xl"
                            >
                                {isMenuOpen ? <FaTimes /> : <FaBars />}
                            </button>
                        </div>
                    </div>

                    {/* Desktop Search Bar */}
                    <div className="hidden md:block w-full max-w-md relative group">
                        <form onSubmit={handleSubmit} className="relative">
                            <input
                                type="text"
                                placeholder="Search for delicious food..."
                                className="w-full bg-gray-800 text-gray-200 rounded-full py-2.5 pl-12 pr-4 border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all duration-300 placeholder-gray-500"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </form>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {!loading && (
                            <>
                                {user ? (
                                    <div className="flex items-center gap-4">
                                        <Link to={`/user/${user._id}`} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                                            <CgProfile className="w-8 h-8" />
                                            <span className="hidden sm:block font-medium">{user.name}</span>
                                        </Link>
                                        <CartButton showCart={showCart} setShowCart={setShowCart} size="small" />
                                        <Link
                                            to="/logout"
                                            className="px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-full transition-colors"
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <Link
                                            to="/login"
                                            className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/signin"
                                            className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full shadow-lg hover:shadow-orange-500/25 hover:scale-105 transition-all duration-300"
                                        >
                                            Sign Up
                                        </Link>
                                        <CartButton showCart={showCart} setShowCart={setShowCart} size="small" />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden overflow-hidden bg-gray-900 border-t border-gray-800"
                        >
                            <div className="py-4 space-y-4 px-2">
                                {/* Mobile Search */}
                                <form onSubmit={(e) => { handleSubmit(e); setIsMenuOpen(false); }} className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full bg-gray-800 text-gray-200 rounded-full py-2 pl-10 pr-4 border border-gray-700 focus:border-orange-500 focus:outline-none"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                    <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </form>

                                {!loading && (
                                    <div className="flex flex-col gap-3">
                                        {user ? (
                                            <>
                                                <Link to={`/user/${user._id}`} className="flex items-center gap-2 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>
                                                    <CgProfile className="w-6 h-6" />
                                                    <span className="font-medium">{user.name}</span>
                                                </Link>
                                                <Link to="/logout" className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-gray-800 font-medium" onClick={() => setIsMenuOpen(false)}>
                                                    Logout
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link to="/login" className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800 font-medium" onClick={() => setIsMenuOpen(false)}>
                                                    Login
                                                </Link>
                                                <Link to="/signin" className="text-orange-500 hover:text-orange-400 p-2 rounded-lg hover:bg-gray-800 font-medium" onClick={() => setIsMenuOpen(false)}>
                                                    Sign Up
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Head;
