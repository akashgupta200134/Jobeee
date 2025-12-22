"use client";

import { Provider } from "react-redux";
import { store } from "@/app/redux/store"; // Ensure path is correct

// Ensure the file extension is .tsx, NOT .ts
export default function ProviderRedux({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}