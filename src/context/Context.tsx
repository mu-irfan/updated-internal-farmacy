"use client";
import { useAuth } from "@/hooks/useAuth";
import { createContext, useContext, useState, ReactNode } from "react";

// Create context
const Context = createContext<ModeContextType | undefined>(undefined);

// Provider component to wrap the app
export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"view" | "add" | "edit">("add");

  // access token
  const { getAccessToken } = useAuth();
  const token: any = getAccessToken();

  const contextValues = {
    mode,
    setMode,
    token,
  };

  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export const useContextConsumer = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Context must be in Provider");
  }
  return context;
};
