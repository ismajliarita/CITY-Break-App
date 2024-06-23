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
  Box,
  ModalBody,
  ModalCloseButton,
  Table,
  Tr,
  Td,
  Toast,
  Th,
  Thead,
  Tbody,
  useDisclosure,
} from "@chakra-ui/react";
import { AuthContext } from '../../context/auth-context';
import { getOrderItems, getUser, setIsTakenTrue } from '../../api';

export default function Order ({order}) {
  const auth = useContext(AuthContext);
  const [orderItems, setOrderItems] = useState([]);
  const [orderUser, setOrderUser] = useState("ADMIN");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isDeleteOpen, onDeleteOpen, onDeleteClose } = useDisclosure();
  const [isFinished, setIsFinished] = useState();

  useEffect(() => {
    
    getUser(auth.token, order.user_id).then((user) => {
      if(user.isAdmin == true){
        setOrderUser(`ADMIN`)
      }else{
        setOrderUser(`${user.username}`)
      }
    })
    
    if(order.isFinished && order.isTaken){
      setIsFinished("FINISHED");
    }else if(order.isFinished && !order.isTaken){
        setIsFinished("WAITING FOR PICKUP");
    }else{
      setIsFinished("UNFINISHED");
    }
  }, [])

  let dateTime = order.order_date;
  let [date, time] = dateTime.split("T");
  time = time.split(".")[0]; 
  let [hours, minutes] = time.split(":");
  time = `${hours}:${minutes}`;

  let dateObj = new Date(date);

  let formattedDate = ("0" + dateObj.getDate()).slice(-2) + "-" + ("0" + (dateObj.getMonth() + 1)).slice(-2) + "-" + dateObj.getFullYear();
  
  date = formattedDate;

  async function handlePickUp(){
    console.log(order.id, "HANDLE PICK UP");
    setIsTakenTrue(auth.token, order.id).then(() => {
      Toast({
        title: "Order has been picked up!",
        status: "success",
        duration: 6000,
        isClosable: true,
      })
      setIsFinished("FINISHED");
    })
    onClose();
  }

  async function openModal(){
    getOrderItems(auth.token, order.id).then((data) => {
      setOrderItems(data);
      getUser(auth.token, order.user_id).then((user) => {
        if(user.isAdmin == true){
          setOrderUser(`ADMIN`)
        }else{
          setOrderUser(`${user.username}`)
        }
      })
    });
    onOpen();
  }


  return(
    <Flex
      className='arita'
      bg={"#CECACA"}
      height={"80px"}
      border={"2px solid #CECAB5"}
      borderRadius={"5px"}
      width={"700px"}
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
          width={"120px"}
        >{isFinished}</Text>
        <Flex
          direction={"column"}
          alignItems={"center"}
          width={"150px"}
        >
          <Text fontSize={"0.7rem"}>
            Created by: 
          </Text>
          <Text
            textAlign={"center"}  
          >
            {orderUser}
          </Text>
        </Flex>
        <Flex 
          direction={"column"}
          alignItems={"center"}
        >
          <Text fontSize={"0.7rem"}>
            Scheduled for:
          </Text>
          <Text
            fontSize={"sm"}
            flexWrap={"wrap"}
            maxHeight={"50px"}
            fontWeight={"bold"}
          >{date}</Text>
          <Text
            fontSize={"sm"}
            maxHeight={"50px"}
            fontWeight={"bold"}
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
          onClick={openModal} 
          bg="#EDF2F7" 
          _hover={{bg:"#024041", color: "white"}}
        >OPEN</Button>
        <button
          className="button-picked-up"
          onClick={handlePickUp}
          disabled={order.isTaken}
        >
          Picked Up
        </button>
      </Flex>


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={"700px"} overflow="auto" maxH="1000px">
          <ModalHeader>Details of Order {order.id} 
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              margin={"10px"}
              alignItems={"center"}
            >
              <Text marginInline={"20px"} fontSize={"1rem"}>CONFIRMATION CODE:</Text> 
              <Text 
              bg={"#cccccc"}
              padding={"10px"}
              paddingInline={"20px"}
              borderRadius={"10px"}
              fontWeight={"bold"} fontSize="1.9rem">{order.confirmation_code}</Text>
            </Flex>
            <Flex
              margin={"10px"}
              alignItems={"center"}
            >
              <Text marginInline={"20px"} fontSize={"1rem"}>USER: </Text>
              <Text
              padding={"10px"}
              borderRadius={"10px"} 
              fontSize="1rem">{orderUser}</Text>
            </Flex>
            <Table
              border={"1px solid grey"}
              borderRadius="20px"
              variant={"striped"}
              overflow={"hidden"}
            > 
              <Thead>
                <Tr >
                  <Th>Item</Th>
                  <Th>Quantity</Th>
                  <Th>Note</Th>
                  <Th>Description</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orderItems.map((item) => {
                    return(
                      <Tr key={item.id}>
                        <Td>{item.item_name}</Td>
                        <Td>{item.item_quantity}</Td>
                        <Td>
                          <Box overflow="auto" width={"100px"} maxH="80px">
                            {item.note}
                          </Box>  
                        </Td>
                        <Td>
                          <Box overflow="auto" width={"100px"} maxH="80px">
                            {item.item_description}
                          </Box></Td>
                      </Tr>
                    )
                  })
                }
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button bg="#7c0504" _hover={{bg:"#400302", color: "white"}} mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
  