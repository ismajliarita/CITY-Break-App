import React, {useEffect, useContext} from "react";
import "../style.css";
import { 
  Flex, 
  Image, 
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { AuthContext } from "../context/auth-context";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const [isLargerThan768] = useMediaQuery("(min-width: 920px)");
  
  return(
    <Flex backgroundColor="#222" width={"100%"} minW={"325px"} alignItems="center">
      {isLargerThan768 ? <DesktopNav /> : <MobileNav />}
    </Flex>
  )}