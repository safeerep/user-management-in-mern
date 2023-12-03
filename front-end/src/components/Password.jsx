import React from "react";

function Password({password, setPassword, passwordState}) {

  return (
    <div>
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Your password
      </label>
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        name="password"
        id="password"
        placeholder="••••••••"
        value={password}
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 "
      />
      {passwordState && <p className="text-red-600 font-medium">please enter a valid password</p>}
    </div>
  );
}

export default Password;
