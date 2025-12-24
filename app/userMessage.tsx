"use client";

import { useEffect } from "react";
// 1. Import 'AppDispatch' if you have it defined in your store, otherwise 'any' works for now
import { useSelector, useDispatch } from "react-redux"; 
import { toast, Toaster } from "sonner"; 
import { RootState, AppDispatch } from "@/app/redux/store"; // Ensure AppDispatch is exported
import { clearError, clearMessage } from "./redux/reducer/userReducer";
import { getUser } from "./redux/action/user";

const UserMessage = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const { error, message } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    dispatch(getUser()); 
  }, [dispatch]);

  return (
    <>
      <Toaster position="bottom-right" richColors />
    </>
  );
};

export default UserMessage;