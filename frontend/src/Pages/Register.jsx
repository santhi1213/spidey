import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ setIsLogin }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch("https://spidey-pvig.onrender.com/register",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({ 
          name: name,
          username: username,
          password: password,
        }),  
      })
      if (!response.ok) {
        const errorText = await response.text(); 
        console.error("Error response:", errorText);
        return;
      }
  
      const data = await response.json();
      console.log(data)
      localStorage.setItem("id",data.id);
      localStorage.setItem('name',data.name);
      localStorage.setItem('token', data.token);
      setIsLogin(true);
      navigate("/dashboard");
    }catch(err){
      console.log(err.message)
    }
  };

  return (
    <div className="flex justify-center mt-[10%]">
      <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded-md w-[30%]">
        <div className="text-center">
          <h1 className="text-green-700 font-semibold text-2xl">Register</h1>
        </div>
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            className="border border-gray-400 rounded-md p-1"
            type="text"
            id="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            Register
          </button>
        </div>
        <div className="text-end">
          <Link to='/'>Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
