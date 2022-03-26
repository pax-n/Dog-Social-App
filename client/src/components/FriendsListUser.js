import React from "react";
import "./FriendsListUser.css";
import { Avatar } from "@mui/material";

function FriendsListUser({ profile_pic_url, name }) {
  return (
    <div className="FriendsListUser">
      <Avatar src={profile_pic_url} sx={{ height: "60px", width: "60px" }} />
      <h3>{name}</h3>
    </div>
  );
}

export default FriendsListUser;
