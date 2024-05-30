import React, {useEffect} from 'react';
import {
  Flex,
  Input,
  Button,
  // FormControl,
  // FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  // VStack,
  Text,
  useDisclosure,
  Toast
} from "@chakra-ui/react";
import { useContext, useState, useRef } from 'react';
import ItemInOrder from '../components/Cart/ItemInOrder';
import "../../src/style.css";
import { createOrderAsAdmin, createOrder } from '../api';
import { AuthContext } from '../context/auth-context';
import { useNavigate } from 'react-router-dom';

export default function CurrentOrder () {
  const [allItems, setAllItems] = useState([]);
  const [orderItemIds, setOrderItemIds] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const schedule = () => {
    const scheduleDate = date + " " + time;
    createOrder(auth.token, orderItems, orderTotal, scheduleDate).then(() => {
      localStorage.removeItem("currentOrder");
      setOrderItems([]);
      setOrderTotal(0);
      setAllItems([]);
      Toast({
        title: "Order placed",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();

      // removeItemAmounts(allItemsIds);
    });
  };

  const handleFinishOrder = async () => {
    if(auth.user.isAdmin){
      createOrderAsAdmin(auth.token, orderItemIds, orderTotal)
      .then(() => {
        localStorage.removeItem("currentOrder");
        setAllItems([]);
        setOrderTotal(0);
      })
    }else{
        onOpen();
    }
  };

  useEffect(() => {
    auth.isLoggedIn || navigate('/auth');

    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0].slice(0, 5);
    setDate(currentDate);
    setTime(currentTime);

    const currentOrder = JSON.parse(localStorage.getItem("currentOrder"));
    if(!currentOrder) return;
    let user = JSON.parse(localStorage.getItem("city-user"));
    if(user && currentOrder.userId != user.id){
      localStorage.removeItem("currentOrder");
      setAllItems([]);
      setOrderTotal(0);
    };
    setAllItems(currentOrder.items);
    setOrderItemIds(currentOrder.items.map((item) => item.id));
    
    setOrderItems(currentOrder.items);

    const total = currentOrder.items.reduce((sum, item) => sum + parseFloat(item.price), 0);
    setOrderTotal(total.toFixed(2));

    if (!auth.isLoggedIn) {
      navigate("/auth");
    }
  }, [auth.userId]);

  return (
    <Flex
      // height={"90vh"}
      flexDirection={"column"}
      bg={"#a8a3a3"}
    >
      <Text 
        display={"flex"}
        bg={"#a8a3a3"}
        justifyContent={"center"}
        fontSize="3xl" 
        fontWeight="bold" 
        color="grey" 
        padding="20px" 
      >
        Current Order
      </Text>

      
      <Flex
        bg={"#a8a3a3"}
        width={"auto"}
        height={"auto"}
        alignItems={"center"}
        flexDirection={"column"}
        marginBottom={"100px"}
      >
        {allItems.map((item) => {
          return (
          <ItemInOrder 
            key={allItems.indexOf(item)}
            item={item}
            setAllItems={setAllItems}
            setOrderTotal={setOrderTotal}
          />
          );
        })}
      </Flex>

      <Flex
        position={"fixed"}
        bg={"#8d8686"}
        bottom={"0"}
        width={"100%"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        height={"80px"}
        alignItems={"center"}
      >
        <Button
          bg="#7c0504" 
          _hover={{bg:"#400302", color: "white"}}
          marginLeft={"-100px"}
          color={"black"}
          onClick={() => {
            localStorage.removeItem("currentOrder");
            setOrderItems([]);
            setAllItems([]);
            setOrderTotal(0);
          }}
        >
          Cancel Order
        </Button>
        <Button
          color={"black"}
          marginInline={"20px"}
          bg="#047b7c" 
          _hover={{bg:"#023f40", color: "white"}} 
          onClick={handleFinishOrder}
        >
          Finish Order
        </Button>
        <Text
          fontSize={"2xl"}
          fontWeight={"bold"}
          display={"flex"}
          position={"absolute"}
          right={"20px"}
        >
          Total: {orderTotal}€
        </Text>

      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Schedule Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text  
              textAlign={"center"}
              justifySelf={"center"}
              margin={"20px"}
            >If you do not select a Date and Time, it will automatically be selected for after 10 minutes</Text>
            <Flex>
              <Input marginRight="10px" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              <Input marginLeft="10px" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button marginInline={"10px"} variant="ghost" onClick={onClose}>Go back</Button>
            <Button colorScheme="teal" mr={3} onClick={schedule}>
              Schedule
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}