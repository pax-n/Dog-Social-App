import React from "react";
import Moment from "react-moment";
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
  event_id,
  handleEventClick,
}) {
  return (
    <div>
      {showEvent === "EventListing" && (
        <div className="EventsListing" onClick={handleEventClick}>
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
            <p>
              Starts: <Moment format="LLLL">{start_time}</Moment>
            </p>
            <p> to </p>
            <p>
              Ends: <Moment format="LLLL">{end_time}</Moment>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsListing;
