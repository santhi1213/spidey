import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./Pages/Sidebar";
import Home from "./Pages/Dashboard/Dashboard";
import ProductHandover from './Pages/Product Handover/ProductHandover';
import ProductReturn from './Pages/Product Return/ProductReturn';
import AddClient from "./Pages/AddClient/AddClient";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  const [collapsed, setCollapsed] = useState(false);  
  const [isLogin, setIsLogin] = useState(false);  

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <BrowserRouter>
      <div className="flex h-screen">
        {isLogin && (
          <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
        )}

        <div
          className={`flex-1 p-6 transition-all duration-300 `}
        >
          <Routes>
            <Route
              path="/"
              element={isLogin ? <Navigate to="/dashboard" /> : <Login setIsLogin={setIsLogin} />}
            />
            <Route path="/register" element={<Register setIsLogin={setIsLogin} />} />
            <Route
              path="/dashboard"
              element={isLogin ? <Home isSidebarOpen={collapsed} /> : <Navigate to="/" />}
            />
            <Route path="/product-handover" element={isLogin ? <ProductHandover isSidebarOpen={collapsed}/> : <Navigate to='/'/>} />
            <Route path="/product-return" element={isLogin ? <ProductReturn isSidebarOpen={collapsed}/> : <Navigate to='/'/>} />
            
            <Route path="/add-client" element={isLogin ? <AddClient isSidebarOpen={collapsed}/> : <Navigate to='/'/>} />
          </Routes>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
