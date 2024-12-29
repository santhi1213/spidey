import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assume successful login
    setIsLogin(true);
    navigate("/dashboard");
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
