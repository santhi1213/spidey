import React from "react";

const AddClient = ({ isSidebarOpen }) => {
    return (
        <div
            className={`${isSidebarOpen ? "ml-16 w-[96%]" : "ml-64 w-[83%]"
                } transition-all`}
        >
            <div>
                <form action="" className="w-[50%] justify-self-center">
                    <div className="text-center">
                        <h1 className="text-green-700 font-semibold text-2xl">Add Client</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-8 my-8">
                        <div className="flex flex-col">
                            <label htmlFor="name">Client Name</label>
                            <input type="text" className="border border-gray-400 p-1 rounded-md" placeholder="Client Name" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="location">Location</label>
                            <input type="text" className="border border-gray-400 p-1 rounded-md" placeholder="Location" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="phone">Contact Number</label>
                            <input type="number" className="border border-gray-400 p-1 rounded-md" placeholder="Contact Number" />
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="bg-green-700 text-white font-semibold hover:bg-green-800 p-2 rounded-md">Add User</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddClient;