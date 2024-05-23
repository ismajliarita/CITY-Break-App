import {
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  Box,
  VStack,
  Table,
  Thead,
  Tbody,
  Td,
  Tr,
  Th,
  Text,
  useToast,
  Toast
} from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from 'react';
import { getAllUsers, deleteUser } from '../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/auth-context";

export default function Admin () {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    auth.isLoggedIn || navigate('/auth');
    if (auth.isLoggedIn) {
      auth.user.isAdmin || navigate('/');
    }

    getAllUsers(auth.token)
      .then((users) => {
        setUsers(users);
      });
  }, []);

  const handleDelete = async (id) => {
    deleteUser(auth.token, id).then(() => {
      Toast({
        title: "User deleted",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setUsers(users.filter(user => user.id !== id));
    });
  }
  

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return(
    <Flex
      flexDirection="column"
      justifyContent={"center"}
      bg={"#a8a3a3"}
    >
      <Text
        display={"flex"}
        justifyContent={"center"}
        fontSize="3xl"
        fontWeight="bold"
        color="grey"
        margin="20px"
      >
        Admin
      </Text>
      <Flex
        justifyContent={"center"}
        marginTop={"20px"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Input 
          placeholder="Search by email or username" 
          width={"80%"} 
          marginBottom={"20px"} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <Table
          border={"2px solid grey"}
          borderRadius={"10px"}
          boxShadow={"3px 3px 20px 1px rgba(0,0,0,3)"}
          padding="40px"
          width={"80%"}>
          <Thead>
            <Tr>
              <Th>Email</Th>
              <Th>Username</Th>
              <Th>Admin</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredUsers.map((user) => (
              <Tr key={user.id}>
                <Td>{user.email}</Td>
                <Td>{user.username}</Td>
                <Td>{user.isAdmin ? 'Yes' : 'No'}</Td>
                <Td marginRight={0} textAlign={"right"}>
                  <Button margin={"10px"} colorScheme="red" marginLeft={"10px"} onClick={() => handleDelete(user.id)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  )
}