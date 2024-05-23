import {React, useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock,
  faCartShopping,
  faLock,
  faUser,
  faRightToBracket,
  faPaperPlane,
  faHourglassHalf,
  faMugHot,
} from '@fortawesome/free-solid-svg-icons';
import "../style.css";
import { 
  Flex, 
  Image, 
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import Logo from "../media/city_logo.png";

export default function MobileNav() {
  const auth = useContext(AuthContext);
  return (
    <Flex padding="1rem" backgroundColor="#222" width={"100%"} justifyContent="space-between" alignItems="center">
      <Link to="/">
        <Image src={Logo} height={"50px"}></Image> 
      </Link>
      {(
        auth.isLoggedIn ? 
        <Flex width={"70%"}  color="#cccccc" fontSize="1.5rem" justifyContent={"space-between"}>
          <Link to="/view-items">
            <FontAwesomeIcon fontSize={"2rem"} icon={faMugHot} />
          </Link>
          <Link to="/order-history">
            <FontAwesomeIcon fontSize={"2rem"} icon={faClock} />
          </Link>
        {(auth.user.isAdmin ? 
          <Link to="/incoming-orders">
            <FontAwesomeIcon fontSize={"2rem"} icon={faPaperPlane} />
          </Link> : <></>)}
        {(auth.user.isAdmin ? 
          <Link to="/admin">
            <FontAwesomeIcon fontSize={"2rem"} icon={faLock} />
          </Link> : <></>)}
          
          

          <Link to="/cart">
            <FontAwesomeIcon fontSize={"2rem"} icon={faCartShopping} />
          </Link>
          <Link to="/profile">
            <FontAwesomeIcon fontSize={"2rem"} icon={faUser} />
          </Link>
        </Flex> :
        <Link to="/auth">
          <FontAwesomeIcon color="#cccccc" fontSize={"2rem"} icon={faRightToBracket} />
        </Link>
      )}
    </Flex>
  )
}