import React, {useEffect} from 'react';
import {
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Text,
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

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const handleFinishOrder = async () => {
    if(auth.user.isAdmin){
      createOrderAsAdmin(auth.token, orderItemIds, orderTotal)
      .then(() => {
        localStorage.removeItem("currentOrder");
        setAllItems([]);
        setOrderTotal(0);
        // removeItemAmounts(allItemsIds);
      })
    }else{
      console.log(orderItems);
      createOrder(auth.token, orderItems, orderTotal).then(() => {
        localStorage.removeItem("currentOrder");
        setAllItems([]);
        setOrderItems([]);
        setOrderTotal(0);
        Toast({
          title: "Order placed",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        // removeItemAmounts(allItemsIds);
      });
    }
  };

  useEffect(() => {
    auth.isLoggedIn || navigate('/auth');
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
    </Flex>
  );
}