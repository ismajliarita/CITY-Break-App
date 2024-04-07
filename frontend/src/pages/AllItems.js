import React from 'react';
import {
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Text
} from "@chakra-ui/react";
import { useState, useRef } from 'react';
import { createItem } from '../api';
import ItemCard from '../components/ItemCard';
import AddItemForm from '../components/AllItems/AddItemForm';
import ItemEditCard from '../components/AllItems/ItemEditCard';

export default function AllItems () {
  

  return (
    <Flex  
      flexDirection="column"
      justifyContent={"center"}
     >
      <Text 
        fontSize="3xl" 
        fontWeight="bold" 
        color="grey" 
        margin="20px" 
        display={"flex"}
        justifyContent={"center"}
      >
        Add New Item
      </Text>
      <Flex>
        {/* The form to add an item */}
        <AddItemForm />

        {/* The list of items */}
        <Flex>
          <ItemEditCard />
        </Flex>
      </Flex>
    </Flex>
  );
}