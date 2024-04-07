import React from 'react';
import {
  Flex,
  Text
} from "@chakra-ui/react";

export default function CreateOrder() {
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
        Create Order
      </Text>
    </Flex>
  );
}