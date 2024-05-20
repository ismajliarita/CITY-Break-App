import React from 'react';
import {
  Flex,
  Text,
  useMediaQuery,
  Button,
  Modal,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Order from '../components/OrderHistory/Order';
import { getFinishedOrders } from '../api';
import { AuthContext } from '../context/auth-context';

export default function OrderHistory() {
  const [allOrders, setAllOrders] = useState([]);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    auth.isLoggedIn || navigate('/auth');

    if(auth.user){
      getFinishedOrders(auth.user?.id)
      .then((data) => {
        setAllOrders(data);
      });
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
        alignItems="center"
        flexDirection={"column"}
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