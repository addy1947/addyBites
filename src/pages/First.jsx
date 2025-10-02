import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Head from '../components/Head';
import MealType from '../components/MealType';

const First = () => {
    const [data, setData] = useState([]);

    return (
        <>
            {/* Header - Sticky only for tablets/desktops */}
            <div className="bg-white shadow-md md:sticky md:top-0 md:z-50">
                <Head a={setData} />
                <MealType a={setData} />
            </div>

            {/* Main scrollable section with smooth behavior */}
            <div className="mt-4 scroll-smooth">
                <div
                    className="py-8 sm:py-10"
                    style={{
                        backgroundImage: "url('/image/bg.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 pt-6 sm:pt-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {Array.isArray(data) && data.length > 0 ? (
                                data.map((item) => (
                                    <Link key={item._id} to={"/details/" + item._id}>
                                        <div className="flex items-start gap-4 bg-[#4b3621] text-white rounded-xl p-4 shadow-md transition hover:shadow-lg sm:flex-row">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded-full border-2 border-white"
                                                />
                                            </div>
                                            <div className="flex flex-col flex-grow">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-base font-semibold">{item.name}</h3>
                                                    <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
                                                        ₹{item.price}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-300 mt-1">
                                                    {item.description.length > 80
                                                        ? item.description.substring(0, 80) + '...'
                                                        : item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-full text-center text-white py-8">
                                    {Array.isArray(data) ? (
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full">
                                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.57M15 6.343A7.962 7.962 0 0112 5c-2.34 0-4.29 1.009-5.824 2.57" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-semibold">No products found</h3>
                                            <p className="text-gray-200">Try adjusting your filters or check back later</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="relative">
                                                <div className="w-16 h-16 border-4 border-white/20 rounded-full"></div>
                                                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                            <p className="text-white font-semibold text-lg">Loading products...</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default First;
