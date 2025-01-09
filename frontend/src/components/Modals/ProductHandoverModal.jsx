import React, { useState } from "react";
import { ImCross } from "react-icons/im";

const ProductHandoverModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    clientName: data.clientName,
    date: data.date,
    idlyBatter: data.idlyBatter,
    bobbaraBatter: data.bobbaraBatter,
    dosaBatter: data.dosaBatter,
    pesaraBatter: data.pesaraBatter,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(`https://spidey-frontend-glmm.onrender.com/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idlyBatter: formData.idlyBatter,
          dosaBatter: formData.dosaBatter,
          pesaraBatter: formData.pesaraBatter,
          bobbaraBatter: formData.bobbaraBatter,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update the product details");
      }

      const responseData = await response.json();
      setSuccessMessage(responseData.message);
      alert(responseData.message)
      onClose(); 
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Body */}
        <div className="mt-4">
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label htmlFor="text" className="text-green-700 font-semibold">Customer Name</label>
              <input
                type="text"
                className="border border-gray-300 p-1 rounded-md"
                value={formData.clientName}
                name="clientName"
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="text" className="text-green-700 font-semibold">Handovered Date</label>
              <input
                type="date"
                className="border border-gray-300 p-1 rounded-md"
                value={formData.date}
                name="date"
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="text" className="text-green-700 font-semibold">Idly Batter</label>
              <input
                type="text"
                className="border border-gray-300 p-1 rounded-md"
                onChange={handleChange}
                value={formData.idlyBatter}
                name="idlyBatter"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="text" className="text-green-700 font-semibold">Dosa Batter</label>
              <input
                type="text"
                className="border border-gray-300 p-1 rounded-md"
                onChange={handleChange}
                value={formData.dosaBatter}
                name="dosaBatter"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="text" className="text-green-700 font-semibold">Pesara Batter</label>
              <input
                type="text"
                className="border border-gray-300 p-1 rounded-md"
                onChange={handleChange}
                value={formData.pesaraBatter}
                name="pesaraBatter"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="text" className="text-green-700 font-semibold">Bobbara Batter</label>
              <input
                type="text"
                className="border border-gray-300 p-1 rounded-md"
                onChange={handleChange}
                value={formData.bobbaraBatter}
                name="bobbaraBatter"
              />
            </div>
          </div>
          <div className="text-center my-4">
            <button
              onClick={handleUpdate}
              className="bg-green-700 p-2 text-white font-semibold rounded-md"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductHandoverModal;
