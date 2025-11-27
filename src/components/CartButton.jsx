import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";

const RENDER_WEBSITE_LINK = import.meta.env.VITE_RENDER_WEBSITE_LINK;

const CartButton = ({ size = 'small', showCart: externalShowCart, setShowCart: externalSetShowCart }) => {
    const [cartData, setCartData] = useState([]);
    const { user } = useAuth();
    const _id = user?._id;

    const [internalShowCart, setInternalShowCart] = useState(false);
    const showCart = externalShowCart ?? internalShowCart;
    const setShowCart = externalSetShowCart ?? setInternalShowCart;

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${RENDER_WEBSITE_LINK}/products/${_id}/cart`, {
                withCredentials: true
            });
            setCartData(res.data);
        } catch (error) {
            console.error("Failed to fetch cart data:", error);
        }
    };

    const updateQty = async (productId, type) => {
        setCartData(prevCart =>
            prevCart.map(item =>
                item.productId._id === productId
                    ? {
                        ...item,
                        qty: type === 'inc' ? item.qty + 1 : Math.max(1, item.qty - 1),
                    }
                    : item
            )
        );
        await axios.post(`${RENDER_WEBSITE_LINK}/products/${_id}/cart/update`, {
            productId,
            qty: type === 'inc' ? cartData.find(item => item.productId._id === productId).qty + 1 : cartData.find(item => item.productId._id === productId).qty - 1
        }, {
            withCredentials: true
        });
        fetchProduct();
    };

    const deleteItem = async (productId) => {
        await axios.post(`${RENDER_WEBSITE_LINK}/products/${_id}/cart/update/delete`, {
            productId
        }, {
            withCredentials: true
        });
        fetchProduct();
    };

    return (
        <>
            <button
                className={`${size === 'small'
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center transition duration-300 hover:scale-110'
                    : 'fixed top-6 right-6 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-full w-14 h-14 shadow-lg text-2xl z-50 transition duration-300 hover:scale-110'
                    }`}
                onClick={() => {
                    setShowCart(true);
                    fetchProduct();
                }}
                aria-label="Open cart"
            >
                <FaShoppingBag className="w-5 h-5" />
            </button>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${showCart ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setShowCart(false)}
            ></div>

            {/* Cart Drawer - Fade In/Out instead of Slide */}
            <div
                className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-gray-900 border-l border-gray-800 shadow-2xl flex flex-col z-50 transition-all duration-300 transform ${showCart ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 translate-x-10 pointer-events-none'}`}
            >
                <div className="flex items-center justify-between p-5 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                        <div className="p-2 bg-orange-500/10 rounded-lg">
                            <FaShoppingBag className="w-5 h-5 text-orange-500" />
                        </div>
                        Your Cart
                    </h2>
                    <button
                        className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
                        onClick={() => setShowCart(false)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cartData.length > 0 ? (
                        cartData.map((item) => (
                            <div
                                key={item.productId._id}
                                className="relative bg-gray-800/50 border border-gray-700 rounded-2xl p-3 shadow-sm hover:border-orange-500/30 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    {/* Image */}
                                    <div className="relative">
                                        <img
                                            src={item.productId.image}
                                            alt={item.productId.name}
                                            className="w-16 h-16 rounded-xl object-cover border border-gray-700"
                                        />
                                        <div className="absolute -top-2 -right-2 bg-gray-900 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md border border-gray-700 cursor-pointer"
                                            onClick={() => deleteItem(item.productId._id)}>
                                            <MdDelete className="text-red-500 text-sm" />
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-white truncate">
                                            {item.productId.name}
                                        </h3>
                                        <p className="text-xs text-orange-400 font-medium mt-0.5">₹{item.productId.price}</p>

                                        <div className="flex items-center justify-between mt-2">
                                            {/* Quantity control */}
                                            <div className="flex items-center gap-3 bg-gray-900 rounded-lg px-2 py-1 border border-gray-700">
                                                <button
                                                    className="text-gray-400 hover:text-white transition-colors text-lg leading-none pb-0.5"
                                                    onClick={() => updateQty(item.productId._id, 'dec')}
                                                >−</button>
                                                <span className="text-xs font-semibold text-white w-4 text-center">{item.qty}</span>
                                                <button
                                                    className="text-gray-400 hover:text-white transition-colors text-lg leading-none pb-0.5"
                                                    onClick={() => updateQty(item.productId._id, 'inc')}
                                                >+</button>
                                            </div>

                                            {/* Total */}
                                            <div className="text-sm font-bold text-white">
                                                ₹{item.productId.price * item.qty}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-60">
                            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                <FaShoppingBag className="w-8 h-8 text-gray-600" />
                            </div>
                            <p className="text-gray-400 font-medium">Your cart is empty</p>
                            <p className="text-xs text-gray-500 mt-2">Add some delicious items to get started!</p>
                        </div>
                    )}
                </div>

                {/* Checkout */}
                {cartData.length > 0 && (
                    <div className="p-5 border-t border-gray-800 bg-gray-900/50 backdrop-blur-md">
                        <div className="flex justify-between items-end mb-4">
                            <p className="text-sm text-gray-400">Total Amount</p>
                            <p className="text-2xl font-bold text-white">
                                <span className="text-orange-500 text-lg mr-1">₹</span>
                                {cartData
                                    .reduce((total, item) => total + item.productId.price * item.qty, 0)
                                    .toFixed(2)}
                            </p>
                        </div>
                        <Link to={`/user/${_id}/checkout`}>
                            <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3.5 rounded-xl text-sm uppercase tracking-wide transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transform hover:-translate-y-0.5">
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartButton;
