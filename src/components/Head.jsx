import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CartButton from './CartButton';
import { useAuth } from '../context/AuthContext';
import { CgProfile } from 'react-icons/cg';
import { VITE_PUBLIC_API_URL } from '../config';

const Head = (props) => {
    const [query, setQuery] = useState('');
    const { user, loading } = useAuth();
    const [showCart, setShowCart] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!query.trim()) {
            return; // Don't search if query is empty
        }

        console.log('Searching for:', query.trim()); // Debug log

        try {
            const res = await axios.get(`${VITE_PUBLIC_API_URL}/products/search?q=` + encodeURIComponent(query.trim()));
            console.log('Search results:', res.data); // Debug log
            props.a(res.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
            // Handle error, e.g., show a message to the user
        }
    };

    return (
        <>
            <div className="bg-gray-700 px-4 py-4 flex flex-col items-center justify-between w-full
                            sm:px-8 sm:py-4 sm:flex-row sm:gap-4 sm:items-center">
                <div className="flex flex-col items-center w-full mb-2
                                sm:items-start sm:w-auto sm:mb-0">
                    <Link to="/">
                        <h1 className="cursor-pointer text-3xl font-extrabold tracking-tight bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent shadow-lg text-center
                                       xs:text-4xl sm:text-5xl sm:text-left">
                            Addy<span className="text-yellow-400 drop-shadow-md">Bites</span>
                        </h1>
                    </Link>
                </div>
                {/* Combined right section for search, auth, and cart button */}
                <div className="flex flex-col gap-3 w-full items-center justify-center flex-wrap
                                sm:flex-row sm:w-auto sm:justify-end sm:flex-grow-0 sm:gap-4"> {/* Increased gap for better spacing on larger screens */}
                    <form onSubmit={handleSubmit} className="w-full flex-1 min-w-[180px] max-w-full
                                                            sm:w-auto sm:max-w-xs md:max-w-sm"> {/* Added max-width for search bar */}
                        <div className="relative w-full min-w-[150px]">
                            <input
                                type="text"
                                placeholder="Search food..."
                                className="w-full px-4 py-2 pl-10 text-black rounded-full border-2 border-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-md text-base
                                           sm:w-64 md:w-80 xs:text-lg"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                }}
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors duration-200"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }}
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                                    />
                                </svg>
                            </button>
                            <svg
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                                />
                            </svg>
                        </div>
                    </form>
                    <div className="w-full flex flex-row gap-3 justify-center items-center mt-2 flex-wrap
                                    sm:w-auto sm:mt-0 sm:gap-4"> {/* Adjusted gap for better alignment */}
                        {!loading && (
                            <>
                                {user ? (
                                    <div className="flex items-center gap-3">
                                        <Link to={`/user/${user._id}`} title="Profile">
                                            <CgProfile className="text-white text-3xl rounded-full hover:text-yellow-400 transition duration-200 cursor-pointer" />
                                        </Link>
                                        <span className="text-white text-sm font-medium">
                                            Welcome, {user.name}!
                                        </span>
                                        <Link
                                            to="/logout"
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 font-semibold text-center transition-all duration-300"
                                        >
                                            Logout
                                        </Link>
                                        {/* CartButton moved here */}
                                        <CartButton showCart={showCart} setShowCart={setShowCart} size="small" />
                                    </div>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 font-semibold text-center transition-all duration-300"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/signin"
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 font-semibold text-center transition-all duration-300"
                                        >
                                            Sign Up
                                        </Link>
                                        {/* CartButton for non-logged-in users, if desired */}
                                        <CartButton showCart={showCart} setShowCart={setShowCart} size="small" />
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Head;
