import React from "react";
import NavBarComponent from "../components/NavBarComponent";
import SideNavBarComponent from "../components/SideNavBarComponent"
import {
    Routes,
    Route,
    useNavigationType,
    useLocation,
  } from "react-router-dom";
const HomePage = () =>{
    return (
        <div>
        <NavBarComponent/>
        <SideNavBarComponent/>
        </div>
    )
}

export default HomePage;