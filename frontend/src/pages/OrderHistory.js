import React from 'react';
import {
  Flex,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import Order from '../components/OrderHistory/Order';
import { getFinishedOrders } from '../api';

export default function OrderHistory() {
  const [allOrders, setAllOrders] = useState([{}]);

  useEffect(() => {
    getFinishedOrders().then((data) => {
      setAllOrders(data);
      console.log(data)
    });
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
        Order History
      </Text>
      <Flex
        bg={"#a8a3a3"}
        width={"auto"}
        height={"auto"}
      >
        {/* {allOrders.map((order) => {
          <Order />
        })} */}
        {/* <Order /> */}
      </Flex>
    </>
  );
}