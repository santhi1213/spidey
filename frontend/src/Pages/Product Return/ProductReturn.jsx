import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import ProductReturnModal from "../../components/Modals/ProductReturnModal";

const categories = [
    { id: "idlyBatter", label: "Idly Batter", type: "number" },
    { id: "dosaBatter", label: "Dosa Batter", type: "number" },
    { id: "pesaraBatter", label: "Pesara Batter", type: "number" },
    { id: "bobbaraBatter", label: "Bobbara Batter", type: "number" },
    { id: "date", label: "Date", type: "date" },
];

const ProductHandover = ({ isSidebarOpen }) => {
    const [selectedClient, setSelectedClient] = useState('');
    const [isModalOpen, setIsModalOpen ] = useState(false);
        const [modalData, seetModalData] = useState()
    const [displayCategories, setDisplayCategories] = useState(false);
    const currentDate = new Date().toISOString().slice(0, 10);
    const [apiData, setApiData] = useState([]);
    const [ItemsData, setItemsData] = useState([]);
    const [formData, setFormData] = useState({
        clientName: '',
        idlyBatter: '',
        dosaBatter: '',
        pesaraBatter: '',
        bobbaraBatter: '',
        date: currentDate,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleModalOpen =(item)=>{
        setIsModalOpen(true)
        seetModalData(item)
    }
    const handleModalClose = () =>{
        setIsModalOpen(false)
    }

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
            const response = await fetch("https://spidey-api-seven.vercel.app/returnproduct", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error(errorData.message);
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
    const AllUsers = async () => {
        try {
            const response = await fetch('https://spidey-api-seven.vercel.app/users');
            if (!response) {
                console.log(err.message)
            }
            const data = await response.json();
            setApiData(data.reverse());
            console.log(data);
        } catch (err) {
            console.log(err.message);
            alert(err.message)
        }
    }
    const AllItems = async () => {
        const response = await fetch("https://spidey-api-seven.vercel.app/getReturnItems");
        if (!response) {
            alert('server error')
        }
        const data = await response.json();
        setItemsData(data.items.reverse());
        console.log(data);

    }

    useEffect(() => {
        AllItems();
        AllUsers();
    }, [uploadItems])

    useEffect(() => {
        setDisplayCategories(selectedClient && selectedClient !== "#");
    }, [selectedClient]);

    return (
        <div className={`${isSidebarOpen ? "ml-16 w-[96%]" : "ml-64 w-[83%]"} transition-all  border rounded-lg bg-white h-[650px] p-4 shadow-xl  overflow-y-auto`}>
            <div className="mt-12">
                <form
                    onSubmit={uploadItems}
                    className="shadow-lg p-4 w-[100%] justify-self-center border border-gray-300 rounded-md"
                >
                    <div className="text-center">
                        <h1 className="text-lg font-bold text-green-700">Product Return</h1>
                    </div>
                    <div className="mt-6 w-[30%] text-center mx-auto">
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
                            {apiData.map((item, index) => (
                                <option value={item.userName}>{item.userName}</option>
                            ))}
                        </select>
                    </div>
                    {displayCategories && (
                        <>
                            <div className="mt-6 border grid grid-cols-5 gap-x-4 gap-y-6 p-4 shadow-lg">
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center">
                                        <label
                                            htmlFor={category.id}
                                            className="flex-1 text-gray-700 font-medium text-sm"
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
                                    className={`mt-6 ${isSubmitting
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
            <div>
                <table className="w-full mt-2">
                    <thead className="bg-gray-300">
                        <tr>
                            <th>SlNo</th>
                            <th>ClientName</th>
                            <th>Date</th>
                            <th>IdlyBatter</th>
                            <th>DosaBatter</th>
                            <th>BobbaraBatter</th>
                            <th>PesaraBatter</th>
                            <th>Total Items</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {ItemsData.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td>{index + 1}</td>
                                <td>{item.clientName}</td>
                                <td>{item.date}</td>
                                <td>{item.idlyBatter}</td>
                                <td>{item.dosaBatter}</td>
                                <td>{item.bobbaraBatter}</td>
                                <td>{item.pesaraBatter}</td>
                                <td>{Number(item.idlyBatter) + Number(item.dosaBatter) +
                                    Number(item.bobbaraBatter) + Number(item.pesaraBatter)}</td>
                                    <td className="inline-block cursor-pointer" onClick={()=>handleModalOpen(item)}><BiEdit/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ProductReturnModal isOpen={isModalOpen} onClose={handleModalClose} data={modalData}/>
        </div>
    );
};

export default ProductHandover;
