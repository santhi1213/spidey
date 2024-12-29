import React, { useState, useEffect } from "react";

const categories = [
    { id: "idly", label: "Idly Batter" },
    { id: "dosa", label: "Dosa Batter" },
    { id: "pesara", label: "Pesara Batter" },
    { id: "bobbara", label: "Bobbara Batter" },
];

const ProductReturn = ({ isSidebarOpen }) => {
    const [selectedClient, setSelectedClient] = useState('');
    const [displayCategories, setDisplayCategories] = useState(false);

    const handleClientChange = (event) => {
        setSelectedClient(event.target.value);
    };

    useEffect(() => {
        setDisplayCategories(selectedClient && selectedClient !== "#");
    }, [selectedClient]);

    return (
        <div className={`${isSidebarOpen ? "ml-16 w-[96%]" : "ml-64 w-[83%]"} transition-all`}>
            <div className="mt-12">
                <form onSubmit={(e) => e.preventDefault()} className="shadow-lg p-4 w-[50%] justify-self-center border border-gray-300 rounded-md">
                    <div className="text-center">
                        <h1 className="text-lg font-bold text-green-700">Product Return</h1>
                    </div>
                    <div className="mt-6 w-[70%] mx-auto">
                        <label htmlFor="client" className="block font-medium mb-2">Select Client</label>
                        <select
                            name="client"
                            id="client"
                            onChange={handleClientChange}
                            className="border border-gray-400 p-2 rounded w-full"
                        >
                            <option value="#">--Select--</option>
                            <option value="shop1">Shop1</option>
                            <option value="shop2">Shop2</option>
                            <option value="shop3">Shop3</option>
                        </select>
                    </div>
                    {displayCategories && (
                        <>
                            <div className="mt-6 border grid grid-cols-2 gap-x-4 gap-y-6 p-4 shadow-lg">
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center">
                                        <label htmlFor={category.id} className="flex-1 text-gray-700 font-medium">
                                            {category.label}:
                                        </label>
                                        <input
                                            type="number"
                                            className="flex-1 border border-gray-400 rounded-md p-2 w-[70%]"
                                            id={category.id}
                                            placeholder="Enter quantity"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="mt-6 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
                                >
                                    Submit
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ProductReturn;
