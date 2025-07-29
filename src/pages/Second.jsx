import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Head from '../components/Head';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { VITE_PUBLIC_API_URL } from '../config';


const Second = () => {
    const { _id } = useParams(); // or productName, depending on your route
    const [single, setSingle] = useState();
    const [quantity, setQuantity] = useState(1);
    const { user, loading } = useAuth();
    const userId = user?._id;


    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`${VITE_PUBLIC_API_URL}/products/details/${_id}`);
            setSingle(res.data);
        };
        fetchProduct();
    }, []);

    const addcart = async () => {
        await axios.post(`${VITE_PUBLIC_API_URL}/products/cart/${userId}/add?qty=${quantity}&pro=${_id}`, {}, { withCredentials: true });
        
    };



    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Checking authentication...</div>;
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Prevent error by checking for null
    if (!single) return <div>Loading...</div>;

    return (
        <>
            <div className='sticky top-0 z-50 bg-white shadow-md'>
                <Head />
            </div>
            <div
                className="min-h-screen py-10 flex items-center justify-center"
                style={{
                    backgroundImage: "url('/image/bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-md text-white rounded-2xl p-8 shadow-2xl flex flex-col md:flex-row items-center gap-8 min-h-[600px]">
                    {/* Product Image */}
                    <div className="flex-shrink-0 flex justify-center w-full md:w-auto">
                        <img
                            src={single[0].image}
                            alt={single[0].name}
                            className="w-[32rem] h-[32rem] object-cover rounded-2xl border-4 border-white shadow-lg"
                        />
                    </div>
                    {/* Product Details */}
                    <div className="flex flex-col flex-grow gap-4 text-center md:text-left w-full">
                        <div className="text-3xl font-bold">{single[0].name}</div>
                        <div className="inline-block bg-gray-400 text-gray-900 px-4 py-1 rounded-full text-lg font-medium w-fit mx-auto md:mx-0">
                            {single[0].cuisine}
                        </div>
                        <div className="flex justify-center md:justify-start">
                            <span className="bg-red-500 text-white text-lg font-bold px-4 py-1 rounded-lg">
                                ₹{single[0].price}
                            </span>
                        </div>
                        <div className="text-gray-200 text-base bg-white/20 rounded-xl p-4 shadow-inner">
                            {single[0].description}
                        </div>
                        {/* Category tags */}
                        {single[0].category && (
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
                                {single[0].category.map((item, i) => (
                                    <span key={i} className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold shadow">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        )}
                        {/* Features */}
                        <div className="flex flex-col gap-1 mt-2 text-gray-100">
                            <div className="flex items-center gap-2"><span className="text-green-300">✔</span> Premium Quality</div>
                            <div className="flex items-center gap-2"><span className="text-green-300">✔</span> Fresh Ingredients</div>
                            <div className="flex items-center gap-2"><span className="text-green-300">✔</span> Traditional Way of Making</div>
                        </div>
                        {/* Quantity and Add to Cart (plus/minus buttons) */}
                        <div className="mt-4 flex gap-4 items-center justify-center md:justify-start bg-white/20 p-3 rounded-xl shadow-inner w-fit mx-auto md:mx-0">
                            <div>
                                <button
                                    className="bg-gray-300 hover:bg-gray-400 text-xl px-3 py-1 rounded-l-lg font-bold text-gray-800"
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    aria-label="Decrease quantity"
                                >
                                    -
                                </button>
                                <span className="px-4 py-2 border-t border-b text-lg bg-white text-gray-900">{quantity}</span>
                                <button
                                    className="bg-gray-300 hover:bg-gray-400 text-xl px-3 py-1 rounded-r-lg font-bold text-gray-800"
                                    onClick={() => setQuantity(q => Math.min(5, q + 1))}
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>

                            <button onClick={() => {
                                addcart();
                            }}
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow transition">Add to Cart</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Second;