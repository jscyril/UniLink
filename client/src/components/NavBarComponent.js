import React, { useState } from "react";
import "./NavBarComponent.css";

// Separate Dropdown component
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="header-navbarprofile-dropdown6">
      <button
        onClick={toggleDropdown}
        className="header-navbarprofile-dropdown7"
      >
        <div className="header-navbarprofile-dropdown8">
          <img
            className="header-navbarprofile-dropdown-icon4"
            alt=""
            src="/headernavbarprofile-dropdown-menuprofiledivprofileicon@2x.png"
          />
          <div className="header-navbarprofile-dropdown9">UserName</div>
        </div>
        <img
          className="header-navbarprofile-dropdown-icon5"
          alt=""
          src="/headernavbarprofile-dropdown-menuprofiledivprofiledropdownicon@2x.png"
        />
      </button>
      {isOpen && (
        <div className="dropdowncontent">
          <a href="#">Log Out</a>
        </div>
      )}
    </div>
  );
}

const NavBarComponent = () => {
  return (
    <div className="navbar-component1">
      <div className="divheader-navbar1" id="Header-Navbar" />
      <nav className="header-navbar1">
        <button className="header-navbarlogo1">
          <img
            className="header-navbarlogovector-icon1"
            alt=""
            src="/headernavbarlogovector@2x.png"
          />
          <div className="header-navbarlogotext1">UniLink</div>
        </button>
        <input
          className="header-navbarsearch-bar1"
          placeholder="Search for posts or clubs"
          type="text"
        />
        <button className="addpost">
          <img className="addpost" src="/group-23@2x.png"></img>
        </button>
        {/* Using Dropdown component */}
        <Dropdown />
      </nav>
    </div>
  );
};

export default NavBarComponent;
