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
  useToast,
  Toast
} from "@chakra-ui/react";
import Placeholder from "../media/profile-placeholder.jpg";
import React, { useContext, useState, useRef, useEffect } from 'react';
import { changeUsername, changePassword, deleteUser, getOrders, getUser } from '../api';
import { AuthContext } from "../context/auth-context";
import { isTokenExpired } from "../util/helpers";
import Order from "../components/OrderHistory/Order";
import { useNavigate } from 'react-router-dom';

export default function Profile () {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/auth");
    }
    getOrders(auth.token, auth.user.id).then((data) => {
      Promise.all(data.map((order) => getUser(auth.token, order.user_id)))
        .then((users) => {
          const ordersWithUsers = data.map((order, index) => {
            return { ...order, user: users[index] };
          });
          
          const filteredOrders = ordersWithUsers.filter(
            order => 
            order.isFinished && 
            !order.isTaken && 
            !order.user.isAdmin &&
            auth.user.id === order.user.id,
          );

          setOrders(filteredOrders);
        });
    });
  }, [auth.isLoggedIn]);

  const handleChangeUsername = () => {
    const newUsername = prompt("Enter new username");
    if (newUsername) {
      changeUsername(auth.token, auth.user.id, newUsername)
      .then(() => {
        localStorage.setItem("city-user", JSON.stringify({ ...auth.user, username: newUsername }));
        auth.setUser({ ...auth.user, username: newUsername });

        // console.log(username);
      });
    }
  };

  const handleChangePassword = () => {
    const oldPassword = prompt("Enter old password");
    const newPassword = prompt("Enter new password");
    const confirmPassword = prompt("Confirm new password");
    if (newPassword) {
      changePassword(auth.token, auth.user.id, {oldPassword, newPassword, confirmPassword}).then(() => {
        Toast ({
          title: "Password changed",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      });
      
    }
  };

  const handleDeleteAccount = () => {
    const confirm = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirm) {
      deleteUser(auth.token, auth.user.id).then(() => {
        auth.setIsLoggedIn(false);
        localStorage.removeItem("city-token");
        localStorage.removeItem("city-user");
        navigate("/auth");
        Toast({
          title: "Account deleted",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        window.location.reload();
      });
    }
  };


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
        fontSize="1rem" >{auth.user?.email}
      </Text>
      <Flex
        width={"330px"}
        marginTop={"20px"}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        <Button
          onClick={() => {
            localStorage.removeItem("city-token");
            auth.setIsLoggedIn(false);
            localStorage.removeItem("city-user");
            navigate("/auth");
            window.location.reload();
          }}
          colorScheme="red"
          margin={"5px"}
        >
          Log Out
        </Button>
        <Button 
          margin={"5px"} 
          colorScheme="teal"
          onClick={handleChangeUsername}
        >
          Change Username
        </Button>
        <Button 
          margin={"5px"} 
          colorScheme="teal"
          onClick={handleChangePassword}
        >
          Change Password
        </Button>
        <Button 
          margin={"5px"} 
          colorScheme="red"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </Button>
      </Flex>

      <Flex
        marginTop={"40px"}
        direction={"column"}
      >
      {orders.map((order) => {
        return (
          <Order 
            key={orders.indexOf(order)}
            order={order}
          />
        );
      })}
      </Flex>
    </VStack>
  </Flex>
  )
}