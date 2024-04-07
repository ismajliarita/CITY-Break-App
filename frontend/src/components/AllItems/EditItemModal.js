import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

export default function EditItemModal(
 {isOpen, 
 onClose} 
) {
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent />
      <ModalHeader>Edit Item</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>Irure Lorem ut commodo sint reprehenderit proident qui laboris excepteur proident non Lorem consequat ullamco. Ullamco do est pariatur aliqua qui dolor proident dolor irure Lorem tempor do. Occaecat aliquip laborum officia minim.</Text>
      </ModalBody>
      
      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button variant='ghost'>Save</Button>
      </ModalFooter>

    </Modal>
  );
}