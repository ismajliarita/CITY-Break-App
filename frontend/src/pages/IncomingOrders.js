import {React, useEffect, useContext, useState} from 'react';
import {
  Flex,
  Text,
  Button,
  Box
} from "@chakra-ui/react";
import { AuthContext } from '../context/auth-context';
import { useNavigate } from 'react-router-dom';
import { getIncomingOrders } from "../api";
import IncomingOrderCard from '../components/Incoming Orders/IncomingOrderCard';

export default function IncomingOrders() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 15;

  useEffect(() => {
    auth.isLoggedIn || navigate('/auth');
    if(auth.isLoggedIn){
      auth.user.isAdmin || navigate('/');
    }

    getIncomingOrders(auth.token).then((data) =>{
      setOrders(data);
    });
  }, []);

  const paginatedOrders = orders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

  return (
    <Flex
      flexDirection={"column"}
      minHeight={"90vh"}
      justifyContent={"space-between"}
      bg={"#a8a3a3"}
      alignItems={"center"}
    >
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text 
          fontSize="3xl" 
          fontWeight="bold" 
          color="grey" 
          margin="20px" 
        >
          Incoming Orders
        </Text>
        <Flex
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {paginatedOrders.map((order) => {
            return(
              <IncomingOrderCard 
                key={order.id}
                order={order}
              />
          )
          })}
        </Flex>
      </Flex>
      <Box
        display={"flex"}
        justifyContent={"center"}
        padding={"20px"}
        alignItems={"center"}
      >
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className='next-prev-button'
          disabled={currentPage === 1}
          margin={"5px"}
        >
          Previous Page
        </button>
        <Text
          marginInline={"20px"}
          fontSize={"1.5rem"}
          fontWeight={"bold"}
        >
          {currentPage}
        </Text>
        <button
          className='next-prev-button'
          onClick={() => setCurrentPage(currentPage + 1)}
          margin={"5px"}
          disabled={orders.length <= currentPage * ordersPerPage}
        >
          Next Page
        </button>
      </Box>
    </Flex>
  );
}