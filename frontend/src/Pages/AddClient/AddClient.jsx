import React from "react";

const AddClient = ({ isSidebarOpen }) => {
    return (
        <div
            className={`${isSidebarOpen ? "ml-16 w-[96%]" : "ml-64 w-[83%]"
                } transition-all`}
        >
            <h1>Add Client</h1>
        </div>
    )
}

export default AddClient;