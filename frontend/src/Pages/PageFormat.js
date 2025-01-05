import React from "react";

const Profile = ({ isSidebarOpen }) => {

    return (
        <div
            className={`${
                isSidebarOpen ? "ml-16 w-[96%]" : "ml-64 w-[83%]"
            } transition-all border rounded-lg bg-white h-[650px] p-4 shadow-xl overflow-y-auto`}
        >
            <h1>page format</h1>
        </div>
    );
};

export default Profile;
