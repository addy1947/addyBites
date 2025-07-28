import React, { useEffect, useState } from 'react';
import Head from '../components/Head';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart, FaCreditCard } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { VITE_PUBLIC_API_URL } from '../config';    
import { useNavigate } from 'react-router-dom';



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
                `${VITE_PUBLIC_API_URL}/user/${_id}/cart/order`,
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
            const res = await axios.get(`${VITE_PUBLIC_API_URL}/user/${_id}`, {
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
            <div className="min-h-screen flex items-center justify-center bg-white">
                <p className="text-gray-600 text-lg animate-pulse">Loading your data...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
            <Head />
            <div className="max-w-6xl mx-auto px-4 py-6">
                <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3 mb-8">
                    <FaShoppingCart className="text-green-600 text-3xl" />
                    Checkout
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Section */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Cart Items */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">🛍️ Your Items</h3>
                            {cart.length === 0 ? (
                                <p className="text-gray-500 text-center">Your cart is empty.</p>
                            ) : (
                                cart.map((item) => (
                                    <div
                                        key={item.productId._id}
                                        className="flex items-center justify-between border-b border-gray-100 py-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={item.productId.image}
                                                alt={item.productId.name}
                                                className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                                            />
                                            <div>
                                                <h4 className="text-lg font-medium text-gray-800">
                                                    {item.productId.name}
                                                </h4>
                                                <p className="text-sm text-gray-500">₹{item.productId.price}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                                            <p className="text-md font-semibold text-green-700">
                                                ₹{item.productId.price * item.qty}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Address Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-semibold text-gray-800">📍 Delivery Address</h3>
                                <Link to={`/user/${_id}/saveaddress`}>Add New Address</Link>
                                <button
                                    onClick={() => setShowAddress(!showAddress)}
                                    className="text-blue-600 hover:underline font-medium text-sm"
                                >
                                    {showAddress ? 'Hide Address' : 'Show Address'}
                                </button>
                            </div>

                            {showAddress && (
                                address.length === 0 ? (
                                    <p className="text-gray-500 text-center">No address found.</p>
                                ) : (
                                    <div className="space-y-6">
                                        {address.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`rounded-xl p-5 border transition-shadow duration-200 ${selectedAddress === item._id
                                                    ? 'border-blue-500 shadow-lg'
                                                    : 'border-gray-200 shadow-md hover:shadow-lg'
                                                    }`}
                                            >
                                                <div className="space-y-1">
                                                    <p className="text-base text-gray-700"><span className="font-semibold">Name:</span> {item.name}</p>
                                                    <p className="text-sm text-gray-600"><span className="font-medium">Building:</span> {item.buildingNumber}</p>
                                                    <p className="text-sm text-gray-600"><span className="font-medium">Landmark:</span> {item.landmark}</p>
                                                    <p className="text-sm text-gray-600"><span className="font-medium">City:</span> {item.city}</p>
                                                    <p className="text-sm text-gray-600"><span className="font-medium">District:</span> {item.district}</p>
                                                    <p className="text-sm text-gray-600"><span className="font-medium">State:</span> {item.state}</p>
                                                    <p className="text-sm text-gray-600"><span className="font-medium">Pincode:</span> {item.pincode}</p>
                                                </div>
                                                <button
                                                    onClick={() => setSelectedAddress(item._id)}
                                                    className={`mt-4 px-4 py-2 rounded-md font-medium text-white ${selectedAddress === item._id
                                                        ? 'bg-blue-600'
                                                        : 'bg-blue-500 hover:bg-blue-600'
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

                    {/* Right Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <FaCreditCard className="text-purple-600" />
                            Payment Summary
                        </h3>
                        <div className="space-y-2 text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery</span>
                                <span>₹{deliveryCharge}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discount</span>
                                <span>- ₹{discount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (5%)</span>
                                <span>₹{tax.toFixed(2)}</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>₹{toPay}</span>
                            </div>
                            <button
                                disabled={cart.length === 0}
                                className={`w-full mt-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl shadow transition duration-300 ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handleOrder}
                            >
                                Proceed to Pay ₹{toPay}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
