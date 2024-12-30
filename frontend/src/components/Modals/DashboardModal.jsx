import React from "react";

const DashboardModal = ({ isOpen, onClose, item }) => {
  if (!isOpen) return null; // Don't render modal if it's not open

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-[50%]">
        <h2 className="text-xl font-semibold">Item Details</h2>
        {item ? (
          <div>
            <p><strong>Client Name:</strong> {item.clientName}</p>
            <p><strong>Items:</strong> {item.items}</p>
            <p><strong>Total Quantity:</strong> {item.totalQuantity}</p>
            <p><strong>Price:</strong> {item.price}</p>
          </div>
        ) : (
          <p>No data available</p>
        )}
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">
          Close
        </button>
      </div>
    </div>
  );
};

export default DashboardModal;
