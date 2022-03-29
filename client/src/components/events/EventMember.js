import React from "react";
import "./EventMember.css";
import { Avatar } from "@mui/material";
import Grid from "@mui/material/Grid";

function EventMember({ profilePic, name, handleProfileClick }) {
  return (
    <Grid item xs={4}>
      <div className="EventsMember">
        <div className="EventsMember__member" onClick={handleProfileClick}>
          <Avatar src={profilePic} sx={{ height: "50px", width: "50px" }} />
          <p>{name}</p>
        </div>
      </div>
    </Grid>
  );
}

export default EventMember;
