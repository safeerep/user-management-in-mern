import React, { useState, useRef } from "react";
import axios from "axios";
import { useDispatch} from "react-redux"
import { adminLogin} from "../../store/store"
import { BACKEND_BASE_URL } from "../../constants/constants";
import Email from "../../components/Email";
import Password from "../../components/Password";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordState, setPasswordState] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      if (!email.trim()) {
        setEmailState(true);
        setTimeout(() => {
          setEmailState(false);
        }, 3000);
      }
      if (!password.trim()) {
        setPasswordState(true);
        setTimeout(() => {
          setPasswordState(false);
        }, 3000);
      }
    } else {
      dispatch(adminLogin({email, password}, setErrorMessage, navigate))
    }
  };
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form className="space-y-6">
            <h5 className="text-xl text-center font-medium text-gray-900">
              Welcome Admin!
            </h5>
            {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
            <Email email={email} setEmail={setEmail} emailState={emailState} />
            <Password
              password={password}
              setPassword={setPassword}
              passwordState={passwordState}
            />
            <button
              type="submit"
              onClick={handleAdminLogin}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login to your account
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
