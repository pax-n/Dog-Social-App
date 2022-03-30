import React from "react";
import "./MarketplaceListing.css";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";

function MarketplaceListing({
  profilePic,
  username,
  email,
  item,
  item_img,
  price,
  description,
}) {
  const emailParse = `mailto:${email}?subject=Inquiry%20about%20${item}`
  return (
    <div className="MarketplaceListing">
      <div className="MarketplaceListing__user">
        <Avatar src={profilePic} sx={{ height: "40px", width: "40px" }} />
        <p>{username}</p>
      </div>
      <div className="MarketplaceListing__image">
        <h4>{item}</h4>
        <img src={item_img} alt="Product image"/>
      </div>
      <div className="MarketplaceListing__bottom">
        <h4>
          {price && `$${price/100}`}
          {!price && `Contact for price`}
        </h4>
        <p>{description}</p>
      </div>
      <div className="MarketplaceListing__contact">
        <Button variant="text" color="success" href={emailParse}>
          Contact
        </Button>
      </div>
    </div>
  );
}

export default MarketplaceListing;
