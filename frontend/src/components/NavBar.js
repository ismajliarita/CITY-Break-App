import React from "react";
import "../style.css";
import { 
  Flex, 
  Image, 
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function NavBar() {
  const [isLargerThan768] = useMediaQuery("(min-width: 920px)");

  return(
    <Flex backgroundColor="#222" alignItems="center">
      {isLargerThan768 ? <DesktopNav /> : <MobileNav />}
    </Flex>
  )}