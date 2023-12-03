import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL} from "../../constants/constants"
import Email from "../../components/Email";
import Password from "../../components/Password";

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [emailState, setEmailState] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordState, setPasswordState] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleUserLogin = () => {
    console.log('called');
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
        email,
        password
      }

      axios.post(`${BACKEND_BASE_URL}/login`, credentials, {
        headers: { "Content-Type": "application/json"},
        withCredentials: true
      }) .then ((res) => {
        const response = res.data;
        console.log(response);
        if (response.success) {
          navigate('/home')
        } else {
          setErrorMessage(response.message)
        }
      })
    }
  }
  
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <form className="space-y-6">
          <h5 className="text-xl text-center font-medium text-gray-900">
            Sign in to Eeepees'
          </h5>
          {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
          <Email email={email} setEmail={setEmail} emailState={emailState}/>
          <Password password={password} setPassword={setPassword} passwordState={passwordState} />
          <div className="flex justify-center text-sm font-medium text-gray-500">
            Not registered?
            <a
              onClick={(e) => {
                e.preventDefault()
                navigate('/sign-up')
              }}
              className="text-blue-700 hover:underline cursor-pointer"
            >
              Create account
            </a>
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault()
              handleUserLogin()
            }}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login to your account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
