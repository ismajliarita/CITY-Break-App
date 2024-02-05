import React from "react";
import "../style.css";
import Logo from "../media/city_logo.png";

export default function NavBar() {
    return(
        <nav className="navbar">
            <div className="navbar--logo">  
                <img src={Logo} className="logo" alt='logo image: City Break Cafe'/>
            </div>
            <div className="hamburger-menu active">
                <div className="ham-bar bar-top"></div>
                <div className="ham-bar bar-mid"></div>
                <div className="ham-bar bar-bot"></div>
            </div>
        </nav>
    );
}