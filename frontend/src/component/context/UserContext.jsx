import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isSignedUp, setIsSignedUp] = useState(false);

  return (
    <UserContext.Provider value={{ isSignedUp, setIsSignedUp }}>
      {children}
    </UserContext.Provider>
  );
};