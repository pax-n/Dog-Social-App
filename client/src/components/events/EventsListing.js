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
  city,
  country,
}) {
  const clickEvent = (page) => () => {
    changeEvent(page);
  };
  return (
    <div>
      {showEvent === "EventListing" && (
        <div className="EventsListing" onClick={clickEvent("Event")}>
          <div className="EventsListing__title">
            <h2>{event_title}</h2>
          </div>
          <div className="EventsListing__creator">
            <p>Event by {user}</p>
          </div>
          <div className="EventsListing__description">
            <p>
              {" "}
              Location: {city}, {country}{" "}
            </p>
          </div>
          <div className="EventsListing__time">
            <p>Starts: {start_time}</p>
            <p> to </p>
            <p>Ends: {end_time}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsListing;
