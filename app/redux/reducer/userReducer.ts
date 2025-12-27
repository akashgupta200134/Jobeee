import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1. Define the shape of your User State
interface UserState {
  user: any | null; 
  userProfile: any | null; 
  isAuth: boolean;
  savedJobs: string[] | null; 
  loading: boolean;
  btnLoading: boolean; // Fixed typo (btnloading -> btnLoading)
  error: string | null;
  message: string | null;
}

// 2. Define Initial State
const initialState: UserState = {
  user: null, 
  userProfile: null,
  isAuth: false, // ✅ Set to FALSE by default
  savedJobs: null,
  loading: false,
  btnLoading: false,
  error: null,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  // FIX: Key must be 'initialState', not 'intialState'
  initialState, 
  
  reducers: {
    loadingStart: (state) => {
      state.loading = true;
    },

    // Fixed typo: btnLoadinStart -> btnLoadingStart
    btnLoadingStart: (state) => {
      state.btnLoading = true;
    },

    registerSuccess: (state, action: PayloadAction<{ user: any; message: string }>) => {
      state.btnLoading = false;
      state.user = action.payload.user;
      state.isAuth = true; 
      state.message = action.payload.message;
      state.error = null; 
    },

    registerFail: (state, action: PayloadAction<string>) => {
      state.btnLoading = false;
      state.user = null;
      state.isAuth = false; 
      state.error = action.payload;
    },

   loginSuccess: (state, action: PayloadAction<{ user: any; message: string }>) => {
  state.btnLoading = false;
  state.loading = false; // <--- ADD THIS LINE SAFETY NET
  state.user = action.payload.user;
  state.isAuth = true; 
  state.message = action.payload.message;
},

getSuccessUser: (state, action: PayloadAction<any>) => {
  console.log("✅ Reducer: User fetch success", action.payload);
  state.loading = false; 
  state.isAuth = true;
  state.user = action.payload?.user || action.payload; 
  state.error = null;
},

      getUserFailed: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.isAuth = false;
      state.user = null;
      state.error = action.payload; // Now you can see why it failed
    },

     loginFail: (state, action: PayloadAction<string>) => {
      state.btnLoading = false;
      state.user = null;
      state.isAuth = false; 
      state.error = action.payload;
    },

    logoutUserSuccess: (state) => {
    state.user = null;
    state.isAuth = false;
    state.loading = false;
    state.error = null;
    state.message = "Logged out successfully";
  },

updateUserSuccess: (state, action) => {
  state.loading = false;
  state.user = action.payload.user; // Update local user data immediately
  state.message = action.payload.message;
  state.error = null;
},
    clearMessage: (state) => {
      state.message = null;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loadingStart,
  loginSuccess,
  btnLoadingStart,
  getSuccessUser,
  getUserFailed,
  loginFail,
  logoutUserSuccess,
  registerFail,
  registerSuccess,
  clearMessage,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;