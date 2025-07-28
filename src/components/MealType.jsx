import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { VITE_PUBLIC_API_URL } from '../config';

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
                const res = await axios.get(`${VITE_PUBLIC_API_URL}/products/all`, {
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
    useEffect(() => {
        const { a } = props;
        if (a && typeof a === 'function') {
            // Ensure we always pass an array
            a(Array.isArray(displayedProducts) ? displayedProducts : []);
        }
    }, [displayedProducts, props]); // Destructure props to avoid exhaustive-deps warning

    return (
        <>
            <div className="z-50 bg-white shadow-lg">
                <div className="bg-gray-300 flex flex-wrap items-center gap-3 justify-center p-6">
                    <button onClick={() => setMealType("all")} className="bg-red-600 text-white rounded-[5px] px-4 py-2 shadow-md hover:bg-red-700 transition">All</button>
                    <button onClick={() => setMealType("breakfast")} className="bg-red-600 text-white rounded-[5px] px-4 py-2 shadow-md hover:bg-red-700 transition">Breakfast</button>
                    <button onClick={() => setMealType("lunch")} className="bg-red-600 text-white rounded-[5px] px-4 py-2 shadow-md hover:bg-red-700 transition">Lunch</button>
                    <button onClick={() => setMealType("snack")} className="bg-red-600 text-white rounded-[5px] px-4 py-2 shadow-md hover:bg-red-700 transition">Evening Snack</button>
                    <button onClick={() => setMealType("dinner")} className="bg-red-600 text-white rounded-[5px] px-4 py-2 shadow-md hover:bg-red-700 transition">Dinner</button>
                </div>
            </div>
        </>
    );
};

export default MealType;