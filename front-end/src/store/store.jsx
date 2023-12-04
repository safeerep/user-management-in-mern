import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import { BACKEND_BASE_URL } from "../constants/constants";

const userReducer = (prev = { isAuthenticated: false }, action) => {
  switch (action.type) {
    case "set":
      return {
        ...prev,
        userId: action?.payload.userId,
        name: action?.payload?.name,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...prev,
        userId: "",
        name: "",
        isAuthenticated: false,
      };
    default:
      return prev;
  }
};

const adminReducer = (prev = { isAuthenticated: false }, action) => {
  switch (action.type) {
    case "set_admin":
      return {
        ...prev,
        adminId: action?.payload?.adminId,
        email: action?.payload?.email,
        isAuthenticated: true,
      };
    case "admin_logout":
      return {
        ...prev,
        userId: "",
        name: "",
        isAuthenticated: false,
      };
    default:
      return prev;
  }
};

const appReducer = combineReducers({
  userReducer,
  adminReducer,
});

export const setUser = ({ userId, name }) => ({
  type: "set",
  payload: { userId, name },
});

export const userSignup = (
  { userName, email, password },
  setErrorMessage,
  navigate
) => {
  return (dispatch) => {
    const credentials = {
      userName,
      email,
      password,
    };
    axios
      .post(`${BACKEND_BASE_URL}/sign-up`, credentials, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        const response = res.data;
        if (response.success) {
          const userId = response?.userData?._id;
          const name = response?.userData?.userName;
          dispatch(setUser({ userId, name }));
          navigate("/home", { replace: true });
        } else {
          setErrorMessage(response.message);
        }
      })
      .catch((err) => {
        console.log(`an error happened ${err}`);
      });
  };
};


export const userProfileUpdate = (
  { userId, userName, email, image },
  setErrorMessage,
) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const credentials = new FormData();
      credentials.append("profilephoto", image);
      credentials.append("userId", userId);
      credentials.append("userName", userName);
      credentials.append("email", email);
      axios
        .post(`${BACKEND_BASE_URL}/update-profile`, credentials, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        })
        .then((res) => {
          const response = res.data;
          if (response.success) {
            const userId = response?.updatedUser?._id;
            const name = response?.updatedUser?.userName;
            dispatch(setUser({ userId, name }));
            resolve(); 
          } else {
            setErrorMessage(response.message);
            reject(response.message); 
          }
        })
        .catch((err) => {
          console.log(`An error happened: ${err}`);
          reject(err); 
        });
    });
  };
};

export const userLogin = ({ email, password }, setErrorMessage, navigate) => {
  return (dispatch) => {
    const credentials = {
      email,
      password,
    };
    axios
      .post(`${BACKEND_BASE_URL}/login`, credentials, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        const response = res.data;
        if (response.success) {
          const userId = response?.userData?._id;
          const name = response?.userData?.userName;
          dispatch(setUser({ userId, name }));
          navigate("/home", { replace: true });
        } else {
          setErrorMessage(response.message);
        }
      });
  };
};

export const userLogout = () => {
  return (dispatch) => {
    axios
      .get(`${BACKEND_BASE_URL}/logout`, {
        withCredentials: true,
      })
      .then(() => {
        dispatch({
          type: "logout",
        });
      });
  };
};

export const setAdmin = ({ adminId, email }) => ({
  type: "set_admin",
  payload: { adminId, email },
});

export const adminLogin = ({ email, password }, setErrorMessage, navigate) => {
  return (dispatch) => {
    const credentials = {
      email,
      password,
    };
    axios
      .post(`${BACKEND_BASE_URL}/admin/login`, credentials, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        const response = res.data;
        if (response.success) {
          const adminId = response?.adminData?._id;
          const email = response?.adminData?.email;
          dispatch(setAdmin({ adminId, email }));
          navigate("/admin-panel", { replace: true });
        } else {
          setErrorMessage(response.message);
        }
      })
      .catch((err) => {
        console.log(`an error happened ${err}`);
      });
  };
};

export const adminLogout = (navigate) => {
  return (dispatch) => {
    axios
      .get(`${BACKEND_BASE_URL}/admin/logout`, {
        withCredentials: true,
      })
      .then(() => {
        dispatch({
          type: "admin_logout",
        });
        navigate("/admin", { replace: true });
      });
  };
};

export const store = createStore(appReducer, {}, applyMiddleware(thunk));
