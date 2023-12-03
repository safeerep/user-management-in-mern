import React from "react";

function Email({email, setEmail, emailState}) {
  
  return (
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
      { emailState && <p className="text-red-600 font-medium">please type a valid email address</p>}
    </div>
  );
}

export default Email;
