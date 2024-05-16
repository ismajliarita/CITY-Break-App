import {React, useEffect, useState, useContext} from 'react';
import {
  Flex,
  Text
} from "@chakra-ui/react";
import { AuthContext } from '../context/auth-context';

export default function HomePage() {
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/auth");
    }
  }, []);

  return (
    <Flex
      bg={"#a8a3a3"}
      justifyContent={"center"}
     >
      <Text 
        fontSize="3xl" 
        fontWeight="bold" 
        color="grey" 
        margin="20px" 
      >Home page
      </Text>
    </Flex>
  );
}