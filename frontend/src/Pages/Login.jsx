import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API_URL = 'https://spidey-api-six.vercel.app'; // Replace with your API base URL

  useEffect(() => {
    // Check if the authToken exists in localStorage on component mount
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLogin(true);  // Set login state to true if token exists
      navigate("/dashboard");  // Redirect to dashboard if already logged in
    }
  }, [navigate, setIsLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token); 
        console.log('Login successful');
        setIsLogin(true);
        navigate("/dashboard");
      } else {
        console.error(data.message); 
        alert(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      alert('An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center mt-[10%]">
      <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded-md w-[30%]">
        <div className="text-center">
          <h1 className="text-green-700 font-semibold text-2xl">Login</h1>
        </div>
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            className="border border-gray-400 rounded-md p-1"
            type="email"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="border border-gray-400 rounded-md p-1"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button className="bg-green-700 text-white font-semibold hover:bg-green-600 p-2 rounded-md mt-4">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
