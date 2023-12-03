import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {BACKEND_BASE_URL} from "../../constants/constants"
import Username from "../../components/Username";
import Email from "../../components/Email";
import Password from "../../components/Password";

function Signup() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordState, setPasswordState] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)
  const handleUserSignup = () => {
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
      axios.post(`${BACKEND_BASE_URL}/sign-up`, credentials, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        const response = res.data;
        if (response.success) {
          navigate('/home')
        } else {
          setErrorMessage(response.message)
        }
      })
      .catch((err) => {
        console.log(`an error happened ${err}`);
      })
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <form className="space-y-6">
          <h5 className="text-xl text-center font-medium text-gray-900 dark:text-white">
            Welcome to Eeepees'
          </h5>
          {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
          <Username userName={userName} setUserName={setUserName} />
          <Email email={email} setEmail={setEmail} emailState={emailState} />
          <Password
            password={password}
            setPassword={setPassword}
            passwordState={passwordState}
          />
          <p className="text-xs">password should contain atleast 6 characters</p>
          <div className="flex justify-center text-sm font-medium text-gray-500">
            Already have an account?
            <a
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              className="text-blue-700 hover:underline cursor-pointer"
            >
              Signin
            </a>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleUserSignup();
            }}
            type="submit"
            className="w-full text-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
