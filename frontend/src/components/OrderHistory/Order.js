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

export default function Order (order) {
  return(
    <Flex
      bg={"#CECACA"}
      height={"80px"}
      border={"2px solid #CECAB5"}
      borderRadius={"5px"}
      width={"600px"}
      margin={"10px"}
      padding={"10px"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Flex
        justifyContent={"space-between"}
        width={"80%"}
        alignItems={"center"}
      >
        <Text
          marginInline={"5px"}
          fontSize={"xl"}
          fontWeight={"bold"}
        >Order NR</Text>
        <Text
          fontSize={"sm"}
          width={"250px"}
          display={"flex"}
          flexWrap={"wrap"}
          maxHeight={"50px"}
        >{order.date}</Text>
      </Flex>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text
          marginInline={"30px"}
        >{order.total}€</Text>
        <Button 
          onClick={expandOrder}
          marginInline={"5px"}
          bg="#EDF2F7" 
          _hover={{bg:"#024041", color: "white"}}
        >OPEN</Button>
      </Flex>
    </Flex>
  )
}
  