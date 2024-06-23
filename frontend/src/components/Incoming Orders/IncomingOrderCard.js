import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  useToast,
  FormControl,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { AuthContext } from '../../context/auth-context';
import { getOrderItems, setIsFinishedTrue, getUser } from "../../api";

export default function IncomingOrderCard ({order}) {
  const auth = useContext(AuthContext);
  const [orderItems, setOrderItems] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [orderUser, setOrderUser] = useState("ADMIN");

  useEffect(() => {
    getUser(auth.token, order.user_id).then((user) => {
      if(user.isAdmin == true){
        setOrderUser(`ADMIN`)
      }else{
        setOrderUser(`${user.username}`)
      }
    })
  }, [])

  let dateTime = order.order_date;
  let [date, time] = dateTime.split("T");
  time = time.split(".")[0]; 
  let [hours, minutes] = time.split(":");
  time = `${hours}:${minutes}`;

  let dateObj = new Date(date);

  let formattedDate = ("0" + dateObj.getDate()).slice(-2) + "-" + ("0" + (dateObj.getMonth() + 1)).slice(-2) + "-" + dateObj.getFullYear();
  
  date = formattedDate;



  async function notifyStudent(){
    setIsFinishedTrue(auth.token, order.id).then(() => {
      toast({
        title: "Student has been notified!",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      onClose();
    });
  }

  async function handleCross(){
    
  }

  async function openModal(){
    getOrderItems(auth.token, order.id).then((data) => {
      setOrderItems(data);
    });
    onOpen();
  }

  return(
    <>
      <Flex 
        alignItems={"center"} 
        border="2px solid grey"
        borderRadius="10px"
        boxShadow={"3px 3px 10px 1px rgba(0,0,0,3)"}
        padding="10px" 
        margin={"20px"}
        justifyContent={"space-between"}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"center"}
        >
          <Text 
            fontSize={"1.3rem"}
            fontWeight={"bold"}
            marginInline={"20px"}
          >Order {order.id}</Text>
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
            width={"150px"}
          >
            <Text fontSize={"0.7rem"}>Scheduled for:</Text>
            <Text>{date}</Text>
            <Text>{time}</Text>
          </Flex>
          
        </Box>
        <Flex 
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={"center"}
          alignContent={"center"}
        >
          <Button 
            marginLeft={"20px"}
            marginTop={0}
            onClick={openModal}
            bg="#047b7c" 
            _hover={{bg:"#023f40", color: "white"}} 
          >Open</Button>
          </Flex>
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
            <Button bg="#047b7c" 
              type='submit'
            _hover={{bg:"#023f40", color: "white"}} onClick={notifyStudent}>Finish and Notify Student</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}