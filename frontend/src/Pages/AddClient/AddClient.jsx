import React, { useEffect, useState } from "react";

const AddClient = ({ isSidebarOpen }) => {
    const date = new Date();
    const [apiData, setApiData] = useState([]);
    const [formData, setFormData] = useState({
        userName: '',
        location: '',
        contact: '',
        date: date
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const phoneRegex = /^[0-9]{10}$/;
    
        if (!formData.contact) {
            alert("Contact number is required");
            return; 
        } else if (!phoneRegex.test(formData.contact)) {
            alert("Contact number must be a valid 10-digit phone number");
            return; 
        }
    
        try {
            const response = await fetch("http://localhost:5001/adduser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                console.error('Server error');
                return;
            }
            const data = await response.json();
            console.log(data);
            alert(data.message);
            setFormData({
                userName: '',
                location: '',
                contact: '',
                date: new Date()
            });
        } catch (err) {
            alert(err.message);
            console.error(err.message);
        }
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
    },[handleSubmit])

    return (
        <div
            className={`${
                isSidebarOpen ? "ml-16 w-[96%]" : "ml-64 w-[83%]"
            } transition-all border rounded-lg bg-white h-[650px] p-4 shadow-xl overflow-y-auto`}
        >
            <div>
                <form onSubmit={handleSubmit} className="w-[50%] justify-self-center">
                    <div className="text-center">
                        <h1 className="text-green-700 font-semibold text-2xl">Add Client</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-8 my-8">
                        <div className="flex flex-col">
                            <label htmlFor="userName">Client Name</label>
                            <input
                                type="text"
                                id="userName"
                                value={formData.userName}
                                name="userName"
                                onChange={handleChange}
                                className="border border-gray-400 p-1 rounded-md"
                                placeholder="Client Name"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="location">Location</label>
                            <input
                                type="text"
                                id="location"
                                value={formData.location}
                                name="location"
                                onChange={handleChange}
                                className="border border-gray-400 p-1 rounded-md"
                                placeholder="Location"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="contact">Contact Number</label>
                            <input
                                type="number"
                                id="contact"
                                value={formData.contact}
                                name="contact"
                                onChange={handleChange}
                                className="border border-gray-400 p-1 rounded-md"
                                placeholder="Contact Number"
                                required
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-green-700 text-white font-semibold hover:bg-green-800 p-2 rounded-md"
                        >
                            Add User
                        </button>
                    </div>
                </form>
                <div className="mt-12">
                    <table className="w-full border">
                        <thead className="bg-gray-300">
                            <tr>
                                <th>SlNo</th>
                                <th>Client Name</th>
                                <th>Location</th>
                                <th>Contact</th>
                                <th>Added Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {apiData.map((item, index)=>(
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="uppercase">{item.userName}</td>
                                    <td>{item.location}</td>
                                    <td>{item.contact}</td>
                                    <td>{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AddClient;
