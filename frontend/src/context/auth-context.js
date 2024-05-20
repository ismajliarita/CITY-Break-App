import React, { createContext, useState, useEffect } from 'react';
import { isTokenExpired, setUserState } from '../util/helpers';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("city-token");
    const user = localStorage.getItem("city-user");
    if (token && user) {
      setToken(token);
      setUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    if (isTokenExpired(token)) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setToken(null);
      setUser(null);
    }else {
      setIsLoggedIn(true);
      setToken(localStorage.getItem("city-token"));
      // setUser({});
    }

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