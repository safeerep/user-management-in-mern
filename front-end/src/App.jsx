import { useLayoutEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser, setAdmin } from "./store/store";
import Login from "./pages/userpages/Login";
import AdminLogin from "./pages/adminpages/Login";
import Signup from "./pages/userpages/Signup";
import Profile from "./pages/userpages/Profile";
import Home from "./pages/userpages/Home";
import Dashboard from "./pages/adminpages/Dashboard";
import { BACKEND_BASE_URL } from "./constants/constants";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const admin = useSelector((state) => state.adminReducer);
  useLayoutEffect(() => {
    if (!user.isAuthenticated) {
      axios
        .get(`${BACKEND_BASE_URL}/check-auth`, {
          withCredentials: true,
        })
        .then((res) => {
          const response = res.data;
          if (response.success) {
            dispatch(
              setUser({
                userId: response?.userData?._id,
                name: response?.userData?.userName,
                isAuthenticated: true,
              })
            );
          }
        });
    }
    if (!admin.isAuthenticated) {
      axios
        .get(`${BACKEND_BASE_URL}/admin/check-auth`, {
          withCredentials: true,
        })
        .then((res) => {
          const response = res.data;
          if (response.success) {
            dispatch(
              setAdmin({
                adminId: response?.adminData?._id,
                email: response?.adminData?.email,
                isAuthenticated: true,
              })
            );
          }
        });
    }
  }, [user, admin]);

  return (
    <>
      <Routes>
        {user.isAuthenticated ? (
          <>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/sign-up" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="*" element={<Signup />} />
          </>
        )}
        {admin.isAuthenticated ? (
          <>
            <Route path="/admin" element={<Navigate to="/admin-panel" />} />
            <Route path="/admin-panel" element={<Dashboard />} />
          </>
        ) : (
          <>
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="*" element={<Signup />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
