import {
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  Box,
  VStack,
  Link,
  Text,
  useToast
} from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, loginUser } from '../api';
import { isTokenExpired } from '../util/helpers';
import { AuthContext } from "../context/auth-context";

export default function Auth () {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loginEmail, setLoginEmail] = useState(""); 
  const [loginPassword, setLoginPassword] = useState("");  

  const [isRegistering, setIsRegistering] = useState(false);
  
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Auth.js", auth);
    if (isTokenExpired(localStorage.getItem('city-token'))) {
      localStorage.removeItem("token");
      auth.setIsLoggedIn(false);
      navigate("/auth");
    }else {
      auth.setIsLoggedIn(true);
    }

    if (auth.isLoggedIn) {
      navigate("/profile");
      auth.setIsLoggedIn(true);
      // auth.setUser({id:})
    }else{
      navigate("/auth");
    }

  }, []);
  
  const toast = useToast();

  useEffect(() => {
    setUsername(email.split('@')[0]);
  }, [handleInputChange])

  async function handleForgotPassword() {
    
  };
    
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

  async function handleLoginInputChange(e) {
    const { name, value } = e.target;
    
    switch(name){
      case "email":
        setLoginEmail(value);
        break;
      case "password":
        setLoginPassword(value);
        break;
      default:
        break;
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    loginUser({email: loginEmail, password: loginPassword})
    .then((response) => {
      // console.log("loginEmail: ", loginEmail, " loginPassword: ", loginPassword);
      
      localStorage.setItem('city-token', response.token);
      localStorage.setItem('city-user', JSON.stringify(response.user));

      auth.setIsLoggedIn(true);

      auth.setToken(response.token);
      auth.setUser(response.user);
      // console.log("response when u login or register", response);

      
      navigate('/profile');
    })
    
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
    
    createUser(email, username, password)
    .then((response) => {
        auth.setIsLoggedIn(true);
        auth.setToken(response.token);
        localStorage.setItem('city-user', JSON.stringify(response.user));
        auth.setUser(response.user);
      })
      
      navigate('/profile');
  }

  return(
      
    <Flex
      justifyContent={"center"}
      marginTop={"100px"}
      
    >
      {(!isRegistering ?
        <Flex 
          bg={"#a8a3a3"}
          width={"280px"}
          border={"2px solid white"}
          flexDirection={"column"}
          margin={"10px"}
          alignItems={"center"}
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
                  marginTop={"10px"} >Email</FormLabel>
                <Input type="text" 
                  display={"flex"}
                  flexDirection={"column"}
                  name='email'
                  value={loginEmail}
                  id='emailField'
                  onChange={handleLoginInputChange}
                />
                <FormLabel 
                  fontSize="0.8rem" 
                  color="grey" 
                  marginBottom="-2px"
                  marginTop={"20px"} >Password</FormLabel>
                <Input type="password" 
                  display={"flex"}
                  flexDirection={"column"}
                  value={loginPassword}
                  name='password'
                  id='passwordField'
                  onChange={handleLoginInputChange}
                />
                <Button 
                  fontSize={"0.7rem"}
                  _hover={{color: "black"}}
                  textDecoration={"underline"}
                  variant="link"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </Button>
              </FormControl>
                <Button 
                  type="submit"
                  bg="#EDF2F7" 
                  _hover={{bg:"#024041", color: "white"}}
                  margin={"10px"}
                  onClick={handleLogin}
                  >Login</Button>
            </VStack>
          </form>
          <Link 
            marginBottom={"20px"}
            textDecoration={"underline"}
            fontSize={"0.7rem"} 
            onClick={() => setIsRegistering(true)}>
            Sign up instead
          </Link>
        </Flex> :
        // Register form
        <Flex 
          bg={"#a8a3a3"}
          width={"280px"}
          border={"2px solid white"}
          margin={"10px"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
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
                >Register</Button>
            </VStack>
          </form>
          <Link 
            marginBottom={"20px"}
            textDecoration={"underline"}
            fontSize={"0.7rem"} 
            onClick={() => setIsRegistering(false)}>
            Login instead
          </Link>
        </Flex>
      )}

    </Flex>
  )
}