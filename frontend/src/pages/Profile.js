import {
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  Box,
  VStack,
  Text,
  Image,
  useToast
} from "@chakra-ui/react";
import Placeholder from "../media/profile-placeholder.jpg";
import React, { useContext, useState, useRef, useEffect } from 'react';
import { createUser } from '../api';
import { AuthContext } from "../context/auth-context";
import { isTokenExpired } from "../util/helpers";
import { useNavigate } from 'react-router-dom';

export default function Profile () {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("auth", auth);
    if (!auth.isLoggedIn) {
      navigate("/auth");
    }
  }, [auth.isLoggedIn]);

  return(
    <Flex
      bg={"#a8a3a3"}
      width={"auto"}
      height={"auto"}
      justifyContent="center"
      alignContent={"center"}
    >
      <VStack>
      <Image src={Placeholder} 
        height={"150px"}
        borderRadius={"50%"}
        marginTop={"70px"}
        border={"1px solid grey"}
      ></Image> 
      <Text 
        display={"flex"}
        bg={"#a8a3a3"}
        justifyContent={"center"}
        fontSize="3xl" 
        fontWeight="bold" 
        paddingTop="20px"         
      >{auth.user?.username}</Text>
      <Text 
        display={"flex"}
        justifyContent={"center"}
        fontSize="1rem" >{auth.user.email}
      </Text>
      <Button
        onClick={() => {
          localStorage.removeItem("city-token");
          auth.setIsLoggedIn(false);
          localStorage.removeItem("city-user");
          navigate("/auth");
        }}
        colorScheme="red"
        marginTop={"20px"}
      >
        Log Out
      </Button>
      </VStack>
    </Flex>
  )
}