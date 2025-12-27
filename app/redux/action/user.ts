import axios from "axios";
import Cookies from "js-cookie";
import {
  btnLoadingStart,
  getSuccessUser,
  getUserFailed,
  loadingStart,
  loginFail,
  loginSuccess,
  logoutUserSuccess,
  registerFail,
  registerSuccess,
} from "../reducer/userReducer";
import { Dispatch } from "@reduxjs/toolkit";

// HELPER: Only use 'secure' cookies on Production (HTTPS), not Localhost (HTTP)
const isProduction = process.env.NODE_ENV === "production";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role?: string;
  bio?: string;
  skills?: string;
  profilePic?: File;
  resume?: File;
}

interface LoginData {
  email: string;
  password: string;
}

// REGISTER
export const registerUser = (formdata: RegisterFormData) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(btnLoadingStart());

    const fd = new FormData();
    Object.entries(formdata).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        fd.append(key, value as any);
      }
    });

    const { data } = await axios.post("/api/user/register", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // FIX: Dynamic Secure Flag
    Cookies.set("auth_token", data.token, { 
      expires: 7, 
      path: "/",
      secure: false, 
      sameSite :'Lax'
      // False on localhost
    });

    dispatch(registerSuccess({ user: data.user, message: data.message }));
  } catch (error: any) {
    dispatch(registerFail(error.response?.data?.message || "Something went wrong"));
  }
};

// LOGIN
export const loginUser = ({ email, password }: LoginData) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.post("/api/user/login", { email, password });

    console.log("📝 Token received:", data.token?.substring(0, 10) + "...");

    // FIX: Dynamic Secure Flag
    Cookies.set("auth_token", data.token, { 
        expires: 7, 
        path: "/", 
        secure: isProduction // False on localhost
    });

    // Verification Log
    if (Cookies.get("auth_token")) {
        console.log("Cookie Saved Successfully!");
    } else {
        console.error("Cookie FAILED to save. Browser blocked it.");
    }

    dispatch(loginSuccess({ user: data.user, message: data.message }));
  } catch (error: any) {
    dispatch(loginFail(error.response?.data?.message || "Invalid credentials"));
  }
};


// GET USER (Profile)
// export const getUser = () => async (dispatch: Dispatch<any>) => {
//   try {
//     dispatch(loadingStart());

//     // 1. Check Cookie
//     const token = Cookies.get("auth_token");

//     if (!token) {
//       dispatch(getUserFailed(null));
//       return;
//     }

//     // 2. Fetch Data
//     const { data } = await axios.get<any>("/api/user/myprofile", {
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       // params: { token: token }
//     });
//     dispatch(getSuccessUser(data)); 


//   } catch (error: any) {
//     const errorMessage = error.response?.data?.message || "Failed to fetch user";
    
//     if (error.response?.status === 401) {
//         Cookies.remove("auth_token");
//     }

//     dispatch(getUserFailed(errorMessage));
//   }
// };


// GET USER (Profile)
export const getUser = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(loadingStart());

    // 1. RETRIEVE TOKEN FROM STORAGE
    // We try to get it from the cookie first
    const token = Cookies.get("auth_token");

    // Debugging: See if the cookie actually survives the refresh
    console.log("🍪 Token from Cookie on Refresh:", token);

    if (!token) {
      dispatch(getUserFailed("No token found"));
      return; 
    }

    // 2. MAKE THE REQUEST WITH EXPLICIT HEADER
    // We manually attach the token to the Authorization header
    const { data } = await axios.get("/api/user/myprofile", {
      headers: {
        "Authorization": `Bearer ${token}`, // <--- CRITICAL FIX
        "Content-Type": "application/json",
      },
      withCredentials: true // Good practice for CORS
    });

    console.log("✅ User Loaded:", data);
    dispatch(getSuccessUser(data));

  } catch (error: any) {
    console.error("❌ Get User Failed:", error.response?.data);
    dispatch(getUserFailed(error.response?.data?.message || "Session expired"));
  }
};





export const logout = () => async (dispatch: Dispatch<any>) => {
  try {
    // 1. Remove the Token Cookie (Must match the name you set earlier)
    Cookies.remove("auth_token");
    
    // Safety check: Remove it from root path just in case
    Cookies.remove("auth_token", { path: '/' }); 

    // 2. Reset Redux State
    dispatch(logoutUserSuccess());
    
    console.log("✅ User Logged Out");

  } catch (error) {
    console.error("Logout Error:", error);
  }
};