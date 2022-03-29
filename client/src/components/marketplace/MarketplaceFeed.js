import React from "react";
import "./MarketplaceFeed.css";
import MarketplaceListing from "./MarketplaceListing";
import CreateAd from "./CreateAd";

function MarketplaceFeed() {
  return (
    <div className="MarketplaceFeed">
      <CreateAd />
      <MarketplaceListing />
      <MarketplaceListing />
      <MarketplaceListing />
      <MarketplaceListing />
      <MarketplaceListing />
      <MarketplaceListing />
      <MarketplaceListing />
      <MarketplaceListing />
      <MarketplaceListing />
    </div>
  );
}

export default MarketplaceFeed;
