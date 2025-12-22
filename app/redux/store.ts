import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/app/redux/reducer/userReducer";

// CHANGE THIS: Add 'export' before const
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Remove 'export default store;' at the bottom
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;