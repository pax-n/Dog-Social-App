import React from "react";
import "./ProfileFriends.css";
import { Avatar } from "@mui/material";
import Grid from '@mui/material/Grid';

function ProfileFriends({ profilePic, name, onClick }) {
  return (
    <Grid item xs={4}>
    <div className="profilefriends">
      <div className="profilefriends__friend">
        <Avatar src={profilePic} sx={{ height: "50px", width: "50px" }} onClick={onClick}/>
        <p onClick={onClick}>{name}</p>
      </div>
    </div>
    </Grid>
  );
}

export default ProfileFriends;
