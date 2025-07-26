import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const MealType = (props) => {
    const [mealType, setMealType] = useState("all");
    const [allProducts, setAllProducts] = useState([]); // To store all products fetched initially
    const [displayedProducts, setDisplayedProducts] = useState([]); // To store products filtered by mealType
    const abortControllerRef = useRef(null);

    // Effect to fetch all products only once when the component mounts
    useEffect(() => {
        const fetchAllProducts = async () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            abortControllerRef.current = new AbortController();
            try {
                const res = await axios.get(`http://localhost:5000/products/all`, {
                    signal: abortControllerRef.current.signal
                });
                console.log("All products fetched:", res.data); // Log all fetched data
                setAllProducts(res.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Request cancelled', error.message);
                } else {
                    console.error('Error fetching all products:', error);
                }
            }
        };

        fetchAllProducts();

        // Cleanup function for the initial fetch
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
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
        if (props.a && typeof props.a === 'function') {
            props.a(displayedProducts);
        }
    }, [displayedProducts, props.a]); // Only depend on the function reference

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