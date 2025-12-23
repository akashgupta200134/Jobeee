import axios from "axios";
import Cookies from "js-cookie";
import {
  btnLoadingStart,
  loginFail,
  loginSuccess,
  registerFail,
  registerSuccess,
} from "../reducer/userReducer";

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
export const registerUser = (formdata: RegisterFormData) => async (dispatch: any) => {
  try {
    dispatch(btnLoadingStart());

    const fd = new FormData();
    Object.entries(formdata).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        fd.append(key, value as any);
      }
    });

    const { data } = await axios.post("/api/user/register", fd,{
         headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    Cookies.set("token", data.token, { expires: 5, secure: true, path: "/" });

    dispatch(
      registerSuccess({
        user: data.user,
        message: data.message,
      })
    );
  } catch (error: any) {
    dispatch(registerFail(error.response?.data?.message || "Something went wrong"));
  }
};

// LOGIN
export const loginUser = ({ email, password }: LoginData) => async (dispatch: any) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.post("/api/user/login", { email, password });

    Cookies.set("token", data.token, { expires: 5, secure: true, path: "/" });

    dispatch(
      loginSuccess({
        user: data.user,
        message: data.message,
      })
    );
  } catch (error: any) {
    dispatch(loginFail(error.response?.data?.message || "Invalid credentials"));
  }
};
