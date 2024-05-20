import React, {useEffect, useState, useContext} from 'react';
import {
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import "../../src/style.css";
import { getItems } from '../api';
import AddItemForm from '../components/AllItems/AddItemForm';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../components/AllItems/ItemCard';
import { AuthContext } from '../context/auth-context';

export default function AllItems () {
  const auth = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();


  useEffect(() => {
    auth.isLoggedIn || navigate('/auth');
    getItems()
    .then((items) => {
      return Promise.all(
        items.map(async (item) => {
          const image = "http://localhost:8081/api/items/" + item.id + "/image"
          return { ...item, image };
        })
      );
    })
    .then((itemsWithImages) => {
      setItems(itemsWithImages);
    });
    if(auth.user.isAdmin && currentPage === 1){
      setItemsPerPage(4);
    }
  }, []);

  return (
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
        All Items
      </Text>
      <Flex
        justifyContent={"center"}
        marginTop={"20px"}
      >
        <FormControl 
          padding="7px"
          width={"50%"}
          marginBottom={"20px"}
          display={"flex"}
          flexDirection={"column"}
          >
          <FormLabel 
            fontSize="0.8rem" 
            color="grey" 
            marginBottom="-2px" 
          >
            Search Items by Name, Description, or Price
          </FormLabel>
          <Input 
            value={searchTerm}
            border={"2px solid #404040"}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </FormControl>
      </Flex>
      {/* The list of items */}
      <Flex
        flexDirection="row"
        flexWrap="wrap"
      >
        {auth.user.isAdmin && (
          <AddItemForm />
        )}
        {items.filter(item => 
          item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.price.toString().includes(searchTerm)
        )
        .sort((a, b) => (b.amount === 0 ? -1 : 0) - (a.amount === 0 ? -1 : 0))
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        
        .map((item) => (
          <ItemCard 
            key={item.id}
            name={item.item_name}
            price={item.price}
            description={item.description}
            image={item.image}
            amount={item.amount}
            id={item.id}
          />
        ))}
      </Flex>
      <Box
        display={"flex"}
        justifyContent={"center"}
        marginTop={"20px"}
        marginBottom={"20px"}
        alignItems={"center"}
      >
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className='next-prev-button'
          // style={{
          //   border:'1px solid black',
          //   padding: '10px',
          //   width: '150px',
          //   backgroundColor: 'grey',
          //   paddingInline: '10px',
          //   borderRadius: '5px'
          // }}
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
          disabled={items.length < currentPage * itemsPerPage}
        >
          Next Page
        </button>
      </Box>
    </Flex>
  );
}