import React from "react";
import "./SearchResultElement.css";
import { Avatar } from "@mui/material";

function SearchResultElement({ profile_pic_url, name, onClick }) {
  return (
    <div className="SearchResultElement" onClick={onClick}>
      <Avatar src={profile_pic_url} sx={{ height: "60px", width: "60px" }} />
      <h3>{name}</h3>
    </div>
  );
}

export default SearchResultElement;
