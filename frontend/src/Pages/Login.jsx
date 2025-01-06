import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setIsLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API_URL = 'https://spidey-api-mu.vercel.app'; 

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLogin(true);  
      navigate("/dashboard");  
    }
  }, [navigate, setIsLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
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
          localStorage.setItem('email',username);
          localStorage.setItem('name',data.name);
          console.log('Login successful');
          setIsLogin(true);
          navigate("/dashboard");
      } else {
          console.error('Error:', data.message);
          alert(data.message);
      }
  } catch (error) {
      console.error('Error logging in:', error);
      alert('Failed to fetch the API. Please check your network or backend deployment.');
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
        <div className="text-end">
          <Link to='/register'>Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
