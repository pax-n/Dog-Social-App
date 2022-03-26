import React from "react";
import "./EventsListing.css";

function EventsListing({
  event_title,
  user,
  description,
  start_time,
  end_time,
  changeEvent,
  showEvent,
}) {
  const clickEvent = (page) => () => {
    changeEvent(page);
  };
  return (
    <div>
      {showEvent === "EventListing" && (
        <div className="EventsListing" onClick={clickEvent("Event")}>
          <div className="EventsListing__title">
            <h2>{event_title}Event Title</h2>
          </div>
          <div className="EventsListing__creator">
            <p>Event by {user}User</p>
          </div>
          <div className="EventsListing__description">
            <p> {description}Description </p>
          </div>
          <div className="EventsListing__time">
            <p>{start_time}Start Time</p>
            <p> to </p>
            <p>{end_time}End Time</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsListing;
