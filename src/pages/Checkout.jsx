import React, { useEffect, useState } from 'react';
import Head from '../components/Head';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart, FaCreditCard, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const RENDER_WEBSITE_LINK = import.meta.env.VITE_RENDER_WEBSITE_LINK;

const Checkout = () => {
    const { user } = useAuth();
    const _id = user?._id;
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddress, setShowAddress] = useState(true);
    const navigate = useNavigate();

    const handleOrder = async () => {
        if (!selectedAddress) {
            return alert("please select an address");
        }
        if (cart.length === 0) {
            return alert("please add items to cart");
        }
        try {
            await axios.post(
                `${RENDER_WEBSITE_LINK}/user/${_id}/cart/order`,
                { addressId: selectedAddress, paidAmount: toPay },
                { withCredentials: true }
            );
            navigate('/menu')

        } catch (error) {
            alert("Failed to place order.");
            console.error(error);
        }
    };

    const fetchAddress = async () => {
        try {
            const res = await axios.get(`${RENDER_WEBSITE_LINK}/user/${_id}`, {
                withCredentials: true,
            });

            if (res.data?.addresses && Array.isArray(res.data.addresses)) {
                setCart(res.data.cart);
                setAddress(res.data.addresses);
            } else {
                setCart([]);
                setAddress([]);
            }
        } catch (error) {
            console.error('Error fetching address:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAddress();
    }, []);

    const total = cart.reduce((acc, item) => acc + item.productId.price * item.qty, 0);
    const deliveryCharge = 50;
    const discount = 0;
    const tax = total * 0.05;
    const toPay = (total + deliveryCharge + discount + tax).toFixed(2);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
                    <p className="text-gray-400 font-medium text-lg">Loading your cart...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-orange-500/30">
            {/* Header - Sticky */}
            <div className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
                <Head />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
                        Checkout
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Review your order and complete your purchase
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Address & Payment (Span 2) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Address Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-gray-700 shadow-xl"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold flex items-center gap-3 text-white">
                                    <FaMapMarkerAlt className="text-orange-500" />
                                    Delivery Address
                                </h3>
                                <div className="flex gap-4 text-sm">
                                    <Link
                                        to={`/user/${_id}/saveaddress`}
                                        className="text-orange-500 hover:text-orange-400 font-medium transition"
                                    >
                                        + Add New
                                    </Link>
                                </div>
                            </div>

                            {address.length === 0 ? (
                                <div className="text-center py-8 border-2 border-dashed border-gray-700 rounded-2xl">
                                    <p className="text-gray-400 mb-4">No delivery address found.</p>
                                    <Link to={`/user/${_id}/saveaddress`} className="text-orange-500 hover:underline">Add an address</Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {address.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedAddress(item._id)}
                                            className={`cursor-pointer relative p-5 rounded-2xl border-2 transition-all duration-200 group ${selectedAddress === item._id
                                                    ? 'border-orange-500 bg-orange-500/10'
                                                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-lg text-white group-hover:text-orange-400 transition">{item.name}</h4>
                                                {selectedAddress === item._id && (
                                                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">SELECTED</span>
                                                )}
                                            </div>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                {item.buildingNumber}, {item.landmark}<br />
                                                {item.city}, {item.district}<br />
                                                {item.state} - {item.pincode}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Order Items */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-gray-700 shadow-xl"
                        >
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                                <FaShoppingCart className="text-orange-500" />
                                Order Items
                            </h3>

                            {cart.length === 0 ? (
                                <p className="text-gray-400 text-center py-6">Your cart is empty.</p>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <div
                                            key={item.productId._id}
                                            className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-2xl border border-gray-700/50 hover:border-gray-600 transition"
                                        >
                                            <img
                                                src={item.productId.image}
                                                alt={item.productId.name}
                                                className="w-20 h-20 object-cover rounded-xl shadow-lg"
                                            />
                                            <div className="flex-grow">
                                                <h4 className="text-lg font-bold text-white mb-1">{item.productId.name}</h4>
                                                <div className="flex items-center text-sm text-gray-400 gap-4">
                                                    <span>₹{item.productId.price} x {item.qty}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-lg font-bold text-orange-400">
                                                    ₹{item.productId.price * item.qty}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Right Column: Order Summary (Sticky) */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="sticky top-24 bg-gray-800/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-gray-700 shadow-2xl"
                        >
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white border-b border-gray-700 pb-4">
                                <FaCreditCard className="text-orange-500" />
                                Payment Summary
                            </h3>
                            <div className="space-y-4 text-gray-300">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="text-white font-medium">₹{total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Fee</span>
                                    <span className="text-white font-medium">₹{deliveryCharge}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (5%)</span>
                                    <span className="text-white font-medium">₹{tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-green-400">
                                    <span>Discount</span>
                                    <span>- ₹{discount}</span>
                                </div>
                                <div className="h-px bg-gray-700 my-2"></div>
                                <div className="flex justify-between text-2xl font-bold text-white">
                                    <span>Total</span>
                                    <span>₹{toPay}</span>
                                </div>
                            </div>

                            <button
                                disabled={cart.length === 0}
                                onClick={handleOrder}
                                className={`w-full mt-8 py-4 rounded-xl text-lg font-bold shadow-lg transform transition duration-200 ${cart.length === 0
                                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98]'
                                    }`}
                            >
                                Pay ₹{toPay}
                            </button>

                            <p className="text-xs text-center text-gray-500 mt-4">
                                Secure Payment powered by Razorpay
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
