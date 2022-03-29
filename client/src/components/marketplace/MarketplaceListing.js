import React from "react";
import "./MarketplaceListing.css";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";

function MarketplaceListing({
  profilePic,
  username,
  item,
  item_img,
  price,
  description,
  phone_number,
}) {
  return (
    <div className="MarketplaceListing">
      <div className="MarketplaceListing__user">
        <Avatar src={profilePic} sx={{ height: "40px", width: "40px" }} />
        <p>{username}Username</p>
      </div>
      <div className="MarketplaceListing__image">
        <h4>{item} Toy Bone</h4>
        <img src="https://www.popsci.com/uploads/2021/08/18/kong-goodie-bone-dog-toy-best-chew-dog-toy.jpg?auto=webp"></img>
      </div>
      <div className="MarketplaceListing__bottom">
        <h4>${price}5</h4>
        <p>{description}Description</p>
      </div>
      <div className="MarketplaceListing__contact">
        <p>{phone_number}Phone Number</p>
        <Button variant="text" color="success">
          Contact
        </Button>
      </div>
    </div>
  );
}

export default MarketplaceListing;
