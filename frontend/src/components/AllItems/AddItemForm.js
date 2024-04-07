import React from 'react';
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
import { createItem } from '../../api.js';

export default function AddItemForm() {
  const [formData, setFormData] = useState({});
  const fileInputRef = useRef();
  const formFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "image", label: "Image", type: "file" },
    { name: "description", label: "Description", type: "text" },
    { name: "price", label: "Price", type: "number" },
    { name: "amount", label: "Amount", type: "number"}
  ];

  const handleChange = (e) => {
    const {name, value, files} = e.target;

    if (files) {
      const file = files[0];
      const fileType = file.type; // get file type
      const fileSize = file.size; // get file size
  
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
    e.preventDefault(); // Prevent the browser's default form submission
    
    createItem(e)
      .then((response) => {
        console.log(response);
      })

    // console.log(formData);
    fileInputRef.current.value = ''; 
    setFormData({});
  }

  return (
    <Flex 
        flexDirection="column"
        align-items="center"
        width="275px"
        height="510px"
        justifyContent="center" 
        alignItems={"center"}
        alignContent={"center"}   
        border="2px solid grey"
        borderRadius="10px"
        boxShadow={"3px 3px 20px 1px rgba(0,0,0,3)"}
        padding="10px" 
        margin="30px"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}> 
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
            <Button type="submit" bg="#047b7c" _hover={{bg:"#023f40", color: "white"}}>Submit</Button>
          </VStack>
        </form>
      </Flex>
  );
}