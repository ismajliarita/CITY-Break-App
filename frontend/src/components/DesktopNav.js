import React, { useContext, useState, useEffect } from "react";
import "../style.css";
import { 
  Center,
  Flex, 
  Image, 
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "../media/city_logo.png";
import { isTokenExpired } from "../util/helpers";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";

export default function DesktopNav() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(isTokenExpired(localStorage.getItem("city-token"))){
      navigate('auth')
    }else{
      auth.isLoggedIn || navigate('/auth');
    }
  }, []);

  return (
    <Flex padding="1rem" backgroundColor="#222" alignItems="center" width={"100%"}>
        <Link to="/">
          <Image src={Logo} height={"50px"} minWidth={"120px"}></Image> 
        </Link>
      
        {(auth.isLoggedIn ? 
          <Flex marginLeft={"auto"}>
            <Flex flexGrow={1} width={"100%"}>
              <Flex color="#cccccc" fontSize="1.5rem" alignItems={"center"} marginInline={"50px"}>
                <Text marginInline={"20px"}>
                  <Link to="/view-items">Items</Link>
                </Text>
                <Text marginLeft={"10px"}>
                  <Link to="/order-history">Order History</Link>
                </Text>
              </Flex>

              {(auth.user?.isAdmin ?
                <Flex color="#cccccc" fontSize="1.5rem" alignItems={"center"}>
                  <Text marginInline={"20px"}>
                    <Link to="/incoming-orders">Incoming Orders</Link>
                  </Text>
                  <Text marginInline={"20px"}>
                    <Link to="/admin">Admin</Link>
                  </Text>
                </Flex> : <></>
              )}

              <Flex color="#cccccc" fontSize="1.5rem" marginRight={"10px"} alignItems={"center"}>
                <Text marginInline={"35px"}>
                  <Link to={"/cart"}>Cart</Link>
                </Text>
              </Flex>
            </Flex>
          </Flex> : <></>
        )}

    {(auth.isLoggedIn ?
      <Flex color="#cccccc" fontSize="1.5rem" justifyContent={"flex-end"} marginRight={"20px"}>
        <Text>  
          <Link to="/profile">Profile</Link>
        </Text>
      </Flex> : <Flex color="#cccccc" fontSize="1.5rem" marginLeft={"auto"} marginRight={"20px"}>
        <Text>  
          <Link to="/auth">Login</Link>
        </Text>
      </Flex>
    )}
    </Flex>
)}