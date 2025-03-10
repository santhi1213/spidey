import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";


const LeftItems = ({ isSidebarOpen }) => {
    const [remainingItems, setRemainingItems] = useState([]);
    const [date, setDate] = useState('')

    const fetchLeftItems = async () => {
        try {
            const response = await fetch("https://spidey-pvig.onrender.com/getRemainingItems", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ date: date }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);
            
            setRemainingItems(data.remainingItems.reverse() || []);
        } catch (err) {
            alert(err.message)
        }
    };
    const handleClear =() =>{
        setDate('')
    }

    useEffect(() => {
        fetchLeftItems();
    }, [date]);
    console.log(date);
    
    return (
        <div
            className={`${
                isSidebarOpen ? "ml-16 w-[96%]" : "ml-64 w-[83%]"
            } transition-all  overflow-y-auto border rounded-lg bg-white h-[650px] p-4 shadow-xl`}
        >
            <div>
                <div className="text-center">
                    <h1 className="text-xl font-bold text-green-700">Sold Items</h1>
                </div>
                <div className="flex gap-4 border mb-4 items-center">
                    <div className="flex flex-col w-[20%] gap-2">
                        <label className="text-green-700 font-semibold" htmlFor="date">Date</label>
                        <input className="border border-gray-300 rounded-md p-1" type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
                    </div>
                    <div>
                        <button className="bg-red-400 px-2 mt-7 py-2 rounded-md text-white font-bold" onClick={handleClear}><RxCross1/></button>
                    </div>
                </div>
                <table className="w-full border">
                    <thead className="bg-gray-300">
                        <tr>
                            <th>SlNo</th>
                            <th>Client Name</th>
                            <th>Date</th>
                            <th>Idly Batter</th>
                            <th>Dosa Batter</th>
                            <th>Bobbara Batter</th>
                            <th>Pesara Batter</th>
                            <th>Total Items</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {remainingItems.map((item,index)=>(
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.clientName}</td>
                                <td>{item.date}</td>
                                <td>{item.idlyBatter}</td>
                                <td>{item.dosaBatter}</td>
                                <td>{item.bobbaraBatter}</td>
                                <td>{item.pesaraBatter}</td>
                                <td>{Number(item.idlyBatter) + Number(item.dosaBatter) +
                                    Number(item.bobbaraBatter) + Number(item.pesaraBatter)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeftItems;
