import React from 'react';
import Cappuccino from '../media/cappuccino.png';
import { useState } from 'react';
import { getItems } from '../api';
import {
  Flex,
  Button
} from '@chakra-ui/react';
import '../style.css';

export default function ItemCard (props) {
  const [count, setCount] = useState(0);
  console.log(props);
  function add(){
    setCount(oldValue => oldValue + 1);
    console.log(count);
  }

  function subtract(){
    if(count > 0){
      setCount(count - 1);
    }
  }

  function handleCall(){
    getItems();
  }
  return (
    <Flex 
      flexDirection="column"
      align-items="center"
      width="275px"
      height="435px"
      justifyContent="center" 
      alignItems={"center"}
      alignContent={"center"}   
      border="2px solid grey"
      borderRadius="10px"
      boxShadow={"3px 3px 20px 1px rgba(0,0,0,3)"}
      padding="10px" 
      margin="30px"
    >
      <Flex fontSize="2rem">
        <strong>
          Cappuccino
        </strong>
      </Flex>
      <img src={Cappuccino} alt='cappuccino'/>

      <Flex
        marginTop="20px"
        marginBottom="10px"  
        fontSize="2rem" 
        justifyContent="center"    
      >
        <strong>
          1.5€
        </strong>
      </Flex>

      <Button  
        justifyContent="center"    
        width="220px"
        height="30px"
        marginTop="10px"
      >
        Customise
      </Button>

      <Flex 
        width="220px" 
        height="30px"
        marginTop="10px"
        paddingInline="10px"
        justifyContent="space-between"
        alignItems="center"
        border="1px solid grey"
        borderRadius="5px"
      >
        <Button height="20px" width="20px" onClick={subtract}>-</Button>
        <div>{count}</div>
        <Button height="20px" width="20px" onClick={add}>+</Button>
      </Flex>

      <Button marginTop="10px" width="220px" height="30px" onClick={handleCall}>Add to Cart</Button>

    </Flex>
  );
};

