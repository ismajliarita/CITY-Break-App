import React from "react";
import "../style.css";
import { 
  Flex, 
  Image, 
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "../media/city_logo.png";

export default function MobileNav() {
  return (
    <Flex padding="1rem" backgroundColor="#222" width={"100%"} justifyContent="space-between" alignItems="center">
      <Link to="/">
        <Image src={Logo} height={"50px"}></Image> 
      </Link>

      <Flex color="#cccccc" fontSize="1.5rem">
        <Text marginInline={"20px"}>
          <Link to="/view-items">Items</Link>
        </Text>
        <Text marginInline={"20px"}>
          <Link to={"/cart"}>Cart</Link>
        </Text>
      </Flex>
    </Flex>
  )
}