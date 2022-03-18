import React from "react";
import "./Header.css";
import PetsIcon from "@mui/icons-material/Pets";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <PetsIcon />
        <h4>DogGO</h4>
      </div>
      <div className="header__middle">
        <SearchIcon />
        <input type="text" placeholder="Search"></input>
      </div>
      <div className="header__right">
        <Avatar sx={{ height: "30px", width: "30px" }}></Avatar>
        <h4> Username </h4>
      </div>
    </div>
  );
}

export default Header;
