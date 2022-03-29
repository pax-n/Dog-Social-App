import { React, useEffect, useState } from "react";
import axios from "axios";
import "./EventsPage.css";
import EventMember from "./EventMember";
import Button from "@mui/material/Button";
import Moment from "react-moment";
import { useContext } from "react";
import { userContext } from "../providers/UserProvider";
import Grid from "@mui/material/Grid";

function EventsPage({
  showEvent,
  event_title,
  user,
  user_id,
  city,
  country,
  starting_time,
  ending_time,
  targetEvent,
  setMembers,
  members,
  event_id,
  getMembers,
  handleProfileClick,
}) {
  const { userDog } = useContext(userContext);
  const [togglebuttons, settogglebuttons] = useState(true);
  const [isswitch, setisswitch] = useState(true);

  useEffect(() => {
    for (let member of members) {
      if (member.dog_id === userDog) {
        settogglebuttons(true);
        return;
      }
      settogglebuttons(false);
    }
  }, [isswitch]);

  const attendButton = () => {
    const data = { userDog };
    axios.post(`/api/attendevent/${event_id}`, data).then((response) => {
      setisswitch(!isswitch);
      getMembers(event_id);
    });
  };

  const notattendButton = () => {
    const data = { userDog };
    axios.post(`/api/notattendevent/${event_id}`, data).then((response) => {
      setisswitch(!isswitch);
      getMembers(event_id);
    });
  }
  return (
    <div>
      {showEvent === "Events Page" && (
        <div className="EventsPage">
          <div className="EventPage__top">
            <h2>{event_title}</h2>
            <p>Hosted by <a onClick={handleProfileClick(user_id)}>{user}</a></p>
          </div>
          <div className="EventPage__middle">
            <div className="EventPage__map">
              <h3>Location</h3>
              <p>
                {city}, {country}
              </p>
            </div>
            <div className="EventPage_information">
              <h3>Information</h3>
              <p>
                Starts: <Moment format="LLLL">{starting_time}</Moment>
              </p>
              <p>
                Ends: <Moment format="LLLL">{ending_time}</Moment>
              </p>
            </div>
          </div>
          <div className="EventPage__bottom">
            <div className="EventPage_attending">
              <h3>Attending</h3>
              <Grid container spacing={0}>
                {members.map((member) => {
                  return (
                    <EventMember
                      profilePic={member.profile_pic_url}
                      name={member.dog_name}
                      handleProfileClick={handleProfileClick(member.dog_id)}
                    />
                  );
                })}
              </Grid>
            </div>
            <div className="EventPage_attendance">
              <h3>Attendance</h3>
              <div className="EventPage_buttons">
                { togglebuttons && 
                <Button
                  variant="outlined"
                  color="success"
                  onClick={attendButton}
                >
                  Going
                </Button>
                }
                { !togglebuttons &&
                <Button 
                  variant="outlined" 
                  color="error"
                  onClick={notattendButton}
                >
                  Not going
                </Button>
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsPage;
