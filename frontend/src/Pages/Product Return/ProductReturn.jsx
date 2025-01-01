import React, { useState, useEffect } from "react";

const categories = [
    { id: "idlyBatter", label: "Idly Batter", type: "number" },
    { id: "dosaBatter", label: "Dosa Batter", type: "number" },
    { id: "pesaraBatter", label: "Pesara Batter", type: "number" },
    { id: "bobbaraBatter", label: "Bobbara Batter", type: "number" },
    { id: "date", label: "Date", type: "date" },
];

const ProductHandover = ({ isSidebarOpen }) => {
    const [selectedClient, setSelectedClient] = useState('');
    const [displayCategories, setDisplayCategories] = useState(false);
    const currentDate = new Date().toISOString().slice(0, 10);
    const [apiData, setApiData]= useState([])
    const [formData, setFormData] = useState({
        clientName: '',
        idlyBatter: '',
        dosaBatter: '',
        pesaraBatter: '',
        bobbaraBatter: '',
        date: currentDate,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const uploadItems = async (e) => {
        e.preventDefault();
        if (!formData.clientName || formData.clientName === "#") {
            alert('Please select a client');
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch("http://localhost:5001/returnproduct", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error( errorData.message);
                alert(errorData.message);
                return;
            }
            const data = await response.json();
            alert('Data Updated Successfully');
            console.log(data);            
            setFormData({
                clientName: '',
                idlyBatter: '',
                dosaBatter: '',
                pesaraBatter: '',
                bobbaraBatter: '',
                date: currentDate,
            });
            setSelectedClient('');
        } catch (err) {
            console.error('Error:', err.message);
            alert(err.message)
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleClientChange = (event) => {
        const value = event.target.value;
        setSelectedClient(value);
        setFormData((prevData) => ({
            ...prevData,
            clientName: value,
        }));
    };
     const AllUsers = async()=>{
            try{
                const response = await fetch('http://localhost:5001/users');
                if(!response){
                    console.log(err.message)
                }
                const data = await response.json();
                setApiData(data.reverse());
                console.log(data);
            }catch(err){
                console.log(err.message);
                alert(err.message)
            }
        }
    
        useEffect(()=>{
            AllUsers();
        },[])

    useEffect(() => {
        setDisplayCategories(selectedClient && selectedClient !== "#");
    }, [selectedClient]);

    return (
        <div className={`${isSidebarOpen ? "ml-16 w-[96%]" : "ml-64 w-[83%]"} transition-all`}>
            <div className="mt-12">
                <form
                    onSubmit={uploadItems}
                    className="shadow-lg p-4 w-[50%] justify-self-center border border-gray-300 rounded-md"
                >
                    <div className="text-center">
                        <h1 className="text-lg font-bold text-green-700">Product Return</h1>
                    </div>
                    <div className="mt-6 w-[70%] mx-auto">
                        <label htmlFor="client" className="block font-medium mb-2">
                            Select Client
                        </label>
                        <select
                            name="clientName"
                            id="client"
                            value={formData.clientName}
                            onChange={handleClientChange}
                            className="border border-gray-400 p-2 rounded w-full"
                        >
                            <option value="#">--Select--</option>
                            {apiData.map((item, index)=>(
                                <option value={item.userName}>{item.userName}</option>
                            ))}
                        </select>
                    </div>
                    {displayCategories && (
                        <>
                            <div className="mt-6 border grid grid-cols-2 gap-x-4 gap-y-6 p-4 shadow-lg">
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center">
                                        <label
                                            htmlFor={category.id}
                                            className="flex-1 text-gray-700 font-medium"
                                        >
                                            {category.label}:
                                        </label>
                                        <input
                                            type={category.type}
                                            name={category.id}
                                            className="flex-1 border border-gray-400 rounded-md p-2 w-[70%]"
                                            id={category.id}
                                            onChange={handleChange}
                                            placeholder={
                                                category.type === "number"
                                                    ? "Enter quantity"
                                                    : "Select date"
                                            }
                                            value={formData[category.id]}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`mt-6 ${
                                        isSubmitting
                                            ? "bg-gray-400"
                                            : "bg-green-700 hover:bg-green-800"
                                    } text-white px-4 py-2 rounded`}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ProductHandover;
