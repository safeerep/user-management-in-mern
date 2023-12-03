import { useState } from "react";
import { Routes, Route} from 'react-router-dom'
import Login from "./pages/userpages/Login";
import AdminLogin from "./pages/adminpages/Login"
import Signup from "./pages/userpages/Signup";
import Profile from "./pages/userpages/Profile";
import Home from "./pages/userpages/Home";
import Dashboard from "./pages/adminpages/Dashboard";

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/sign-up" element={<Signup />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin-panel" element={<Dashboard />} />
    </Routes>
    </>
  );
}

export default App;
