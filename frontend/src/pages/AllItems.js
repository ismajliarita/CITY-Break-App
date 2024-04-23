import React, {useEffect} from 'react';
import {
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Text
} from "@chakra-ui/react";
import { useState, useRef } from 'react';
import { getItemImage, getItems } from '../api';
// import ItemCard from '../components/ItemCard';
import AddItemForm from '../components/AllItems/AddItemForm';
import ItemCard from '../components/AllItems/ItemCard';

export default function AllItems () {
  
  const [items, setItems] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <Flex  
      flexDirection="column"
      justifyContent={"center"}
      bg={"#a8a3a3"}
     >
      <Text 
        fontSize="3xl" 
        fontWeight="bold" 
        color="grey" 
        margin="20px" 
        display={"flex"}
        justifyContent={"center"}
      >
        Add New Item
      </Text>

        {/* The list of items */}
        <Flex
          flexDirection="row"
          flexWrap="wrap"
        >
        <AddItemForm />
          {items.map((item) => (
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
    </Flex>
  );
}