import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";


const Home = ({ isSidebarOpen }) => {
  const [selectedClient, setSelectedClient] = useState("#");
  const [clientData, setClientData] = useState([]);

  // Mock API response data
  const apiResponse = {
    shop1: [
      { slno: 1, clientName: "Shop1", items: 5, totalQuantity: 100, price: 500 },
      { slno: 2, clientName: "Shop1", items: 3, totalQuantity: 75, price: 350 },
      { slno: 3, clientName: "Shop1", items: 7, totalQuantity: 120, price: 700 },
    ],
    shop2: [
      { slno: 1, clientName: "Shop2", items: 4, totalQuantity: 80, price: 400 },
      { slno: 2, clientName: "Shop2", items: 6, totalQuantity: 150, price: 600 },
    ],
    shop3: [
      { slno: 1, clientName: "Shop3", items: 2, totalQuantity: 50, price: 250 },
    ],
  };

  // Handle selection change
  const handleClientChange = (event) => {
    const selected = event.target.value;
    setSelectedClient(selected);
  };

  // Fetch data based on selected client
  useEffect(() => {
    if (selectedClient !== "#") {
      setClientData(apiResponse[selectedClient] || []);
    } else {
      setClientData([]);
    }
  }, [selectedClient]);

  return (
    <div
      className={`${
        isSidebarOpen ? "ml-16 w-[96%]" : "ml-64 w-[83%]"
      } transition-all`}
    >
      <div className="p-6 shadow-lg">
        <div className="flex flex-col">
          <label htmlFor="client">Select Client</label>
          <select
            name="client"
            id="client"
            className="border border-gray-400 w-[30%] p-1 rounded-md"
            onChange={handleClientChange}
            value={selectedClient}
          >
            <option value="#">--select--</option>
            <option value="shop1">Shop1</option>
            <option value="shop2">Shop2</option>
            <option value="shop3">Shop3</option>
          </select>
        </div>

        <div>
          <table className="min-w-full table-auto mt-4">
            <thead>
              <tr>
                <th className="border p-2">Slno</th>
                <th className="border p-2">ClientName</th>
                <th className="border p-2">No. of items</th>
                <th className="border p-2">Total Quantity</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">View</th>
              </tr>
            </thead>
            <tbody>
              {clientData.length > 0 ? (
                clientData.map((item) => (
                  <tr key={item.slno}>
                    <td className="border p-2">{item.slno}</td>
                    <td className="border p-2">{item.clientName}</td>
                    <td className="border p-2">{item.items}</td>
                    <td className="border p-2">{item.totalQuantity}</td>
                    <td className="border p-2">{item.price}</td>
                    <td className="border p-2 text-center">
                      <button className="text-black p-2 rounded"><FaEye/></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border p-2 text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
