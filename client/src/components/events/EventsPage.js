import React from "react";
import "./EventsPage.css";
import EventMember from "./EventMember";
import Button from "@mui/material/Button";

function EventsPage({
  showEvent,
  event_title,
  user,
  location,
  description,
  starting_time,
  ending_time,
}) {
  return (
    <div>
      {showEvent === "Event" && (
        <div className="EventsPage">
          <div className="EventPage__top">
            <h2>{event_title}Event Title</h2>
            <p>Hosted by {user}User</p>
          </div>
          <div className="EventPage__middle">
            <div className="EventPage__map">
              <h3>Location</h3>
              <p>{location}location</p>
              <p>map?</p>
            </div>
            <div className="EventPage_information">
              <h3>Information</h3>
              <p>{description}Description</p>
              <p>
                {starting_time}Starting Time to {ending_time}Ending Time
              </p>
            </div>
          </div>
          <div className="EventPage__bottom">
            <div className="EventPage_attending">
              <h3>Attending</h3>
              <EventMember />
            </div>
            <div className="EventPage_attendance">
              <h3>Attendance</h3>
              <div className="EventPage_buttons">
                <Button variant="outlined" color="success">
                  Going
                </Button>
                <Button variant="outlined" color="error">
                  Not going
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsPage;
