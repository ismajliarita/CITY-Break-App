import * as React from 'react'
import {ChakraProvider} from "@chakra-ui/react";
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import './style.css';
import { AuthProvider } from './context/auth-context';
import { ItemsProvider } from './context/items-context';
import AppRoutes from './AppRoutes';

export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <AuthProvider> 
          <ItemsProvider>
              <NavBar />
              <AppRoutes />
          </ItemsProvider>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}


