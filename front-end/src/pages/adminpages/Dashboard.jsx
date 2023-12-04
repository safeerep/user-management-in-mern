import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_BASE_URL } from "../../constants/constants";
import AdminNavbar from "../../components/AdminNavbar";
import EditUserDataByAdmin from "../../components/modal/EditUserDataByAdmin";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import CreateNewUserByAdmin from "../../components/modal/CreateNewUserByAdmin";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalForDeleteOpen, setIsModalForDeleteOpen] = useState(false);
  const [isModalForAddUserOpen, setIsModalForAddUserOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    
    axios
      .get(`${BACKEND_BASE_URL}/admin/users-list`, {
        withCredentials: true,
      })
      .then((res) => {
        const response = res.data;
        if (response.success) {
          const users = response.users;
          setUsers(users);
        }
      })
      .catch((err) => {
        console.log(`an error happened ${err}`);
      });
  }, []);

  useEffect(() => {
    
    const getData = setTimeout(() => {
      const searchQuery = {
        searchEmail,
      };
      axios
        .get(`${BACKEND_BASE_URL}/admin/users-list`, {
          withCredentials: true,
          params: searchQuery,
        })
        .then((res) => {
          const response = res.data;
          if (response.success) {
            const users = response.users;
            setUsers(response.users);
          }
        })
        .catch((err) => {
          console.log(`an error happened ${err}`);
        });
    }, 2000);

    return () => clearTimeout(getData);
  }, [searchEmail]);

  const deleteOneUser = () => {
    const userId = currentUser._id;
    axios
      .delete(`${BACKEND_BASE_URL}/admin/delete-user`, {
        headers: { "Content-Type": "application/json" },
        params: {userId},
        withCredentials: true,
      })
      .then((res) => {
        const response = res.data;
        setIsModalForDeleteOpen(false);
        if (response.success){
          toast.success("successfully deleted");
          setUsers(response.users)
        } 
        else toast.error(response.message);
      })
      .catch((err) => {
        setIsModalForDeleteOpen(false);
        toast.error("something went wrong");
      });
  };
  return (
    <>
      <AdminNavbar />
      <div className="flex w-full justify-between items-center mt-4">
        <div className="ps-12">
          <h1 className="text-3xl font-bold">Users List</h1>
        </div>
        <div className="flex pe-12">
          <button
            onClick={() => {
              setIsModalForAddUserOpen(true)
            }}
            className="bg-green-600 text-white px-2 rounded-lg me-3"
          >
            Create user
          </button>
          <div>
            <input
              onChange={(e) => {
                setSearchEmail(e.target.value);
              }}
              className="border border-black rounded-lg focus:border-none p-3"
              type="search"
              placeholder="Search with user' email"
              value={searchEmail}
              name=""
              id=""
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 px-10">
        <table className="table-fixed w-full">
          <thead>
            <tr>
              <th className="p-3 border">Users' name</th>
              <th className="p-3 border">Users' Email</th>
              <th className="p-3 border">Edit user' details</th>
              <th className="p-3 border">Delete user</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((user) => {
                return (
                  <tr key={user.email}>
                    <td className="border p-3">{user.userName}</td>
                    <td className="border p-3">{user.email}</td>
                    <td
                      onClick={() => {
                        setCurrentUser(user);
                        setIsModalOpen(!isModalOpen);
                      }}
                      className="border p-3 text-center"
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </td>
                    <td
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentUser(user);
                        setIsModalForDeleteOpen(!isModalForDeleteOpen);
                      }}
                      className="border p-3 text-center"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <EditUserDataByAdmin
        currentUser={currentUser}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setUsers={setUsers}
      />
      <ConfirmationModal
        afterConfirmation={deleteOneUser}
        isModalOpen={isModalForDeleteOpen}
        setIsModalOpen={setIsModalForDeleteOpen}
        setUsers={setUsers}
      />
      <CreateNewUserByAdmin
        isModalOpen={isModalForAddUserOpen}
        setIsModalOpen={setIsModalForAddUserOpen}
      />
    </>
  );
}

export default Dashboard;
