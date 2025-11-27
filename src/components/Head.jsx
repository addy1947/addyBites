import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CartButton from './CartButton';
import { useAuth } from '../context/AuthContext';
import { CgProfile } from 'react-icons/cg';

const RENDER_WEBSITE_LINK = import.meta.env.VITE_RENDER_WEBSITE_LINK;

const Head = (props) => {
    const [query, setQuery] = useState('');
    const { user, loading } = useAuth();
    const [showCart, setShowCart] = useState(false);

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



        try {
            const res = await axios.get(`${RENDER_WEBSITE_LINK}/products/search?q=` + encodeURIComponent(query.trim()));

            props.a(res.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
            // Handle error, e.g., show a message to the user
        }
    };

    return (
        <div className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-lg transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="group flex items-center gap-2">
                            <span className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent group-hover:from-orange-400 group-hover:to-red-500 transition-all duration-300">
                                Addy<span className="text-white">Bites</span>
                            </span>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="w-full max-w-md relative group">
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

                    {/* Actions */}
                    <div className="flex items-center gap-4">
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
            </div>
        </div>
    );
};

export default Head;
