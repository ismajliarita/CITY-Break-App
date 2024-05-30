import React, {useContext, useEffect, useState } from 'react';
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
import { AuthContext } from '../../context/auth-context';

export default function Order ({order}) {
  const auth = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isDeleteOpen, onDeleteOpen, onDeleteClose } = useDisclosure();
  const [isFinished, setIsFinished] = useState();

  useEffect(() => {
    if(order.isFinished){
      setIsFinished("FINISHED");
    }else{
      setIsFinished("UNFINISHED");
    }
  }, [])

  let dateTime = order.order_date;
  let [date, time] = dateTime.split("T");
  time = time.split(".")[0]; 
  async function expandOrder() {
    // console.log("expand order")
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
        marginInline={"15px"}
        fontSize={"xl"}
        fontWeight={"bold"}
      >{isFinished}</Text>
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
          onClick={expandOrder} 
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
  