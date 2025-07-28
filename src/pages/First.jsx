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
                                <div className="col-span-full text-center text-white text-lg py-8">
                                    {Array.isArray(data) ? "No products found" : "Loading products..."}
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
