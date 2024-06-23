import React from 'react';
import {
  Flex,
  Input,
  Button,
  FormControl,
  Select, 
  FormLabel,
  VStack,
  Text,
  Toast
} from "@chakra-ui/react";
import { useState, useRef, useContext } from 'react';
import { createItem } from '../../api.js';
import { AuthContext } from '../../context/auth-context';

export default function AddItemForm() {
  const auth = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const fileInputRef = useRef();
  const formFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "image", label: "Image", type: "file" },
    { name: "description", label: "Description", type: "text" },
    { name: "price", label: "Price", type: "number" },
    { name: "amount", label: "Amount", type: "number"},
    { name: "type", label: "Type", type: "select", options: ["food", "drink","snack", ""]},
  ];

  const handleChange = (e) => {
    const {name, value, files} = e.target;

    if (files) {
      const file = files[0];
      const fileType = file.type; 
      const fileSize = file.size; 
      console.log("FILE FOR IMAGE TO CREAKE ITEM: ", fileInputRef.current.files[0]);
      // validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']; 
      if (!allowedTypes.includes(fileType)) {
        alert('Invalid file type. Only JPEG, JPG and PNG types are allowed.');
        fileInputRef.current.value = ''; 
        return;
      }
  
      // validate file size (max 5MB)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (fileSize > maxSize) {
        alert('File is too large. Maximum file size is 10MB.');
        fileInputRef.current.value = '';
        return;
      }
  
      setFormData({
        ...formData,
        [name]: file
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    createItem(auth.token, e)
      .then((response) => {
        Toast({
          title: "Item created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      });
    fileInputRef.current.value = ''; 
    setFormData({});
  }

  return (
    <Flex 
        flexDirection="column"
        align-items="center"
        minW="275px"
        width="275px"
        height="560px"
        justifyContent="center" 
        alignItems={"center"}
        alignContent={"center"}   
        border="2px solid grey"
        borderRadius="10px"
        boxShadow={"3px 3px 20px 1px rgba(0,0,0,3)"}
        padding="10px" 
        paddingBottom={"20px"}
        margin="30px"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={2}> 
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
                    onChange={handleChange}
                    accept='image/*' 
                    ref={fileInputRef}  
                    required
                  />
                ) : field.name === 'price' ? (
                  <Input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    placeholder={"0.00"}
                    pattern="[0-9]*" 
                    step="0.01" 
                    min="0" 
                    required
                  />
                ) : field.name === 'amount' ? (
                  <Input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                    />
                ) : field.name === 'type' ? (
                  <Select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required
                    // placeholder=" "
                  > 
                    <option value="food">Food</option>
                    <option value="drink">Drink</option>
                    <option value="snack">Snack</option>
                    <option value="">Other</option>
                  </Select>
                ) : (
                  <Input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required
                  />
                )}
              </FormControl>
            ))}
            <Button type="submit" marginTop={"10px"} bg="#047b7c" _hover={{bg:"#023f40", color: "white"}}>Submit</Button>
          </VStack>
        </form>
      </Flex>
  );
}