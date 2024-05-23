import React, {useContext} from 'react';
import {
  Flex,
  Button,
  Text
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
      <Flex
        justifyContent={"space-between"}
        width={"80%"}
        alignItems={"center"}
      >
        <Text
          marginInline={"5px"}
          fontSize={"xl"}
          fontWeight={"bold"}
        >{item.item_name}</Text>
        <Text
          fontSize={"sm"}
          width={"250px"}
          display={"flex"}
          flexWrap={"wrap"}
          maxHeight={"50px"}
        >{item.description}</Text>
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