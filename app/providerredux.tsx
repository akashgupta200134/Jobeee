"use client";

import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/app/redux/store"; // 👈 Check path
import { getUser } from "@/app/redux/action/user"; // 👈 Check path

// 1. Create a Child Component to handle the initial Dispatch
// We need this because we can only use 'useDispatch' INSIDE the Provider
const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // ⚡️ This runs once when the app loads to restore the user from the cookie
    dispatch(getUser() as any);
  }, [dispatch]);

  return <>{children}</>;
};

// 2. Main Provider Component
export default function ProviderRedux({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {/* Wrap children in the Initializer to trigger getUser */}
      <AuthInitializer>
        {children}
      </AuthInitializer>
    </Provider>
  );
}