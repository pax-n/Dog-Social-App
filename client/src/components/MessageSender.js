import React from "react";
import "./MessageSender.css";
import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import Switch from "@mui/material/Switch";
import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import resolveProps from "@mui/utils/resolveProps";
import { userContext } from "./providers/UserProvider";

const label = { inputProps: { "aria-label": "Switch demo" } };

function MessageSender(props, bark_id) {
  const [showImgURL, setShowImgURL] = useState(false);
  const [caption, setCaption] = useState(props.caption || "");
  const { userDog } = useContext(userContext);

  const onClick = function () {
    console.log("Bork button clicked.");
    let dog_id = userDog;
    let data = { caption, dog_id };

    Promise.all([
      //Post the new bark to the database
      axios.post("/barks", data).then((data) => {

        //Gets the new list of barks including the newest bark
        axios.get(`/barks/${dog_id}`).then((response) => {
          console.log("Get barks response: ", response);
  
          //List of all the posts with new bark
          const allPosts = response.data;
          console.log("AllPosts: ", allPosts);
          props.setPosts([...allPosts]);
  
          //Resets the caption space to blank.
          setCaption("");
  
          const bark_id = response.data[0].id;
          console.log("New bark_id: ", bark_id);
          props.setisswitch(!props.isswitch);
          //Retrieves likes again from database with new post' likes
          // axios.get(`/paws/${bark_id}`).then((response) => {
          //   console.log("Paws set.");
          //   props.setPaws(0);
          // });
        });
      }),
    ]);
  };

  return (
    <div className="wrapper">
      <div className="MessageSender__top">
        <div className="text-area">
          <form className="form">
            <input
              className="input"
              type="text"
              placeholder="What's barking?"
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
            />
          </form>
        </div>
      </div>
      <div className="MessageSender__bottom">
        <ul className="icons">
          <li>
            <ImageIcon onClick={() => setShowImgURL(!showImgURL)} />
          </li>
          <li>
            <VideocamIcon />
          </li>
        </ul>
        <div className="content">
          <div className="switch">
            <PublicOffIcon />
            <Switch {...label} defaultChecked />
            <PublicIcon />
          </div>
          <button className="bork" onClick={onClick}>
            Bork
          </button>
        </div>
      </div>
      {showImgURL ? (
        <div className="MessageSender__imgURL">
          <input type="text" placeholder="Upload Image URL"></input>
        </div>
      ) : null}
    </div>
  );
}

export default MessageSender;
