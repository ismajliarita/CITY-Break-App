import {React, useContext, useEffect} from "react";
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
import { useNavigate } from "react-router-dom";

export default function MobileNav() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // if(!auth.isLoggedIn){
    //   navigate('/auth');
    // }  
  }, []);
  return (
    <Flex padding="1rem" backgroundColor="#222" width={"100%"} justifyContent="space-between" alignItems="center">
      <Link to="/">
        <Image src={Logo} height={"50px"}></Image> 
      </Link>
      {(
        auth.isLoggedIn ? 
        <Flex width={"70%"}  color="#cccccc" fontSize="1.5rem" justifyContent={"space-between"}>
          <Link to="/view-items">
            <FontAwesomeIcon fontSize={"1.7rem"} icon={faMugHot} />
          </Link>
          <Link to="/order-history">
            <FontAwesomeIcon fontSize={"1.7rem"} icon={faClock} />
          </Link>
        {(auth.user?.isAdmin ? 
          <Link to="/incoming-orders">
            <FontAwesomeIcon fontSize={"1.7rem"} icon={faPaperPlane} />
          </Link> : <></>)}
        {(auth.user?.isAdmin ? 
          <Link to="/admin">
            <FontAwesomeIcon fontSize={"1.7rem"} icon={faLock} />
          </Link> : <></>)}
          
          

          <Link to="/cart">
            <FontAwesomeIcon fontSize={"1.7rem"} icon={faCartShopping} />
          </Link>
          <Link to="/profile">
            <FontAwesomeIcon fontSize={"1.7rem"} icon={faUser} />
          </Link>
        </Flex> :
        <Link to="/auth">
          <FontAwesomeIcon color="#cccccc" fontSize={"1.7rem"} icon={faRightToBracket} />
        </Link>
      )}
    </Flex>
  )
}