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
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/auth-context";

export default function Admin () {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  
  useEffect(() => {
    auth.isLoggedIn || navigate('/auth');
    auth.user.isAdmin || navigate('/');
  }, []);
  return(
    <Flex>
      <VStack>
        <Text>Admin</Text>
      </VStack>
    </Flex>
  )
}