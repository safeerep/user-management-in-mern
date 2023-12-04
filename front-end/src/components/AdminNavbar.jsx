import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux"
import { adminLogout} from "../store/store";

function AdminNavbar() {
  const navigate = useNavigate();
  const dipatch = useDispatch()
  const admin = useSelector((state) => state.adminReducer);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleButtonClickForDropDown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleAdminLogout = () => {
    dipatch(adminLogout(navigate))
  };

  return (
    <div className="flex w-full bg-white shadow h-16 items-center">
      <div className="flex justify-center w-full ">
        <h1 className="text-3xl font-bold">EEEPEES'</h1>
      </div>
      
      <div className="flex justify-end pe-7">
        <div className="relative inline-block text-left">
          <div>
            <button
              onClick={() => handleButtonClickForDropDown()}
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              {admin.email}
              <svg
                className="-mr-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {isDropdownOpen && (
            <div
              className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1 cursor-pointer" role="none">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    handleAdminLogout()
                  }}
                  className="block px-4 py-2 text-sm text-red-600"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                >
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;
