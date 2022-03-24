import React from "react";
import "./FriendsListUser.css";
import { Avatar } from "@mui/material";

function FriendsListUser({ profilePic, user }) {
  return (
    <div className="FriendsListUser">
      <Avatar src={profilePic} sx={{ height: "60px", width: "60px" }} />
      <h3>{user}</h3>
    </div>
  );
}

export default FriendsListUser;
