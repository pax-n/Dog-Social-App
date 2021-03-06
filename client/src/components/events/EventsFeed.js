import React from "react";
import { useState, useEffect, useContext } from "react";
import { toggleContext } from "../providers/ToggleProvider";
import "./EventsFeed.css";
import EventsListing from "./EventsListing";
import EventsPage from "./EventsPage";
import CreateEvent from "./CreateEvent";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

function EventsFeed({ changePage }) {
  const [events, setEvents] = useState([]);
  const [showEvent, setShowEvent] = useState("EventListing");
  const { targetEvent, settargetEvent, settargetID } =
    useContext(toggleContext);
  const [eventPage, setEventPage] = useState([]);
  const [members, setMembers] = useState([]);

  const changeEvent = (page) => {
    //Shows the event's page.
    setShowEvent(page);
  };

  const clickButton = (page) => () => {
    changeEvent(page);
  };

  const getEvent = (event_id) => {
    axios.get(`/api/events/${event_id}`).then((response) => {
      const eventData = response.data;
      setEventPage(eventData);
    });
  };

  const getMembers = (event_id) => {
    axios.get(`/api/eventmembers/${event_id}`).then((response) => {
      const memberData = response.data;
      setMembers(memberData);
    });
  };

  const handleEventClick = (event_id) => () => {
    settargetEvent(event_id);
    changeEvent("Events Page");
    getEvent(event_id);
    getMembers(event_id);
  };

  useEffect(() => {
    axios.get(`/api/events`).then((response) => {
      let eventsList = response.data;
      console.log("Eventslist: ", eventsList);
      setEvents(eventsList);
    });
  }, []);

  const handleProfileClick = (friend) => () => {
    settargetID(friend);
    changePage("Profile");
  };
  return (
    <div className="EventsFeed">
      {showEvent === "EventListing" && (
        <div className="buttonContainer">
          <Button
            sx={{ my: 2 }}
            onClick={clickButton("CreateEvent")}
            className="createEventButton"
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
          >
            Create Event
          </Button>
        </div>
      )}
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
            location={event.location}
            handleEventClick={handleEventClick(event.id)}
          />
        );
      })}

      <EventsPage
        showEvent={showEvent}
        targetEvent={targetEvent}
        event_title={eventPage.description}
        user={eventPage.dog_name}
        user_id={eventPage.created_by_dog_id}
        location={eventPage.location}
        starting_time={eventPage.start_time}
        ending_time={eventPage.end_time}
        members={members}
        setMembers={setMembers}
        event_id={eventPage.id}
        getMembers={getMembers}
        handleProfileClick={handleProfileClick}
      />
      <CreateEvent showEvent={showEvent} />
    </div>
  );
}

export default EventsFeed;
