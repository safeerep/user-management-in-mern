import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";

function Profile() {
  useEffect(() => {

  },[])
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="flex shadow w-1/2 mt-5 h-40">
          <div className="bg-white w-40  border-r border-black">
            <img src="/images/profile.jpg" className="object-cover" alt="" />
            <button className="font-bold border mt-2 p-2 bg-slate-100">
              Edit profile
            </button>
          </div>
          <div className="p-3 grid  lg:grid-cols-1 ">
            <p>name</p>
            <p className="font-bold">safeer</p>
            <p> safeerep77@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
