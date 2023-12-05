import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userProfileUpdate } from "../../store/store";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../constants/constants";

function EditProfile({ isModalOpen, setIsModalOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state?.userReducer?.userId);
  const user = useSelector((state) => state.userReducer);
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [image, setImage] = useState();
  const [userData, setUserData] = useState();
  const [emailState, setEmailState] = useState(false);
  const [userNameState, setUserNameState] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    axios
      .get(`${BACKEND_BASE_URL}/profile/${userId ? userId : ""}`, {
        withCredentials: true,
      })
      .then((res) => {
        const response = res.data;
        if (response.success) {
          setUserData(response?.userData);
          setEmail(response?.userData?.email);
          setUserName(response?.userData?.userName);
        }
      });
  }, [user]);

  const handleUpdateProfile = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmailPattern = emailRegex.test(email);

    if (!email.trim() || !validEmailPattern || !userName.trim()) {
      if (!email.trim() || !validEmailPattern) {
        setEmailState(true);
        setTimeout(() => {
          setEmailState(false);
        }, 3000);
      } else {
        setUserNameState(true);
        setTimeout(() => {
          setUserNameState(false);
        }, 3000);
      }
    } else {
      dispatch(
        userProfileUpdate(
          { userId, userName, email, image },
          setErrorMessage,
          navigate
        )
      ).then(() => {
        setIsModalOpen(false);
        setImage();
      });
    }
  };
  return (
    <>
      {isModalOpen && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-screen my-6 shadow-lg mx-auto max-w-lg">
            <div className="border-0 p-5 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex p-5 rounded-t">
                <button
                  className=" ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  x
                </button>
              </div>
              <form className="space-y-6">
                {errorMessage && (
                  <p className="text-red-600 text-center">{errorMessage}</p>
                )}
                {/* startin */}
                {(userData?.profilePhoto || image) ? (
                  <div className="w-full flex justify-center">
                    <div className="w-40 rounded-full object-fill overflow-hidden h-40">
                      <img
                        className="h-40 w-40 object-cover"
                        src={
                          image
                            ? URL.createObjectURL(image)
                            : `${BACKEND_BASE_URL}/uploads/${userData?.profilePhoto}`
                        }
                        alt=""
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex justify-center">
                    <div className="w-40 rounded-full object-fill overflow-hidden h-40">
                      <img
                        className="h-40 w-40 object-cover"
                        src="/images/profile.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                )}

                <div className="w-full flex justify-center">
                  <label
                    htmlFor="profile-photo-input"
                    className="bg-slate-100 border text-black py-2 px-4 rounded cursor-pointer"
                  >
                    {userData?.profilePhoto? 'Edit profile photo' : 'Add Profile Photo'}
                  </label>
                  <input
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                    type="file"
                    id="profile-photo-input"
                    className="hidden"
                    accept="image/*"
                  />
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    User name
                  </label>
                  <input
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                    placeholder="your username"
                    defaultValue={userName}
                  />
                  {userNameState && (
                    <p className="text-red-600 font-medium">
                      username can't be null
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                    placeholder="your email"
                    value={email}
                  />
                  {emailState && (
                    <p className="text-red-600 font-medium">
                      please type a valid email address
                    </p>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdateProfile();
                  }}
                  type="submit"
                  className="w-full text-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}

export default EditProfile;
