import React from "react";
import { useState } from "react";
import "./EventsFeed.css";
import EventsListing from "./EventsListing";
import EventsPage from "./EventsPage";

function EventsFeed() {
  const [showEvent, setShowEvent] = useState("EventListing");
  const changeEvent = (page) => {
    setShowEvent(page);
  };
  return (
    <div className="EventsFeed">
      <EventsListing showEvent={showEvent} changeEvent={changeEvent} />
      <EventsPage showEvent={showEvent} />
    </div>
  );
}

export default EventsFeed;
