import {
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  Box,
  VStack,
  Text,
  useToast
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from 'react';
import { createUser } from '../api';

export default function Profile () {
  return(
    <Flex>
      <VStack>
        <Text>Profile</Text>
      </VStack>
    </Flex>
  )
}