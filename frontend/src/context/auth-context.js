import React, { createContext, useState, useEffect } from 'react';
import { isTokenExpired, setUserState } from '../util/helpers';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("city-token");
    const user = localStorage.getItem("city-user");
    if (token && user) {
      setToken(token);
      setUser(JSON.parse(user));
    }

    if (isTokenExpired(token)) {
      localStorage.removeItem("city-token");
      setIsLoggedIn(false);
      setToken(null);
      setUser(null);
    }else {
      setIsLoggedIn(true);
      setToken(localStorage.getItem("city-token"));
    }
  }, [token]);

  

  const authContextValue = {
    isLoggedIn, setIsLoggedIn,
    token, setToken,
    user, setUser,
    isLoading, setIsLoading
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};