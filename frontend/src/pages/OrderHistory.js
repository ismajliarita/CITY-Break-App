import React from 'react';
import {
  Flex,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import "../style.css";

export default function OrderHistory() {
  
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

      </Flex>
    </>
  );
}