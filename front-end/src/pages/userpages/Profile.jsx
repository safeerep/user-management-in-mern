import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../constants/constants";
import EditProfile from "../../components/modal/EditProfile";

function Profile() {
  const dispatch = useDispatch();
  const [updateProfileModalIsOpen, setUpdateProfileModalIsOpen] =
    useState(false);
  const userId = useSelector((state) => state?.userReducer?.userId);
  const [userData, setUserData] = useState();
  useEffect(() => {
    axios
      .get(`${BACKEND_BASE_URL}/profile/${userId ? userId : ""}`, {
        withCredentials: true,
      })
      .then((res) => {
        const response = res.data;
        if (response.success) {
          setUserData(response.userData);
        
        }
      });
  }, [userData]);

  const handleUpdateProfile = () => {
    setUpdateProfileModalIsOpen(!updateProfileModalIsOpen);
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="flex shadow w-1/2 mt-5 h-40">
          <div className="bg-white w-40  border-r border-black">
            <img src={userData?.profilePhoto? `${BACKEND_BASE_URL}/uploads/${userData?.profilePhoto}` : "/images/profile.jpg"} className="object-cover h-40 w-40" alt="" />
            <button
              onClick={handleUpdateProfile}
              className="font-bold absolute border mt-4 p-2 bg-slate-100"
            >
              Edit profile
            </button>
          </div>
          <div className="p-3 grid  lg:grid-cols-1 ">
            <p className="font-bold">name: {userData?.userName}</p>
            <p className="font-bold"> Email Id : {userData?.email}</p>
          </div>
        </div>
      </div>
      <EditProfile
        userId={userData?._id}
        userNameToUpdate={userData?.userName}
        emailToUpdate={userData?.email}
        imageToUpdate={userData?.profilePhoto}
        isModalOpen={updateProfileModalIsOpen}
        setIsModalOpen={setUpdateProfileModalIsOpen}
      />
    </>
  );
}

export default Profile;
