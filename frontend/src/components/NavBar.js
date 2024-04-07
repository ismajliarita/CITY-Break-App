import React from "react";
import "../style.css";
import { Flex, Image, Text } from "@chakra-ui/react";
import Logo from "../media/city_logo.png";
import { Link } from "react-router-dom";

export default function NavBar() {
    return(
        <Flex 
          padding="1rem"
          backgroundColor="#222"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link to="/">
            <Image src={Logo} height={"50px"}></Image> 
          </Link>
          <Flex
            color="#cccccc"
            fontSize="1.5rem"
            justifyContent="space-between"
            width="45%"
            marginRight={"28%"}
           >
            <Text><Link to="/create-order">New Order</Link></Text>
            <Text><Link to="/view-items">Items</Link></Text>
            <Text><Link to="/incoming-orders">Incoming Orders</Link></Text>
            <Text><Link to="/order-history">Order History</Link></Text>
          </Flex>
        </Flex>
    );
}