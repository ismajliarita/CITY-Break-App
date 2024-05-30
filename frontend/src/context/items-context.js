import React, { createContext, useState, useEffect, useContext } from 'react';
import { getItems } from '../api';
import { AuthContext } from './auth-context';
import { useNavigate } from 'react-router-dom';

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if(auth.isLoggedIn){
        const allItems = getItems();
        setItems(allItems);
      }
    }
    catch (error) {
      console.error(error);
    }
  }, []);


  const itemsContextValue = {
    items, setItems,
  };

  return (
    <ItemsContext.Provider value={itemsContextValue}>
      {children}
    </ItemsContext.Provider>
  );
};