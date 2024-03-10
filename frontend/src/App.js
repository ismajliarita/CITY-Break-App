import * as React from 'react'
import {ChakraProvider} from "@chakra-ui/react";
import ItemCard from './components/ItemCard';
import NavBar from './components/NavBar';
import SelectItems from './components/SelectItems';
import './style.css';

export default function App() {

  function handleFile(event) {
    const file = event.target.files[0];
  }

  return (
    <ChakraProvider>
      <NavBar />
      <SelectItems />
    </ChakraProvider>
  );
}


