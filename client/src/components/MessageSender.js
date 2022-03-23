import React from "react";
import "./MessageSender.css";
import { useState } from "react";
import axios from "axios";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";

function MessageSender(props) {
  const [caption, setCaption] = useState(props.caption || "");
  const onClick = function () {
    console.log("Button clicked.");
    console.log("Caption in MessageSender: ", caption);
    //PLACEHOLDER DOG_ID UNTIL LOGIN IS IMPLEMENTED
    let dog_id = 1;
    let data = { caption, dog_id };
    axios.post("/barks", data).then((responses) => {
      console.log("Post sent to database.");
      console.log("Response: ", responses);
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
        </div>
      </div>
      <div className="MessageSender__bottom">
        <ul className="icons">
          <li>
            <ImageIcon />
          </li>
          <li>
            <VideocamIcon />
          </li>
        </ul>
        <div className="content">
          <button className="bork" onClick={onClick}>
            Bork
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageSender;
