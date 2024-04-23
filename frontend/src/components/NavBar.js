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
            // justifyContent="space-between"
            // width="20%"
            // marginRight={"28%"}
          >
            <Text
              marginInline={"20px"}
            ><Link to="/view-items">Items</Link></Text>
            <Text
              marginInline={"20px"}
            ><Link to="/order-history">Order History</Link></Text>

          </Flex>

          <Flex
            color="#cccccc"
            fontSize="1.5rem"
            // justifyContent="space-between"
            // width="20%"
            // marginRight={"28%"}
           >
            <Text
              marginInline={"20px"}
            ><Link to="/incoming-orders">Incoming Orders</Link></Text>
          </Flex>
          
          <Flex
            color="#cccccc"
            fontSize="1.5rem"
            // justifyContent="space-between"
            // width="20%"
            // marginRight={"28%"}
          >
            <Text
              marginInline={"20px"}
            ><Link to={"/cart"}>Cart</Link></Text>
            {/* <Text><Link></Link></Text> */}
          </Flex>
        </Flex>
    );
}