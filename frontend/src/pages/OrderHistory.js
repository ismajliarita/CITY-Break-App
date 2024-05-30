import React, { useState, useEffect, useContext } from 'react';
import { Flex, Text, Button, Input, Box } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import Order from '../components/OrderHistory/Order';
import { getFinishedOrders, getOrders } from '../api';
import { AuthContext } from '../context/auth-context';

export default function OrderHistory() {
  const [allOrders, setAllOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchDate, setSearchDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(20);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    auth.isLoggedIn || navigate('/auth');

    if(auth.user){
      if (auth.user.isAdmin) {
        getFinishedOrders(auth.token, auth.user?.id)
          .then((finishedOrders) => {
            setAllOrders(finishedOrders);
          });
      } else {
        getOrders(auth.token, auth.user?.id)
          .then((orders) => {
            setAllOrders(orders);
          });
      }
    }
  }, []);

  const sortedAndSearchedOrders = allOrders
  .filter(order => !searchDate || new Date(order.order_date).toDateString() === new Date(searchDate).toDateString())
  .sort((a, b) => a.isFinished - b.isFinished)
  .sort((a, b) => 
    sortOrder === 'desc' ? 
    new Date(b.order_date) - new Date(a.order_date) : 
    new Date(a.order_date) - new Date(b.order_date)
  )

  const paginatedOrders = sortedAndSearchedOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

  return (
    <>
      <Text 
        display={"flex"}
        bg={"#a8a3a3"}
        justifyContent={"center"}
        fontSize="3xl" 
        fontWeight="bold" 
        color="grey" 
        padding="20px" 
      >
        Order History
      </Text>
      <Flex
        justifyContent={"center"}
      >
        <Input margin={"10px"} type="date" width={"160px"} onChange={(e) => setSearchDate(e.target.value)} />
        <Button margin={"10px"} onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}>Sort by date</Button>
      </Flex>
      <Flex
        flexDirection={"column"}
        minHeight={"72vh"}
        justifyContent={"space-between"}
        bg={"#a8a3a3"}
        width={"auto"}
        height={"auto"}
        alignItems="center"
      >
        <Flex
          flexDirection={"column"}
        >
          {paginatedOrders.map((order) => (
            <Order 
              key={order.id}
              order={order}
            />
          ))}
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
            disabled={sortedAndSearchedOrders.length <= currentPage * ordersPerPage}
          >
            Next Page
          </button>
        </Box>
      </Flex>
    </>
  );
}