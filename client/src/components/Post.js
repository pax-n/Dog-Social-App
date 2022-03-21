import React from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";

function Post({ profilePic, username, message, image, timestamp, paws }) {
  return (
    <div className="post">
      <div className="post__top">
        <div className="post__user">
          <Avatar className="avatar" src={profilePic} />
          <h4>{username}</h4>
        </div>
        <p>{timestamp}</p>
      </div>

      <div className="post__bottom">
        <p>{message}</p>
      </div>

      <div className="post__image">
        <img src={image} />
      </div>

      <div className="post__counter">
        <PetsIcon />
        <p>{paws} paws</p>
      </div>

      <div className="post__buttons">
        <div className="pawButton">
          <PetsIcon />
          <p>Paw</p>
        </div>
        <div className="commentButton">
          <ChatBubbleOutlinedIcon />
          <p>Comment</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
