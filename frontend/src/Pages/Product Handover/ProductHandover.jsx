import React from "react";

const ProductHandover = ({ isSidebarOpen }) => {
    return (
        <div
            className={`${isSidebarOpen ? "ml-16 w-[96%]" : "ml-64 w-[83%]"
                } transition-all`}
        >
            <h1>product handover</h1>
        </div>
    )
}

export default ProductHandover;