import React from 'react';
import {
  Flex,
  Text
} from "@chakra-ui/react";

export default function IncomingOrders() {
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