import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Head from '../components/Head';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const RENDER_WEBSITE_LINK = import.meta.env.VITE_RENDER_WEBSITE_LINK;

const AddToCartButton = ({ onClick, isLoading }) => {
    const [added, setAdded] = useState(false);

    const handleClick = async () => {
        if (isLoading) return;
        await onClick();
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-lg ${isLoading
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : added
                        ? 'bg-green-500 text-white scale-105'
                        : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-orange-500/40 hover:scale-105 active:scale-95'
                }`}
        >
            {isLoading ? (
                <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Adding...
                </>
            ) : added ? (
                <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    Added!
                </>
            ) : (
                <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    Add to Cart
                </>
            )}
        </button>
    );
};

const Second = () => {
    const { _id } = useParams();
    const [single, setSingle] = useState();
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const { user, loading } = useAuth();
    const userId = user?._id;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${RENDER_WEBSITE_LINK}/products/details/${_id}`);
                setSingle(res.data);
            } catch (error) {
                console.error("Error fetching product details", error);
            }
        };
        fetchProduct();
    }, [_id]);

    const addcart = async () => {
        setIsAddingToCart(true);
        try {
            await axios.post(`${RENDER_WEBSITE_LINK}/products/cart/${userId}/add?qty=${quantity}&pro=${_id}`, {}, { withCredentials: true });
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            setIsAddingToCart(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col">
                <Head />
                <div className="flex-grow flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-gray-700 border-t-orange-500 rounded-full animate-spin"></div>
                        <p className="text-gray-400 font-medium">Checking authentication...</p>
                    </div>
                </div>
            </div>
        );
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!single) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col">
                <Head />
                <div className="flex-grow flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-gray-700 border-t-orange-500 rounded-full animate-spin"></div>
                        <p className="text-gray-400 font-medium">Loading product details...</p>
                    </div>
                </div>
            </div>
        );
    }

    const product = Array.isArray(single) ? single[0] : single;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
            <Head />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700"
                >
                    <div className="flex flex-col lg:flex-row">
                        {/* Product Image */}
                        <div className="lg:w-1/2 relative h-96 lg:h-auto">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent lg:bg-gradient-to-r"></div>
                        </div>

                        {/* Product Details */}
                        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                            <div className="mb-6">
                                <span className="inline-block bg-orange-500/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
                                    {product.cuisine}
                                </span>
                                <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">{product.name}</h1>
                                <div className="text-3xl font-bold text-orange-500">
                                    ₹{product.price}
                                </div>
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed mb-8 border-l-4 border-gray-600 pl-4">
                                {product.description}
                            </p>

                            {/* Category tags */}
                            {product.category && (
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {product.category.map((item, i) => (
                                        <span key={i} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-600">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Features */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                    </div>
                                    Premium Quality
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                    </div>
                                    Fresh Ingredients
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                    </div>
                                    Fast Delivery
                                </div>
                            </div>

                            {/* Quantity and Add to Cart */}
                            <div className="flex flex-col sm:flex-row gap-6 items-center">
                                <div className="flex items-center bg-gray-700 rounded-full p-1 border border-gray-600">
                                    <button
                                        className={`w-12 h-12 flex items-center justify-center text-white rounded-full transition-colors ${isAddingToCart
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'hover:bg-gray-600'
                                            }`}
                                        onClick={() => !isAddingToCart && setQuantity(q => Math.max(1, q - 1))}
                                        disabled={isAddingToCart}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                                    </button>
                                    <span className="px-6 py-2 text-xl font-bold min-w-[3rem] text-center">{quantity}</span>
                                    <button
                                        className={`w-12 h-12 flex items-center justify-center text-white rounded-full transition-colors ${isAddingToCart
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'hover:bg-gray-600'
                                            }`}
                                        onClick={() => !isAddingToCart && setQuantity(q => Math.min(10, q + 1))}
                                        disabled={isAddingToCart}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                    </button>
                                </div>
                                <AddToCartButton onClick={addcart} isLoading={isAddingToCart} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Second;
