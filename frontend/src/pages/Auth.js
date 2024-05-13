import React, {useEffect} from 'react';
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
import { useState, useRef } from 'react';
import { createUser } from '../api';

export default function Auth () {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const toast = useToast();

  useEffect(() => {
    setUsername(email.split('@')[0]);
  }, [handleInputChange])
    
  async function handleInputChange(e) {
    const { name, value } = e.target;
    
    switch(name){
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    console.log("Login");
  }

  async function handleRegistering(e) {
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    e.preventDefault();
    // setUsername(email.split('@')[0]);
    console.log(username);
    createUser({email, username, password, isAdmin: false})
    .then((response) => {
      console.log(response);
      localStorage.setItem('city-token', response.token);
    })

    
  }

  return(
      
      <Flex
        justifyContent={"center"}
        marginTop={"100px"}
      >
      <Flex 
        bg={"#a8a3a3"}
        width={"300px"}
        border={"2px solid white"}
        margin={"10px"}
        justifyContent={"center"}
        padding={"10px"}
        fontSize={"1.5rem"}
        borderRadius={"10px"}
      >
        <form onSubmit={handleLogin}>
          <VStack spacing={4}>
            <Text marginTop={"20px"}>Login</Text>
            <FormControl>
              <FormLabel 
                fontSize="0.8rem" 
                color="grey" 
                marginBottom="-2px"
                marginTop={"10px"} >Email or Username</FormLabel>
              <Input type="text" 
                display={"flex"}
                flexDirection={"column"}
                id='emailField'
              />

              <FormLabel 
                fontSize="0.8rem" 
                color="grey" 
                marginBottom="-2px"
                marginTop={"20px"} >Password</FormLabel>
              <Input type="password" 
                display={"flex"}
                flexDirection={"column"}
                id='passwordField'
              />

            </FormControl>
            <Flex
              flexDirection={"row"}
            >
              <Button 
                onClick={handleRegistering}
                bg="#EDF2F7" 
                _hover={{bg:"#024041", color: "white"}}
                margin={"10px"}
                marginBottom={"20px"}
              >Register</Button>
              <Button 
                type="submit"
                bg="#EDF2F7" 
                _hover={{bg:"#024041", color: "white"}}
                margin={"10px"}
                marginBottom={"20px"}
              >Login</Button>
            </Flex>
          </VStack>
        </form>
      </Flex>
      <Flex 
        bg={"#a8a3a3"}
        width={"300px"}
        border={"2px solid white"}
        margin={"10px"}
        justifyContent={"center"}
        padding={"10px"}
        fontSize={"1.5rem"}
        borderRadius={"10px"}
      >
        <form onSubmit={handleRegistering}>
          <VStack spacing={4}>
            <Text marginTop={"20px"}>Register</Text>
            <FormControl>
              <FormLabel 
                fontSize="0.8rem" 
                color="grey" 
                marginBottom="-2px"
                marginTop={"10px"} >Email</FormLabel>
              <Input type="text" 
                required
                display={"flex"}
                flexDirection={"column"}
                id='regEmailField'
                name='email'
                value={email}
                onChange={handleInputChange}
              />

              <FormLabel 
                fontSize="0.8rem" 
                color="grey" 
                marginBottom="-2px"
                marginTop={"20px"} >Password</FormLabel>
              <Input type="password" 
                required
                display={"flex"}
                flexDirection={"column"}
                onChange={handleInputChange}                
                id='regPasswordField'
                name='password'
                value={password}
              />

              <FormLabel 
                fontSize="0.8rem" 
                color="grey" 
                marginBottom="-2px"
                marginTop={"20px"} >Confirm Password</FormLabel>
              <Input type="password" 
                required
                display={"flex"}
                flexDirection={"column"}
                id='confirmPasswordField'
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleInputChange}
              />

            </FormControl>
            <Button 
              type="submit"
              bg="#EDF2F7" 
              _hover={{bg:"#024041", color: "white"}}
              margin={"10px"}
              marginBottom={"20px"}
            >Register</Button>
          </VStack>
        </form>
      </Flex>
    </Flex>
  )
}