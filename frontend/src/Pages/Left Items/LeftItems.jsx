import React, { useEffect, useState } from "react";

const LeftItems = ({ isSidebarOpen }) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const [remainingItems, setRemainingItems] = useState([]);
    const [date, setDate] = useState(currentDate)

    const fetchLeftItems = async () => {
        try {
            const response = await fetch("http://localhost:5001/getRemainingItems", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ date: date }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);
            
            setRemainingItems(data.remainingItems || []);
        } catch (err) {
            alert(err.message)
        }
    };

    useEffect(() => {
        fetchLeftItems();
    }, [date]);
    console.log(date);
    
    return (
        <div
            className={`${
                isSidebarOpen ? "ml-16 w-[96%]" : "ml-64 w-[83%]"
            } transition-all`}
        >
            <div>
                <h1>Remaining Items</h1>
                <div>
                    <label htmlFor="date">Date</label>
                    <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
                </div>
                <table className="w-full border">
                    <thead className="bg-gray-400">
                        <tr>
                            <th>SlNo</th>
                            <th>Client Name</th>
                            <th>Date</th>
                            <th>Idly Batter</th>
                            <th>Dosa Batter</th>
                            <th>Bobbara Batter</th>
                            <th>Pesara Batter</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeftItems;