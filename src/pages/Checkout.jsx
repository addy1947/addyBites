import React, { useEffect, useState } from 'react';
import Head from '../components/Head';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart, FaCreditCard } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
            navigate('/')
            
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
                        <p className="text-white font-semibold text-lg">Loading your cart...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            {/* Header - Sticky only for tablets/desktops */}
            <div className="bg-white shadow-md md:sticky md:top-0 md:z-50">
                <Head />
            </div>

            {/* Main scrollable section with smooth behavior */}
            <div className="mt-4 scroll-smooth">
                <div
                    className="min-h-screen py-8 sm:py-10"
                    style={{
                        backgroundImage: "url('/image/bg.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 pt-6 sm:pt-10">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                                Your Cart
                            </h2>
                            <p className="text-gray-200 text-sm">
                                Review your items and proceed to checkout
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Payment Summary - Top Left */}
                            <div className="bg-gradient-to-br from-[#4b3621] to-[#6b4c2a] backdrop-blur-sm text-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <FaCreditCard className="text-white" />
                                    Payment Summary
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-orange-200">Subtotal</span>
                                        <span>₹{total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-orange-200">Delivery</span>
                                        <span>₹{deliveryCharge}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-orange-200">Discount</span>
                                        <span>- ₹{discount}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-orange-200">Tax (5%)</span>
                                        <span>₹{tax.toFixed(2)}</span>
                                    </div>
                                    <hr className="my-3 border-orange-200/30" />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>₹{toPay}</span>
                                    </div>
                                    <button
                                        disabled={cart.length === 0}
                                        className={`w-full mt-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                                            cart.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:from-orange-500 hover:to-orange-600'
                                        }`}
                                        onClick={handleOrder}
                                    >
                                        Proceed to Pay ₹{toPay}
                                    </button>
                                </div>
                            </div>

                            {/* Address Section - Top Right */}
                            <div className="bg-gradient-to-br from-[#4b3621] to-[#6b4c2a] backdrop-blur-sm text-white rounded-xl p-6 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Delivery Address
                                    </h3>
                                    <div className="flex gap-2">
                                        <Link 
                                            to={`/user/${_id}/saveaddress`}
                                            className="text-orange-200 hover:text-white text-sm underline"
                                        >
                                            Add New
                                        </Link>
                                        <button
                                            onClick={() => setShowAddress(!showAddress)}
                                            className="text-orange-200 hover:text-white text-sm underline"
                                        >
                                            {showAddress ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                </div>

                                {showAddress && (
                                    address.length === 0 ? (
                                        <p className="text-orange-200 text-center py-4">No address found.</p>
                                    ) : (
                                        <div className="space-y-4">
                                            {address.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className={`rounded-lg p-4 border-2 transition-all duration-200 ${
                                                        selectedAddress === item._id
                                                            ? 'border-orange-300 shadow-lg bg-orange-500/20'
                                                            : 'border-orange-200/30 hover:border-orange-300/50'
                                                    }`}
                                                >
                                                    <div className="space-y-2 text-sm">
                                                        <p className="font-semibold">{item.name}</p>
                                                        <p className="text-orange-200">{item.buildingNumber}, {item.landmark}</p>
                                                        <p className="text-orange-200">{item.city}, {item.district}</p>
                                                        <p className="text-orange-200">{item.state} - {item.pincode}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => setSelectedAddress(item._id)}
                                                        className={`mt-3 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                                            selectedAddress === item._id
                                                                ? 'bg-orange-400 text-white'
                                                                : 'bg-orange-200/20 text-orange-200 hover:bg-orange-300/30'
                                                        }`}
                                                    >
                                                        {selectedAddress === item._id ? 'Selected' : 'Choose Address'}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Cart Items - Bottom Full Width */}
                        <div className="bg-gradient-to-br from-[#4b3621] to-[#6b4c2a] backdrop-blur-sm text-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <FaShoppingCart className="text-white" />
                                Your Items
                            </h3>
                            {cart.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/20 rounded-full mb-4">
                                        <FaShoppingCart className="w-8 h-8 text-orange-300" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                                    <p className="text-orange-200">Add some delicious items to get started!</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {cart.map((item) => (
                                        <div
                                            key={item.productId._id}
                                            className="bg-orange-500/10 backdrop-blur-sm text-white rounded-xl p-4 shadow-lg transition hover:shadow-xl border border-orange-200/20"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={item.productId.image}
                                                        alt={item.productId.name}
                                                        className="w-16 h-16 object-cover rounded-full border-2 border-orange-200"
                                                    />
                                                </div>
                                                <div className="flex flex-col flex-grow">
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="text-base font-semibold">{item.productId.name}</h3>
                                                        <span className="bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
                                                            ₹{item.productId.price * item.qty}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center mt-2">
                                                        <p className="text-sm text-orange-200">
                                                            ₹{item.productId.price} each
                                                        </p>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm text-orange-200">Qty:</span>
                                                            <span className="bg-orange-200/20 text-white px-2 py-1 rounded text-sm font-semibold">
                                                                {item.qty}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
