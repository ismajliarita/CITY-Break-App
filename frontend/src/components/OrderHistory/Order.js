import React, {useEffect} from 'react';
import {
  Flex,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useRef } from 'react';

export default function Order ({order}) {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isDeleteOpen, onDeleteOpen, onDeleteClose } = useDisclosure();
  
  let dateTime = order.order_date;
  let [date, time] = dateTime.split("T");
  time = time.split(".")[0]; 
  async function expandOrder() {
    console.log("expand order")
  }
  return(
    <Flex
      className='arita'
      bg={"#CECACA"}
      height={"80px"}
      border={"2px solid #CECAB5"}
      borderRadius={"5px"}
      width={"600px"}
      margin={"10px"}
      padding={"10px"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Flex
        justifyContent={"space-between"}
        width={"80%"}
        alignItems={"center"}
      >
      <Text
        marginLeft={"20px"}
        fontSize={"xl"}
        fontWeight={"bold"}
      >{order?.id}</Text>
      <Text
        marginInline={"5px"}
        fontSize={"xl"}
        fontWeight={"bold"}
      >{order.isFinished && "Finished"}</Text>
        <Flex>
          <Text
            fontSize={"sm"}
            width={"100px"}
            display={"flex"}
            flexWrap={"wrap"}
            maxHeight={"50px"}
          >{date}</Text>
          <Text
            fontSize={"sm"}
            width={"100px"}
            display={"flex"}
            flexWrap={"wrap"}
            maxHeight={"50px"}
          >{time}</Text>
        </Flex>
      </Flex>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text
          marginInline={"20px"}
        >{order.total_cost}€</Text>
        <Button 
          marginInline={"5px"}
          onClick={onOpen} 
          bg="#EDF2F7" 
          _hover={{bg:"#024041", color: "white"}}
        >OPEN</Button>
      </Flex>


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>CONFIRMATION CODE</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            alignContent={"center"}
          >
            <Text
              fontSize={"5xl"}
              fontWeight={"bold"}
              padding={"50px"}
            >156382</Text>
          </ModalBody>
        </ModalContent>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Flex>
  )
}
  