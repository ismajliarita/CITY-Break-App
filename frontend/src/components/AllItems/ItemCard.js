import React, { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  Box,
} from "@chakra-ui/react";
import EditItemModal from './EditItemModal';
import { getItems, getItemById, subtractAmount } from '../../api';


export default function ItemCard (item) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isDeleteOpen, onDeleteOpen, onDeleteClose } = useDisclosure();

  async function handleEdit() {
    const items = await getItems();
    console.log(items);
  }

  function handleAddToOrder() {
    getItemById(item.id)
      .then((item) => {
        // addItemToOrder(item)
        subtractAmount(item.id)
        .then((item) => {
          console.log("subtracted", item.amount);
          getItemById(item.id).then((item) => {
            console.log("item", item);
            localStorage.setItem("currentOrder", JSON.stringify(item));
          })
        })
      })
  }

  return(
    <>
      <Flex 
        flexDirection="column"
        width="275px"
        height="510px"
        alignItems={"center"} 
        border="2px solid grey"
        borderRadius="10px"
        boxShadow={"3px 3px 20px 1px rgba(0,0,0,3)"}
        padding="10px" 
        margin="30px"
        justifyContent={"space-between"}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Text
            fontSize="2rem"
            fontWeight="bold"
            marginBottom={"10px"}
          >{item.name || "name"}</Text>
          <Image
            src={item.image} 
            alt={item.name}
            width="240px"
            height="150px"
            objectFit="cover"
          />
          <Text
            fontSize="1.5rem"
            fontWeight="bold"
            marginTop={"20px"}
          >{item.price + "€" || "0€"}</Text>
          <Text
            fontSize="1rem"
            margin={"10px"}
          >{item.description}</Text>
          <Text
            fontSize={"2rem"}
            fontWeight={"bold"}
          >{item.amount || "0"}</Text>
          <Text marginTop={"-10px"} fontSize={"0.7rem"}>left</Text>
        </Box>
        <Flex 
          flexWrap={"wrap"}
          justifyContent={"center"}
        >
          <Button 
            onClick={onDeleteOpen} 
            bg="#7c0504" 
            _hover={{bg:"#400302", color: "white"}}
            margin={"10px"}  
          >Delete</Button>
          <Button 
            onClick={onOpen} 
            margin={"10px"}
            bg="#047b7c" 
            _hover={{bg:"#023f40", color: "white"}} 
            ml={5}
          >Edit</Button>
          <Button 
            margin={"10px"}
            marginTop={0}
            onClick={handleAddToOrder} 
            bg="#047b7c" 
            _hover={{bg:"#023f40", color: "white"}} 
          >Add To Order</Button>
          </Flex>
      </Flex>


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Eu dolor cillum commodo in aliquip cupidatat cillum enim aliquip occaecat minim. Excepteur aliqua ea voluptate aliqua proident culpa magna cillum aliquip ex voluptate exercitation esse fugiat. Amet deserunt cillum aute adipisicing voluptate nulla amet. In labore anim enim irure nulla in ullamco labore mollit. Irure ex ipsum occaecat consectetur reprehenderit. Occaecat nisi sint tempor labore do labore minim. Ut anim exercitation duis et ea consectetur ut in dolor cupidatat excepteur laboris magna laboris.
          </ModalBody>

          <ModalFooter>
            <Button bg="#7c0504" _hover={{bg:"#400302", color: "white"}} mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button bg="#047b7c" _hover={{bg:"#023f40", color: "white"}} onClick={handleEdit}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}