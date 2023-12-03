import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { BACKEND_BASE_URL} from "../../constants/constants"
import Username from "../Username";
import Email from "../Email";
import Password from "../Password";

function CreateNewUserByAdmin({ isModalOpen, setIsModalOpen }) {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState(null);
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordState, setPasswordState] = useState(false)
  const [userNameState, setUserNameState] = useState(false);
  const [emailState, setEmailState] = useState(false);

  const addNewUser = () => {
    console.log('ok called');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmailPattern = emailRegex.test(email);
    const passwordPattern = /^[^\s]{6,}$/;
    const validPassword = passwordPattern.test(password)
    
    if (!email.trim() || !password.trim() || !validEmailPattern || !validPassword) {
      if (!email.trim() || !validEmailPattern) {
        setEmailState(true);
        setTimeout(() => {
          setEmailState(false);
        }, 3000);
      }
      if (!password.trim() || !validPassword) {
        setPasswordState(true);
        setTimeout(() => {
          setPasswordState(false);
        }, 3000);
      }
    } else {
      const credentials = {
        userName,
        email,
        password,
      }
      axios.post(`${BACKEND_BASE_URL}/admin/create-user`, credentials, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        const response = res.data;
        if (response.success) {
          setIsModalOpen(false)
          navigate('/admin-panel')
          setUserName('')
          setEmail('')
          setPassword('')
          toast.success('successfully added a user')
        } else {
          setErrorMessage(response.message)
        }
      })
      .catch((err) => {
        console.log(`an error happened ${err}`);
      })
    }
  }
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
                <h5 className="text-xl text-center font-medium text-gray-900 dark:text-white">
                  Create a new user
                </h5>
                {errorMessage && (
                  <p className="text-red-600 text-center">{errorMessage}</p>
                )}
                <Username userName={userName} setUserName={setUserName} />
                <Email
                  email={email}
                  setEmail={setEmail}
                  emailState={emailState}
                />
                <Password
                  password={password}
                  setPassword={setPassword}
                  passwordState={passwordState}
                />
                <p className="text-xs">
                  password should contain atleast 6 characters
                </p>
                
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addNewUser();
                  }}
                  type="submit"
                  className="w-full text-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Create account
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

export default CreateNewUserByAdmin;
