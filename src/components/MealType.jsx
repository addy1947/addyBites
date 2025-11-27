import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const RENDER_WEBSITE_LINK = import.meta.env.VITE_RENDER_WEBSITE_LINK;

const MealType = (props) => {
    const [mealType, setMealType] = useState("all");
    const [allProducts, setAllProducts] = useState([]); // To store all products fetched initially
    const [displayedProducts, setDisplayedProducts] = useState([]); // To store products filtered by mealType
    const abortControllerRef = useRef(null);

    // Effect to fetch all products only once when the component mounts
    useEffect(() => {
        const controller = new AbortController();
        abortControllerRef.current = controller;

        const fetchAllProducts = async () => {
            try {
                const res = await axios.get(`${RENDER_WEBSITE_LINK}/products/all`, {
                    signal: controller.signal
                });

                setAllProducts(res.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    // Request was cancelled
                } else {
                    console.error('Error fetching all products:', error);
                }
            }
        };

        fetchAllProducts();

        // Cleanup function for the initial fetch
        return () => {
            controller.abort();
        };
    }, []); // Empty dependency array means this runs only once on mount

    // Effect to filter products whenever mealType or allProducts changes
    useEffect(() => {
        if (mealType === "all") {
            setDisplayedProducts(allProducts);
        } else {
            // Assuming each product in `allProducts` has a 'mealType' property
            const filtered = allProducts.filter(product => product.mealType === mealType);
            setDisplayedProducts(filtered);
        }
    }, [mealType, allProducts]);

    // Effect to pass the displayed products to the parent component
    const { a } = props;

    useEffect(() => {
        if (a && typeof a === 'function') {
            a(Array.isArray(displayedProducts) ? displayedProducts : []);
        }
    }, [displayedProducts, a]); // cleaner and avoids exhaustive-deps warning


    const categories = [
        { id: 'all', label: 'All' },
        { id: 'breakfast', label: 'Breakfast' },
        { id: 'lunch', label: 'Lunch' },
        { id: 'snack', label: 'Snacks' },
        { id: 'dinner', label: 'Dinner' },
    ];

    return (
        <div className="sticky top-[73px] z-40 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-center gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setMealType(cat.id)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${mealType === cat.id
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 scale-105'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MealType;