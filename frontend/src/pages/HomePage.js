import {React, useEffect, useState, useContext} from 'react';
import {
  Flex,
  Text
} from "@chakra-ui/react";
import { AuthContext } from '../context/auth-context';
import { ItemsContext } from '../context/items-context';
import { getItems } from '../api';

export default function HomePage() {
  const auth = useContext(AuthContext);
  const itemContext = useContext(ItemsContext);
  const [top3Items, setTop3Items] = useState([]);

  useEffect(() => {
    
  }, []);



  return (
    <Flex
      bg={"#a8a3a3"}
      alignItems={"center"}
      flexDirection={"column"}
     >
      <Text 
        fontSize="3xl" 
        fontWeight="bold" 
        color="grey" 
        margin="20px" 
      >Home page
      </Text>
      <Flex
        bg={"#B5B5B5"}
        height={"80px"}
        border={"1px solid #CECAB5"}
        borderRadius={"5px"}
        width={"70%"}
        margin={"10px"}
        padding={"10px"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text>
          Announcements
        </Text>
        <Flex>

        </Flex>
      </Flex>

      <Flex
        bg={"#B5B5B5"}
        height={"80px"}
        border={"1px solid #CECAB5"}
        borderRadius={"5px"}
        width={"70%"}
        margin={"10px"}
        padding={"10px"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text>
          Refently refilled items
        </Text>
        <Flex>

        </Flex>
      </Flex>
    </Flex>
  );
}