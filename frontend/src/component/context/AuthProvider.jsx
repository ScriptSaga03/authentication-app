import { createContext, useContext, useState } from "react";


const AuthContext = createContext();

// Provider Component
export function AuthProvider({ children }) {
  const [authType, setAuthType] = useState("sign-in");
  const handleAuthType =()=>{
    setAuthType(authType === "sign-in"?"sign-up":"sign-in");
  }

  return (
    <AuthContext.Provider value={{ authType, handleAuthType}}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook for Using Context
export function useAuth() {
  return useContext(AuthContext);
}
