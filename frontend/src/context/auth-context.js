import React, { createContext, useState, useEffect } from 'react';
import { isTokenExpired, setUserState } from '../util/helpers';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isTokenExpired(token)) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setToken(null);
      setUser(null);
    }
    setUserState({user, setUser});
  }, [token]);

  const authContextValue = {
    isLoggedIn, setIsLoggedIn,
    token, setToken,
    user, setUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};