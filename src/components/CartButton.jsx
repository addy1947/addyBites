import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

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
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full p-2 shadow-lg flex items-center justify-center transition duration-300 hover:scale-110'
                    : 'fixed top-6 right-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full w-14 h-14 shadow-lg text-2xl z-50 transition duration-300 hover:scale-110'
                    }`}
                onClick={() => {
                    setShowCart(true);
                    fetchProduct();
                }}
                aria-label="Open cart"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
            </button>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${showCart ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setShowCart(false)}
            ></div>

            {/* Cart Drawer */}
            <div
                className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-gradient-to-br from-[#4b3621] to-[#6b4c2a] shadow-2xl flex flex-col transition-transform duration-500 transform z-50 ${showCart ? 'translate-x-0' : 'translate-x-full'} rounded-l-2xl`}
            >
                <div className="flex items-center justify-between p-4 border-b border-orange-200/30">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                        </svg>
                        Your Cart
                    </h2>
                    <button
                        className="text-orange-200 hover:text-white text-3xl font-light transition-colors"
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
                                className="relative bg-orange-500/10 backdrop-blur-sm border border-orange-200/20 rounded-xl p-3 shadow-lg"
                            >
                                <div className="flex items-center justify-between gap-3 py-2">
                                    {/* Image + name + price */}
                                    <div className="flex items-center gap-3 min-w-0">
                                        <img
                                            src={item.productId.image}
                                            alt={item.productId.name}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
                                        />
                                        <div className="leading-tight truncate">
                                            <h3 className="text-sm font-medium text-white truncate max-w-[120px]">
                                                {item.productId.name}
                                            </h3>
                                            <p className="text-xs text-orange-200">₹{item.productId.price}</p>
                                        </div>
                                    </div>

                                    {/* Quantity control */}
                                    <div className="flex items-center justify-center gap-2 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-300/50 text-orange-200 font-semibold text-sm">
                                        <button
                                            className="px-1 text-lg hover:text-white transition-colors"
                                            onClick={() => updateQty(item.productId._id, 'dec')}
                                        >−</button>
                                        <span className="min-w-[16px] text-center">{item.qty}</span>
                                        <button
                                            className="px-1 text-lg hover:text-white transition-colors"
                                            onClick={() => updateQty(item.productId._id, 'inc')}
                                        >+</button>
                                    </div>

                                    {/* Delete button */}
                                    <MdDelete
                                        className="text-xl text-orange-300 hover:text-white cursor-pointer transition-colors"
                                        onClick={() => deleteItem(item.productId._id)}
                                    />

                                    {/* Total */}
                                    <div className="text-base font-semibold text-white min-w-[60px] text-right">
                                        ₹{item.productId.price * item.qty}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/20 rounded-full mb-4">
                                <svg className="w-8 h-8 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                                </svg>
                            </div>
                            <p className="text-orange-200 text-lg">Your cart is empty</p>
                        </div>
                    )}
                </div>

                {/* Checkout */}
                <div className="p-4 border-t border-orange-200/30">
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-lg font-semibold text-white">Total:</p>
                        <p className="text-xl font-bold text-orange-300">
                            ₹
                            {cartData
                                .reduce((total, item) => total + item.productId.price * item.qty, 0)
                                .toFixed(2)}
                        </p>
                    </div>
                    <Link to={`/user/${_id}/checkout`}>
                        <button className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-3 rounded-xl text-base transition duration-300 hover:scale-105 shadow-lg">
                            Proceed to Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default CartButton;
