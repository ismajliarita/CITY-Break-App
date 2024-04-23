import React, {useEffect} from 'react';
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
import ItemInOrder from '../components/Cart/ItemInOrder';

export default function CurrentOrder () {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    // get the current order saved in local storage (and the items for this order) and set them in the use state. Make the state update on delete or update of any of the items
  }, []);
  return (
    <>
      <Text 
        display={"flex"}
        bg={"#a8a3a3"}
        justifyContent={"center"}
        fontSize="3xl" 
        fontWeight="bold" 
        color="grey" 
        padding="20px" 
      >
        Current Order
      </Text>
      <Flex
        bg={"#a8a3a3"}
        width={"auto"}
        height={"auto"}
        justifyContent={"center"}
      >
        
        <ItemInOrder />
      </Flex>
    </>
  );
}