import React from "react";
import "./MessageSender.css";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";

function MessageSender() {
  return (
    <div className="wrapper">
      <div className="top">
        <div className="text-area">
          <textarea placeholder="What's barking?" className="input"></textarea>
        </div>
      </div>
      <div className="bottom">
        <ul className="icons">
          <li>
            <ImageIcon />
          </li>
          <li>
            <VideocamIcon />
          </li>
        </ul>
        <div className="content">
          <button className="bork">Bork</button>
        </div>
      </div>
    </div>
  );
}

export default MessageSender;
