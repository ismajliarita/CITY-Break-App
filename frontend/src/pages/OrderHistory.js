import React from 'react';
import {
  Flex,
  Text
} from "@chakra-ui/react";

export default function OrderHistory() {
  return (
    <Flex
      justifyContent={"center"}
     >
      <Text 
        fontSize="3xl" 
        fontWeight="bold" 
        color="grey" 
        margin="20px" 
      >
        Order History
      </Text>
    </Flex>
  );
}