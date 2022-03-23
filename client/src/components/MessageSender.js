import React from "react";
import "./MessageSender.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import Switch from "@mui/material/Switch";
import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";

const label = { inputProps: { "aria-label": "Switch demo" } };

function MessageSender(props) {
  //image and previewer state for uploading image
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  //references input button to image icon
  const fileInputRef = useRef();
  //reads image as a data url
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const [caption, setCaption] = useState(props.caption || "");
  const onClick = function () {
    console.log("Button clicked.");
    //PLACEHOLDER DOG_ID UNTIL LOGIN IS IMPLEMENTED
    let dog_id = 1;
    let data = { caption, dog_id };
    axios.post("/barks", data).then((responses) => {
      console.log("Post sent to database.");
      setCaption("");
      //PESSIMISTIC PROGRAMMING --> Only loads the post at the top when the data has been sent to the database.
      props.setPosts((prev) => [data, ...prev]);
    });
  };

  return (
    <div className="wrapper">
      <div className="MessageSender__top">
        <div className="text-area">
          <form className="input">
            <input
              className="input"
              type="text"
              placeholder="What's barking?"
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
            />
          </form>
          <img src={preview} />
        </div>
      </div>
      <div className="MessageSender__bottom">
        <ul className="icons">
          <li>
            <ImageIcon
              onClick={(event) => {
                event.preventDefault();
                fileInputRef.current.click();
              }}
            />
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file) {
                  setImage(file);
                } else {
                  setImage(null);
                }
              }}
            />
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
    </div>
  );
}

export default MessageSender;
