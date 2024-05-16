import {
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  Box,
  VStack,
  Text,
  useToast
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from 'react';
import {  } from '../api';
import { AuthContext } from "../context/auth-context";

export default function Admin () {
  const auth = useContext(AuthContext);
  useEffect(() => {
    
    if (!auth.isLoggedIn) {
      navigate("/auth");
    }
  }, []);
  return(
    <Flex>
      <VStack>
        <Text>Admin</Text>
      </VStack>
    </Flex>
  )
}