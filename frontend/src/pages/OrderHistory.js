import React from 'react';
import {
  Flex,
  Text,
  useMediaQuery,
  Button,
  Modal,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from 'react';
import Order from '../components/OrderHistory/Order';
import { getFinishedOrders } from '../api';
import { AuthContext } from '../context/auth-context';

export default function OrderHistory() {
  const [allOrders, setAllOrders] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    getFinishedOrders(auth.user?.id)
    .then((data) => {
      setAllOrders(data);
      // console.log("state ",allOrders);
      // console.log("data",data);
    });
    
    if (!auth.isLoggedIn) {
      navigate("/auth");
    }
  }, [auth.user]);

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
        justifyContent="center"
      >
        {allOrders.map((order) => {
          console.log("order",order)
          return <Order 
            // key={order.id}
            order={order}
          />
        }
        )}
        {/* <Order /> */}
      </Flex>
    </>
  );
}