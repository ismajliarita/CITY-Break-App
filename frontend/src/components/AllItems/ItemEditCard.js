import React from 'react';
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
} from "@chakra-ui/react";
import EditItemModal from './EditItemModal';


export default function ItemEditCard (props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handleEdit() {
    
  }
  return(
    <>
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
        <Text>{props.name || "name"}</Text>
        <img src={props.image} alt={props.name}/>
        <Text>{props.price || "price"}</Text>
        <Text>{props.description || "description"}</Text>
        <Text>{props.amount || "amount"}</Text>

        <Button onClick={onOpen} bg="#047b7c" _hover={{bg:"#023f40", color: "white"}}>Edit</Button>
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