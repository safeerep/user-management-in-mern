import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../constants/constants";

function EditUserDataByAdmin(props) {
  const { isModalOpen, setIsModalOpen, currentUser } = props;
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [userNameState, setUserNameState] = useState(false);
  const [emailState, setEmailState] = useState(false);
  const [errorInFormSubmit, setErrorInFormSubmit] = useState(null);

  const handleUserDataUpdate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmailPattern = emailRegex.test(email);
    const sameUserName = userName?.trim() === currentUser.userName;
    const sameEmail = email?.trim() === currentUser.email;
    if (email === "" || userName === "") {
      if (email === "") {
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
    } else if (
      (email === null && userName === null) ||
      (sameUserName && sameEmail) ||
      (email === null && sameUserName) ||
      (userName === null && sameEmail)
    ) {
      toast.error("no changes made");
      return;
    } else if (!validEmailPattern && sameUserName) {
      setEmailState(true);
      setTimeout(() => {
        setEmailState(false);
      }, 3000);
    } else {
      const credentials = {
        id: currentUser._id,
        email: email || currentUser.email,
        userName: userName || currentUser.userName,
      };
      axios
        .post(`${BACKEND_BASE_URL}/admin/edit-user-data`, credentials, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          const response = res.data;
          if (response.success) {
            setIsModalOpen(false);
            toast.success("successfully updated");
          } else {
            const error = response.message;
            setErrorInFormSubmit(error);
          }
        });
    }
  };
  return (
    <>
      {isModalOpen && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 shadow-lg mx-auto max-w-sm">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <form>
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
                <div className="flex justify-center"></div>
                {/* body */}
                <div className="relative px-12 flex-auto">
                  {errorInFormSubmit && (
                    <p className="p-3 text-red-600">{errorInFormSubmit}</p>
                  )}
                  <p className="p-3">
                    <input
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                      className="block w-full border border-black text-gray p-4 outline-0 font-[0.95em]"
                      type="text"
                      placeholder="Type new username"
                      defaultValue={currentUser.userName}
                    />
                  </p>
                  {userNameState && <p className="text-red-600 pl-3">user name can't be null</p>}
                  <p className="p-3">
                    <input
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className="block w-full border border-black text-gray p-4 outline-0 font-[0.95em]"
                      type="email"
                      placeholder="Type a unique email"
                      defaultValue={currentUser.email}
                    />
                  </p>
                  {emailState && (
                    <p className="pl-3 text-red-600">enter a valid email</p>
                  )}
                </div>
                {/*footer*/}

                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleUserDataUpdate();
                    }}
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}

export default EditUserDataByAdmin;
