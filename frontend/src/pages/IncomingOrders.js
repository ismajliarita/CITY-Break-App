import {React, useEffect, useContext, useState} from 'react';
import {
  Flex,
  Text
} from "@chakra-ui/react";
import { AuthContext } from '../context/auth-context';

export default function IncomingOrders() {

  const auth = useContext(AuthContext);
  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/auth");
    }
  }, []);
  return (
    <Flex
      bg={"#a8a3a3"}
      justifyContent={"center"}
     >
      <Text 
        fontSize="3xl" 
        fontWeight="bold" 
        color="grey" 
        margin="20px" 
      >
        Incoming Orders
      </Text>
    </Flex>
  );
}