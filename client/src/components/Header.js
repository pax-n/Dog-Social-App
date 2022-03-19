import React from "react";
import "./Header.css";
import PetsIcon from "@mui/icons-material/Pets";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";

function Header() {
  return (
    <nav className="header">
      <div className="header__left">
        <MenuIcon className="menuIcon" />
        <div className="logo">
          <PetsIcon />
          <h4>DogGO</h4>
        </div>
      </div>
      <div className="header__middle">
        <SearchIcon />
        <input type="text" placeholder="Search"></input>
      </div>
      <div className="header__right">
        <Avatar sx={{ height: "30px", width: "30px" }}></Avatar>
        <span className="username"> Username </span>
      </div>
    </nav>
  );
}

export default Header;
