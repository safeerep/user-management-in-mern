import React from "react";

function Username({userName, setUserName}) {
  return (
    <div>
      <label
        htmlFor="username"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        User name
      </label>
      <input
        onChange={(e) => {
            setUserName(e.target.value)
        }}
        type="text"
        name="username"
        id="username"
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
        placeholder="your username"
        value={userName}
      />
    </div>
  );
}

export default Username;
