import React, { useState } from "react";
import ProfileImg from '../../assets/profileimg.png';

const Profile = ({ isSidebarOpen }) => {
    const name = localStorage.getItem('name');
    const username = localStorage.getItem('email'); // this is being passed in the form data
    
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        username: username, // Ensure this is the correct key for the user (can be email or userID)
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevent form submission from refreshing the page
        
        if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
            return alert("All fields are required");
        }
        
        if (formData.newPassword.length < 8) {
            return alert("Password must be at least 8 characters long");
        }

        if (formData.newPassword !== formData.confirmPassword) {
            return alert("New password and confirm password must match");
        }

        try {
            const response = await fetch(`https://spidey-pvig.onrender.com/updatepassword`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    oldPassword: formData.oldPassword,
                    newPassword: formData.newPassword,
                    username: formData.username // If your backend uses username or email
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to update password");
            }

            alert("Password updated successfully");
        } catch (err) {
            console.error("Error updating password:", err);
            alert(`Error updating password: ${err.message || "Unexpected error occurred"}`);
        }
    };

    return (
        <div
            className={`${
                isSidebarOpen ? "ml-16 w-[96%]" : "ml-64 w-[83%]"
            } transition-all border rounded-lg bg-white h-[650px] p-4 shadow-xl overflow-y-auto`}
        >
            <div className="flex flex-col gap-8">
                <div className="border p-2 rounded-lg shadow-xl">
                    <div className="border w-[90%] justify-self-center h-[250px] flex flex-col text-center rounded-xl bg-green-700">
                        <div className="justify-center flex">
                            <img src={ProfileImg} alt="profile" />
                        </div>
                        <div className="text-center -mt-4">
                            <h1 className="text-white font-bold uppercase text-xl">{name}</h1>
                        </div>
                    </div>
                </div>
                <div>
                    <form
                        onSubmit={handleUpdate} // Ensure onSubmit prevents default form behavior
                        className="w-[50%] justify-self-center border p-4 rounded-md shadow-lg"
                    >
                        <div className="flex flex-col w-[60%] justify-self-center">
                            <label
                                className="text-green-700 font-semibold"
                                htmlFor="oldPassword"
                            >
                                Old Password
                            </label>
                            <input
                                onChange={handleChange}
                                value={formData.oldPassword}
                                name="oldPassword"
                                type="password"
                                id="oldPassword"
                                placeholder="Old Password"
                                className="border border-gray-300 p-1 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col w-[60%] justify-self-center">
                            <label
                                className="text-green-700 font-semibold"
                                htmlFor="newPassword"
                            >
                                New Password
                            </label>
                            <input
                                onChange={handleChange}
                                value={formData.newPassword}
                                name="newPassword"
                                type="password"
                                id="newPassword"
                                placeholder="New Password"
                                className="border border-gray-300 p-1 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col w-[60%] justify-self-center">
                            <label
                                className="text-green-700 font-semibold"
                                htmlFor="confirmPassword"
                            >
                                Confirm Password
                            </label>
                            <input
                                onChange={handleChange}
                                value={formData.confirmPassword}
                                name="confirmPassword"
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                className="border border-gray-300 p-1 rounded-md"
                            />
                        </div>
                        <div className="text-center mt-6">
                            <button
                                type="submit"
                                className="bg-green-700 text-white font-semibold p-2 rounded-md"
                            >
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
