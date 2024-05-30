import React, { useEffect, useState, useContext, useRef } from 'react';
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
  Select,
  Image,
  Box,
  useToast,
  FormControl,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { getItemById, deleteItem, updateItem } from '../../api';
import { AuthContext } from '../../context/auth-context';

export default function ItemCard (item) {
  const auth = useContext(AuthContext);
  const { isOpen: isNoteOpen, onOpen: onNoteOpen, onClose: onNoteClose } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let userId = auth.user.id;

  const fileInputRef = useRef();
  const priceRef = useRef();
  const amountRef = useRef();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const typeRef = useRef();

  const toast = useToast();

  const [noteValue, setnoteValue] = useState("");


  const formFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "image", label: "Image", type: "file" },
    { name: "description", label: "Description", type: "text" },
    { name: "price", label: "Price", type: "number" },
    { name: "amount", label: "Amount", type: "number"},
    { name: "type", label: "Type", type: "select", options: ["food", "drink", "snack", ""]},
  ];

  const inputRef = useRef();

  const handleSave = async (e) => {
    e.preventDefault();
    
    const nameValue = nameRef.current.value;
    let fileValue = fileInputRef.current.files[0];
    const priceValue = priceRef.current.value;
    const descriptionValue = descriptionRef.current.value;
    const amountValue = amountRef.current.value;
    const typeValue = typeRef.current.value;

    if (!fileValue) {
      fileValue = item.image;
    } 

    updateItem(auth.token, item.id, e
    //   {
    //   name: nameValue, 
    //   image: fileValue, 
    //   price: priceValue, 
    //   description: descriptionValue, 
    //   amount: amountValue,
    //   type: typeValue
    // }
  )
    .then((data) => {
      toast({
        title: "Item Updated",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    });
    onClose();
  }

  async function handleDelete() {
    const cityUser = JSON.parse(localStorage.getItem("city-user"));
    
    deleteItem(auth.token, item.id).then(() => {
      toast({
        title: "Item Deleted",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    });
  }

  function sendToCart(){
    getItemById(auth.token, item.id).then((item) => {
      item.note = noteValue || "";
  
      if (localStorage.getItem("currentOrder")) {
        const currentOrder = JSON.parse(localStorage.getItem("currentOrder"));
      
        if (currentOrder.userId !== userId) {
          currentOrder.items.push(item);
          localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
        } else {
          currentOrder.items.push(item);
          localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
        }
      } else {
        localStorage.setItem("currentOrder", JSON.stringify({userId, items: [item]}));
      }
      onNoteClose();
    }).catch((error) => {
      console.error('An error occurred:', error);
    });
  }
  function handleAddToOrder() {
    if(!auth.user.isAdmin ) {
      onNoteOpen();
    }else{
      sendToCart();
    }
    
  }

  return(
    <>
      <Flex 
        flexDirection="column"
        width="275px"
        height="560px"
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
          justifyContent={"center"}
        >
          <Text
            alignContent={"center"}
            fontSize="1.8rem"
            fontWeight="bold"
            height={"80px"}
            marginBottom={"10px"}
            marginInline={"10px"}
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
            marginTop={"10px"}
          >{item.price + "€" || "0€"}</Text>
          <Text
            fontSize="1rem"
            margin={"10px"}
            // height={"80px"}
          >{item.description}</Text>

          <Text
            fontSize="1rem"
            fontWeight="bold"
          >
            {item.type}
          </Text>
          {item.amount !== null  ? (
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Text
                fontSize={"2rem"}
                fontWeight={"bold"}
              >{item.amount || "0"}</Text>
              <Text marginTop={"-10px"} fontSize={"0.7rem"}>left</Text>
            </Flex>
          ) : (
            <></>
          )}
          
        </Box>
        <Flex 
          flexWrap={"wrap"}
          justifyContent={"center"}
        >
          {auth.user.isAdmin && (
            <>
              <Button 
                onClick={handleDelete} 
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
            </>
          )}
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
          <ModalHeader>Edit Item Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <form onSubmit={handleSave}>
                {formFields.map((field) => (
                  <FormControl padding="7px" key={field.name}>
                    <FormLabel 
                      fontSize="0.8rem" 
                      color="grey" 
                      marginBottom="-2px" 
                    >
                      {field.label}
                    </FormLabel>
                    
                    {field.type === "file" ? (
                      <Input
                        display={"flex"}
                        flexDirection={"column"}
                        paddingTop="10px"
                        border={"0px solid grey"}

                        type={field.type}
                        name={field.name}
                        accept='image/*' 
                        ref={fileInputRef}  
                        required
                      />
                    ) : field.name === 'price' ? (
                      <Input
                        type={field.type}
                        name={field.name}
                        
                        defaultValue={item.price}
                        ref={priceRef}
                        placeholder={"0.00"}
                        pattern="[0-9]*" 
                        step="0.01" 
                        min="0" 
                      />
                    ) : field.name === 'amount' ? (
                      <Input
                          ref={amountRef}
                          type={field.type}
                          name={field.name}
                          defaultValue={item.amount}
                        />
                    ) : field.name === 'name' ?(
                      <Input
                        type={field.type}
                        name={field.name}
                        defaultValue={item.name}
                        ref={nameRef}
                      />
                    ): field.name === 'type' ?(
                      <Select 
                        name={field.name} 
                        defaultValue={item.type} 
                        ref={typeRef}
                      >
                        <option value="food">Food</option>
                        <option value="drink">Drink</option>
                        <option value="snack">Snack</option>
                        <option value="other">Other</option>
                      </Select>
                    ): field.name === 'description' ? (
                      <Input
                        type={field.type}
                        name={field.name}
                        defaultValue={item.description}
                        ref={descriptionRef}
                      />
                    ) : (
                      <Input
                        type={field.type}
                        name={field.name}
                        // value={formData[field.name] || ''}
                        // onChange={handleEditChanging}
                        // required
                      />
                    )}
                  </FormControl>
                ))}
              </form>
          </ModalBody>

          <ModalFooter>
            <Button bg="#7c0504" _hover={{bg:"#400302", color: "white"}} mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button bg="#047b7c" 
              type='submit'
            _hover={{bg:"#023f40", color: "white"}} onClick={handleSave}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isNoteOpen} onClose={onNoteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send the Item with a Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input value={noteValue} onChange={(e) => setnoteValue(e.target.value)} placeholder="Enter a note for this item" />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onNoteClose}>
              Close
            </Button>
            <Button colorScheme='teal' onClick={sendToCart}>Send to Cart</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}