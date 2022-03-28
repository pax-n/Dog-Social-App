import React from "react";
import { useState, useEffect } from "react";
import "./EventsFeed.css";
import EventsListing from "./EventsListing";
import EventsPage from "./EventsPage";
import CreateEvent from "./CreateEvent";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

function EventsFeed() {
  const [events, setEvents] = useState([]);
  const [showEvent, setShowEvent] = useState("EventListing");
  const changeEvent = (page) => {
    setShowEvent(page);
  };
  const clickButton = (page) => () => {
    changeEvent(page);
  };

  useEffect(() => {
    axios.get(`/api/events`).then((response) => {
      let eventsList = response.data;
      console.log("Events received: ", eventsList);
      setEvents(eventsList);
    });
  }, []);

  return (
    <div className="EventsFeed">
      {events.map((event) => {
        return (
          <EventsListing
            showEvent={showEvent}
            changeEvent={changeEvent}
            event_title={event.description}
            user={event.dog_name}
            start_time={event.start_time}
            end_time={event.end_time}
            city={event.city}
            country={event.country}
          />
        );
      })}

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
