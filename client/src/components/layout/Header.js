import React from "react";
import { useContext } from "react";
import { userContext } from "../providers/UserProvider";
import axios from "axios";
import "./Header.css";
import PetsIcon from "@mui/icons-material/Pets";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Header({ changePage }) {
  const { loggedin, logout, userInfo } = useContext(userContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const clickLogo = (page) => () => {
    changePage(page);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    axios.post("/logout").then(() => {
      logout();
    });
  }
  console.log("userInfo: ", userInfo);
  
  return (
    <nav className="header">
      <div className="header__left">
        <MenuIcon className="menuIcon" />
        <div onClick={clickLogo("Feed")} className="logo">
          <PetsIcon />
          <h4>DogGO</h4>
        </div>
      </div>
      {loggedin &&
      <div className="header__middle">
      <SearchIcon />
        <input type="text" placeholder="Search"></input>
      </div>
        }
        {loggedin && 
      <div className="header__right">
        <div className="UserProfile">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {userInfo.dog_name}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
          <Avatar sx={{ height: "34px", width: "34px" }}
                src={userInfo.profile_pic_url}></Avatar>
      </div>
          }
    </nav>
  );
}

export default Header;
