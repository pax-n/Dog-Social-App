import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./MarketplaceFeed.css";
import MarketplaceListing from "./MarketplaceListing";
import CreateAd from "./CreateAd";

function MarketplaceFeed() {
  const [classifieds, setClassifieds] = useState([]);

  useEffect(() => {
    axios.get(`/api/classifieds`).then((response) => {
      let classifiedList = response.data;
      console.log("ClassifiedList: ", classifiedList);
      setClassifieds(classifiedList);
    });
  }, []);

  return (
    <div className="MarketplaceFeed">
      <CreateAd />
      {classifieds.map((classified) => {
        return (
          <MarketplaceListing 
          profilePic={classified.profile_pic_url}
          username={classified.dog_name}
          email={classified.email}
          item={classified.item_name}
          item_img={classified.item_img_url}
          price={classified.price_cents}
          description={classified.description}
          />
        );
      })}
    </div>
  );
}

export default MarketplaceFeed;
