import React, {useContext} from 'react';
import {
  Flex,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import { AuthContext } from '../../context/auth-context';

export default function ItemInOrder ({item, setAllItems, setOrderTotal}) {
  const auth = useContext(AuthContext);
  const userId = auth.user.id;

  async function removeItem() {
    let currentOrder = JSON.parse(localStorage.getItem("currentOrder"));
    let found = false;
    let newItems = currentOrder.items.filter((i, index) => {
      if (!found && i.id === item.id) {
        found = true;
        return false;
      }
      return true;
    });
    currentOrder.items = newItems;
    localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
    
    setAllItems(newItems); 

    const total = currentOrder.items.reduce((sum, item) => sum + parseFloat(item.price), 0);
    setOrderTotal(total.toFixed(2));
  }

  
  return (
    <Flex
      bg={"#CECACA"}
      height={"80px"}
      border={"2px solid #CECAB5"}
      borderRadius={"5px"}
      width={"600px"}
      margin={"10px"}
      padding={"10px"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
        <Text
          marginInline={"5px"}
          fontSize={"xl"}
          fontWeight={"bold"}
          width={"150px"}
          display={"flex"}
          flexWrap={"wrap"}
        >{item.item_name}</Text>
        <Text
          fontSize={"sm"}
          width={"150px"}
          display={"flex"}
          flexWrap={"wrap"}
          maxH={"50px"}
          overflowY={"scroll"}
          css={{
            '&::-webkit-scrollbar': {
              width: '10px',
            }
          }}  
        >{item.description}</Text>


      <Flex 
        height={"60px"}
        width={"140px"}
        direction={"column"}
      >
        <Text fontSize={"0.7rem"}>Note:</Text>
        <Box
          overflowY={"scroll"}
          width={"140px"}
          fontSize={"0.8rem"}
          css={{
            '&::-webkit-scrollbar': {
              width: '10px',
            }
          }}
          bg={"rgba(125, 125, 125, 0.5)"}
          borderRadius={"3px"}
          padding={"5px"}
        >
          {item.note ? item.note : "No note"}
        </Box>
      </Flex>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text
          marginInline={"30px"}
        >{item.price}€</Text>
        <Button 
          onClick={removeItem}
          marginInline={"5px"}
          bg="#EDF2F7" 
          _hover={{bg:"#024041", color: "white"}}
        >Delete</Button>
      </Flex>
    </Flex>
  );

}