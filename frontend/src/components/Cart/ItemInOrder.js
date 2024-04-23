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
import { getItemImage, getItems } from '../../api';
// import ItemCard from '../components/ItemCard';
import AddItemForm from '../AllItems/AddItemForm';
import ItemCard from '../AllItems/ItemCard';

export default function ItemInOrder () {

  const [orderItems, setOrderItems] = useState([{}]);



  async function getCurrentItem() {
    const currentOrder = JSON.parse(localStorage.getItem("currentOrder"));
    setOrderItems(currentOrder);
    console.log("currentOrder", currentOrder);
  }

  async function removeItem() {

  }

  useEffect(() => {
    getCurrentItem();
  }, []);
  return (
    <Flex
      height={"80px"}
      border={"1px solid black"}
      borderRadius={"5px"}
      width={"700px"}
      margin={"10px"}
      padding={"10px"}
      alignItems={"center"}
    >
      <Text
        marginInline={"5px"}
      >{orderItems.name}</Text>
      <Text
        marginInline={"5px"}
      >{orderItems.price}</Text>
      <Text
        marginInline={"5px"}
      >{orderItems.amount}</Text>
      <Text
        marginInline={"5px"}
      >{orderItems.amount * orderItems.price || orderItems.price}</Text>
      <Button 
        onClick={removeItem}
        marginInline={"5px"}
      >Delete</Button>
    </Flex>
  );

}