import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaSortAmountDown, FaSortAmountUp, FaSortAlphaDown } from 'react-icons/fa';

const RENDER_WEBSITE_LINK = import.meta.env.VITE_RENDER_WEBSITE_LINK;

const MealType = (props) => {
    const [mealType, setMealType] = useState("all");
    const [sortType, setSortType] = useState("default"); // default, low-high, high-low, a-z
    const [allProducts, setAllProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [showSortMenu, setShowSortMenu] = useState(false);
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

        return () => {
            controller.abort();
        };
    }, []);

    // Effect to filter AND sort products
    useEffect(() => {
        let filtered = [];

        // 1. Filter by Category
        if (mealType === "all") {
            filtered = [...allProducts];
        } else {
            filtered = allProducts.filter(product => product.mealType === mealType);
        }

        // 2. Sort
        if (sortType === "low-high") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortType === "high-low") {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortType === "a-z") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        setDisplayedProducts(filtered);
    }, [mealType, sortType, allProducts]);

    // Pass data to parent
    const { a } = props;
    useEffect(() => {
        if (a && typeof a === 'function') {
            a(Array.isArray(displayedProducts) ? displayedProducts : []);
        }
    }, [displayedProducts, a]);

    const categories = [
        { id: 'all', label: 'All' },
        { id: 'breakfast', label: 'Breakfast' },
        { id: 'lunch', label: 'Lunch' },
        { id: 'snack', label: 'Snacks' },
        { id: 'dinner', label: 'Dinner' },
    ];

    const sortOptions = [
        { id: 'default', label: 'Default', icon: null },
        { id: 'low-high', label: 'Price: Low to High', icon: <FaSortAmountUp /> },
        { id: 'high-low', label: 'Price: High to Low', icon: <FaSortAmountDown /> },
        { id: 'a-z', label: 'Name: A-Z', icon: <FaSortAlphaDown /> },
    ];

    return (
        <div className="sticky top-[73px] z-40 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Categories */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setMealType(cat.id)}
                                className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${mealType === cat.id
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 scale-105'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Sorting Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowSortMenu(!showSortMenu)}
                            className="flex items-center gap-2 px-5 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 hover:text-white transition-colors border border-gray-700"
                        >
                            <span className="text-sm font-medium">Sort By</span>
                            <svg className={`w-4 h-4 transition-transform duration-200 ${showSortMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {showSortMenu && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowSortMenu(false)}></div>
                                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-xl border border-gray-700 z-20 overflow-hidden">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => {
                                                setSortType(option.id);
                                                setShowSortMenu(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 text-sm flex items-center gap-2 hover:bg-gray-700 transition-colors ${sortType === option.id ? 'text-orange-500 bg-gray-700/50' : 'text-gray-300'
                                                }`}
                                        >
                                            {option.icon && <span className="text-base">{option.icon}</span>}
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealType;