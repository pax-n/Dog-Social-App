import React from "react";
import { useState } from "react";
import "./EventsFeed.css";
import EventsListing from "./EventsListing";
import EventsPage from "./EventsPage";
import CreateEvent from "./CreateEvent";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

function EventsFeed() {
  const [showEvent, setShowEvent] = useState("EventListing");
  const changeEvent = (page) => {
    setShowEvent(page);
  };
  const clickButton = (page) => () => {
    changeEvent(page);
  };

  return (
    <div className="EventsFeed">
      <EventsListing showEvent={showEvent} changeEvent={changeEvent} />
      <EventsPage showEvent={showEvent} />
      {showEvent === "EventListing" && (
        <Button
          onClick={clickButton("CreateEvent")}
          className="createEventButton"
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
        >
          Create Event
        </Button>
      )}
      <CreateEvent showEvent={showEvent} />
    </div>
  );
}

export default EventsFeed;
