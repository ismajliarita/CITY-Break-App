import React from "react";
import "../style.css";
import { Flex, Image } from "@chakra-ui/react";
import Logo from "../media/city_logo.png";

export default function NavBar() {
    return(
        <Flex 
          padding="1rem"
          backgroundColor="#222"
          justifyContent="space-between"
          alignItems="center"
        >
            <div> 
              <Image src={Logo} height={"50px"}></Image> 
                {/* <img src={Logo} className="logo" alt='logo image: City Break Cafe'/> */}
            </div>
            {/* <div className="hamburger-menu active">
                <div className="ham-bar bar-top"></div>
                <div className="ham-bar bar-mid"></div>
                <div className="ham-bar bar-bot"></div>
            </div> */}
        </Flex>
    );
}