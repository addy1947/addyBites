import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Head from '../components/Head';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

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
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                isLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : added 
                        ? 'bg-green-500 text-white scale-105' 
                        : 'bg-white text-[#4b3621] hover:bg-gray-100 hover:scale-105 active:scale-95'
            }`}
        >
            {isLoading ? (
                <>
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    Adding...
                </>
            ) : added ? (
                <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Added!
                </>
            ) : (
                <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    Add to Cart
                </>
            )}
        </button>
    );
};

const Second = () => {
    const { _id } = useParams(); // or productName, depending on your route
    const [single, setSingle] = useState();
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const { user, loading } = useAuth();
    const userId = user?._id;

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`${RENDER_WEBSITE_LINK}/products/details/${_id}`);
            setSingle(res.data);
        };
        fetchProduct();
    }, []);

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
            <>
                <div className='sticky top-0 z-50 bg-white shadow-md'>
                    <Head />
                </div>
                <div
                    className="min-h-screen flex items-center justify-center"
                    style={{
                        backgroundImage: "url('/image/bg.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="bg-[#4b3621]/95 backdrop-blur-sm text-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-white/20 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="text-white font-semibold text-lg">Checking authentication...</p>
                    </div>
                </div>
            </>
        );
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!single) {
        return (
            <>
                <div className='sticky top-0 z-50 bg-white shadow-md'>
                    <Head />
                </div>
                <div
                    className="min-h-screen flex items-center justify-center"
                    style={{
                        backgroundImage: "url('/image/bg.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="bg-[#4b3621]/95 backdrop-blur-sm text-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-white/20 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="text-white font-semibold text-lg">Loading product details...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className='sticky top-0 z-50 bg-white shadow-md'>
                <Head />
            </div>
            
            {/* Loading Overlay */}
            {isAddingToCart && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-[#4b3621] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="text-[#4b3621] font-semibold text-lg">Adding to Cart...</p>
                    </div>
                </div>
            )}
            
            <div
                className="min-h-screen py-8 flex items-center justify-center"
                style={{
                    backgroundImage: "url('/image/bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="w-full max-w-5xl mx-auto px-4">
                    <div className="bg-[#4b3621]/95 backdrop-blur-sm text-white rounded-2xl p-6 sm:p-8 shadow-2xl">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Product Image */}
                            <div className="flex-shrink-0 flex justify-center lg:justify-start">
                                <img
                                    src={single[0].image}
                                    alt={single[0].name}
                                    className="w-80 h-80 sm:w-96 sm:h-96 object-cover rounded-2xl border-2 border-white/20 shadow-lg"
                                />
                            </div>
                            
                            {/* Product Details */}
                            <div className="flex flex-col gap-6 flex-grow">
                                <div>
                                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">{single[0].name}</h1>
                                    <div className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {single[0].cuisine}
                                    </div>
                                </div>
                                
                                <div className="text-2xl sm:text-3xl font-bold text-white">
                                    ₹{single[0].price}
                                </div>
                                
                                <div className="text-gray-200 text-base leading-relaxed">
                                    {single[0].description}
                                </div>
                                
                                {/* Category tags */}
                                {single[0].category && (
                                    <div className="flex flex-wrap gap-2">
                                        {single[0].category.map((item, i) => (
                                            <span key={i} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                
                                {/* Features */}
                                <div className="space-y-2 text-gray-200">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Premium Quality
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Fresh Ingredients
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Traditional Preparation
                                    </div>
                                </div>
                                
                                {/* Quantity and Add to Cart */}
                                <div className="flex flex-col sm:flex-row gap-4 items-center">
                                    <div className="flex items-center bg-white/20 rounded-xl p-1">
                                        <button
                                            className={`w-10 h-10 flex items-center justify-center text-white rounded-lg transition-colors ${
                                                isAddingToCart 
                                                    ? 'opacity-50 cursor-not-allowed' 
                                                    : 'hover:bg-white/20'
                                            }`}
                                            onClick={() => !isAddingToCart && setQuantity(q => Math.max(1, q - 1))}
                                            disabled={isAddingToCart}
                                            aria-label="Decrease quantity"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                            </svg>
                                        </button>
                                        <span className="px-4 py-2 text-lg font-semibold min-w-[3rem] text-center">{quantity}</span>
                                        <button
                                            className={`w-10 h-10 flex items-center justify-center text-white rounded-lg transition-colors ${
                                                isAddingToCart 
                                                    ? 'opacity-50 cursor-not-allowed' 
                                                    : 'hover:bg-white/20'
                                            }`}
                                            onClick={() => !isAddingToCart && setQuantity(q => Math.min(5, q + 1))}
                                            disabled={isAddingToCart}
                                            aria-label="Increase quantity"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </button>
                                    </div>
                                    <AddToCartButton onClick={addcart} isLoading={isAddingToCart} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Second;
