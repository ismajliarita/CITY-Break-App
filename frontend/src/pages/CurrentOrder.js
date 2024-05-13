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
import "../../src/style.css";
import { createOrderAsAdmin } from '../api';

export default function CurrentOrder () {
  const [orderItems, setOrderItems] = useState([]);
  const [orderItemsIds, setOrderItemsIds] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  const handleFinishOrder = async () => {
    console.log(orderItemsIds);
    createOrderAsAdmin(orderItemsIds, orderTotal)
    .then(() => {
      localStorage.removeItem("currentOrder");
      setOrderItems([]);
      setOrderTotal(0);
      // removeItemAmounts(orderItemsIds);
    })
  };

  useEffect(() => {
    const currentOrder = JSON.parse(localStorage.getItem("currentOrder"));
    if(!currentOrder) return;
    setOrderItems(currentOrder.items);
    setOrderItemsIds(currentOrder.items.map((item) => item.id));

    const total = currentOrder.items.reduce((sum, item) => sum + parseFloat(item.price), 0);
    setOrderTotal(total.toFixed(2));
  }, []);
  return (
    <Flex
      // height={"90vh"}
      flexDirection={"column"}
      bg={"#a8a3a3"}
    >
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
        alignItems={"center"}
        flexDirection={"column"}
        marginBottom={"100px"}
      >
        {orderItems.map((item) => {
          return (
          <ItemInOrder 
            key={orderItems.indexOf(item)}
            item={item}
            setOrderItems={setOrderItems}
            setOrderTotal={setOrderTotal}
          />
          );
        })}
      </Flex>

      <Flex
        position={"fixed"}
        bg={"#8d8686"}
        bottom={"0"}
        width={"100%"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        height={"80px"}
        alignItems={"center"}
      >
        <Button
          bg="#7c0504" 
          _hover={{bg:"#400302", color: "white"}}
          marginLeft={"-100px"}
          color={"black"}
          onClick={() => {
            localStorage.removeItem("currentOrder");
            setOrderItems([]);
            setOrderTotal(0);
          }}
        >
          Cancel Order
        </Button>
        <Button
          color={"black"}
          marginInline={"20px"}
          bg="#047b7c" 
          _hover={{bg:"#023f40", color: "white"}} 
          onClick={handleFinishOrder}
        >
          Finish Order
        </Button>
        <Text
          fontSize={"2xl"}
          fontWeight={"bold"}
          display={"flex"}
          position={"absolute"}
          right={"20px"}
        >
          Total: {orderTotal}€
        </Text>

      </Flex>
    </Flex>
  );
}