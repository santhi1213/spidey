import React, { useState } from "react";
import { ImCross } from "react-icons/im";

const ProductHandoverModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null; 
  console.log(data);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-hidden={!isOpen}
    >
      <div className="bg-white p-6 rounded-md w-full max-w-4xl h-auto max-h-[90%] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-4 border-b pb-2">
          <h1 className="text-lg font-semibold">Product Handover</h1>
          <button
            onClick={onClose}
            className="text-gray-500 text-[10px] bg-black p-2 rounded-full hover:text-white focus:outline-none"
          >
            <ImCross />
          </button>
        </div>  

        {/* body */}
        <div className="mt-4">
          
        </div>
      </div>
    </div>
  );
};

export default ProductHandoverModal;
