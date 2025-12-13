import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Head from '../components/Head';
import MealType from '../components/MealType';
import { motion } from 'framer-motion';

const First = () => {
    const [data, setData] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(true);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
            {/* Header - Sticky */}
            <Head a={setData} setLoading={setLoading} />
            <MealType a={setData} setLoading={setLoading} />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {loading ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-gray-700 rounded-full"></div>
                                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <p className="text-gray-300 font-semibold text-lg">Loading deliciousness...</p>
                        </div>
                    ) : Array.isArray(data) && data.length > 0 ? (
                        data.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <Link to={"/details/" + item._id} className="group block h-full">
                                    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-orange-500/20 transition-all duration-300 h-full flex flex-col border border-gray-700 group-hover:border-orange-500/50">
                                        <div className="relative overflow-hidden h-48">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                                ₹{item.price}
                                            </div>
                                        </div>
                                        <div className="p-5 flex flex-col flex-grow">
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">{item.name}</h3>
                                            <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">
                                                {item.description}
                                            </p>
                                            <div className="flex items-center justify-between mt-auto">
                                                <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">View Details</span>
                                                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <div className="flex flex-col items-center gap-4">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.57M15 6.343A7.962 7.962 0 0112 5c-2.34 0-4.29 1.009-5.824 2.57" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-300">No products found</h3>
                                <p className="text-gray-500">Try adjusting your filters or check back later</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default First;
