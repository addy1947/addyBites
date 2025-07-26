import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Head from '../components/Head'
import MealType from '../components/MealType'

const First = () => {
    const [data, setData] = useState([]);

    // Debug log to see when data changes
    console.log('First component data updated:', data);

    return (
        <>
            <div className="sticky top-0 z-50 bg-white shadow-md">
                <Head a={setData} />
                <MealType a={setData} />
            </div>
            <div className="mt-4">
                <div
                    className="py-10"
                    style={{
                        backgroundImage: "url('/image/bg.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="max-w-screen-xl mx-auto px-4 sm:px-10 pt-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                            {data.map((item) => (
                                <Link key={item._id} to={"/details/" + item._id} className="h-full">
                                    <div className="flex items-stretch gap-4 bg-white/10 backdrop-blur-md text-white rounded-xl p-4 shadow-lg cursor-pointer hover:bg-white/20 transition h-full">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-24 h-24 object-cover rounded-full border-2 border-white"
                                            />
                                        </div>
                                        <div className="flex flex-col flex-grow text-center sm:text-left justify-between">
                                            <div>
                                                <div className="text-lg font-semibold mb-2">{item.name}</div>
                                                <div className="text-sm text-gray-300 leading-relaxed">
                                                    {item.description.length > 80 ? item.description.substring(0, 80) + '...' : item.description}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 self-start">
                                            <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
                                                ₹{item.price}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default First;
