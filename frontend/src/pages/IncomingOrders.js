import {React, useEffect, useContext, useState} from 'react';
import {
  Flex,
  Text,
  Button
} from "@chakra-ui/react";
import { AuthContext } from '../context/auth-context';
import { useNavigate } from 'react-router-dom';

export default function IncomingOrders() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  useEffect(() => {

    auth.isLoggedIn || navigate('/auth');
    if(auth.isLoggedIn){
      auth.user.isAdmin || navigate('/');
    }
  }, []);
  return (
    <Flex
      bg={"#a8a3a3"}
      alignItems={"center"}
      flexDirection={"column"}
     >
      <Text 
        fontSize="3xl" 
        fontWeight="bold" 
        color="grey" 
        margin="20px" 
      >
        Incoming Orders
      </Text>
      
    </Flex>
  );
}