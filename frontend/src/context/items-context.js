import React, { createContext, useState, useEffect } from 'react';
import { getItems } from '../api';

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const allItems = getItems();
    
    if (allItems) {
      setItems(allItems);
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