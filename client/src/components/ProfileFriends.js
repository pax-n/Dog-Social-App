import React from "react";
import "./ProfileFriends.css";
import { Avatar } from "@mui/material";

function ProfileFriends({ profilePic, name }) {
  return (
    <div className="profilefriends">
      <div className="profilefriends__friend">
        <Avatar src={profilePic} sx={{ height: "50px", width: "50px" }} />
        <p>{name}</p>
      </div>
    </div>
  );
}

export default ProfileFriends;
