import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { VITE_PUBLIC_API_URL } from '../config.js';

const CartButton = ({ size = 'small', showCart: externalShowCart, setShowCart: externalSetShowCart }) => {
    const [cartData, setCartData] = useState([]);
    const { user } = useAuth();
    const _id = user?._id;

    // Use internal state if external not passed
    const [internalShowCart, setInternalShowCart] = useState(false);
    const showCart = externalShowCart ?? internalShowCart;
    const setShowCart = externalSetShowCart ?? setInternalShowCart;

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${VITE_PUBLIC_API_URL}/products/${_id}/cart`, {
                withCredentials: true
            });
            setCartData(res.data);
        } catch (error) {
            console.error("Failed to fetch cart data:", error);
        }
    };

    return (
        <>
            <button
                className={`${size === 'small'
                        ? 'bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow flex items-center justify-center transition duration-300'
                        : 'fixed top-6 right-6 bg-red-500 hover:bg-red-600 text-white rounded-full w-14 h-14 shadow-lg text-2xl z-50 transition duration-300'
                    }`}
                onClick={() => {
                    setShowCart(true);
                    fetchProduct();
                }}
                aria-label="Open cart"
            >
                🛒
            </button>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${showCart ? 'opacity-50' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setShowCart(false)}
            ></div>

            {/* Cart Drawer */}
            <div
                className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl flex flex-col transition-transform duration-500 transform z-50 ${showCart ? 'translate-x-0' : 'translate-x-full'
                    } rounded-l-2xl`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
                    <button
                        className="text-gray-500 hover:text-red-600 text-3xl font-light"
                        onClick={() => setShowCart(false)}
                    >
                        &times;
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cartData.length > 0 ? (
                        cartData.map((item) => (
                            <div
                                key={item.productId._id}
                                className="grid grid-cols-[1fr_auto_auto] items-center gap-2 bg-white shadow-sm border border-gray-200 rounded-xl p-2"
                            >
                                <div className="flex items-center gap-2">
                                    <img
                                        src={item.productId.image}
                                        alt={item.productId.name}
                                        className="w-12 h-12 rounded-md object-cover"
                                    />
                                    <div className="leading-tight">
                                        <h3 className="text-sm font-medium text-gray-800 truncate max-w-[120px]">
                                            {item.productId.name}
                                        </h3>
                                        <p className="text-xs text-gray-500">₹{item.productId.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-2 bg-red-50 px-2 py-1 rounded-full border border-red-300 text-red-600 font-semibold text-sm">
                                    <button className="px-1 text-lg hover:text-red-700">−</button>
                                    <span className="min-w-[16px] text-center">{item.qty}</span>
                                    <button className="px-1 text-lg hover:text-red-700">+</button>
                                </div>
                                <div className="text-right text-base font-semibold text-gray-800 min-w-[60px]">
                                    ₹{item.productId.price * item.qty}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 text-lg mt-8">Your cart is empty.</p>
                    )}
                </div>

                {/* Checkout */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-lg font-semibold text-gray-800">Total:</p>
                        <p className="text-xl font-bold text-red-600">
                            ₹
                            {cartData
                                .reduce((total, item) => total + item.productId.price * item.qty, 0)
                                .toFixed(2)}
                        </p>
                    </div>
                    <Link to={`/user/${_id}/checkout`}>
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg text-base transition duration-200">
                            Proceed to Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default CartButton;
