import React, { useState, useEffect } from "react";
import "./Post.css";
import PostComment from "./PostComment";
import { Avatar } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import axios from "axios";

function Post({
  bark_id,
  profile_pic_url,
  dog_name,
  caption,
  image_url,
  created_at,
}) {
  const [paws, setPaws] = useState(0);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    console.log(`The post useEffect has run: `, bark_id);
    axios.get(`/paws/${bark_id}`).then((response) => {
      console.log("Like response: ", response);
      const likes = response.data.count;
      setPaws((prev) => {
        return likes;
      });
    });
  }, []);

  const pawsLike = (dog_id) => {
    console.log("Paws clicked.");
    dog_id = 1;
    const bark_id = 1;
    axios.put(`/paws/${bark_id}`).then(() => {
      setPaws((prev) => {
        return parseInt(prev) + 1;
      });
      console.log("Paw set.");
    });
  };

  //Send an object with a put.

  return (
    <div className="post">
      <div className="post__top">
        <div className="post__user">
          <Avatar className="post__avatar" src={profile_pic_url} />
          <h4>{dog_name}</h4>
        </div>
        <p>{created_at}</p>
      </div>

      <div className="post__bottom">
        <p>{caption}</p>
      </div>

      <div className="post__image">
        <img src={image_url} />
      </div>

      <div className="post__counter">
        <PetsIcon />
        <p>{paws} paws</p>
      </div>

      <div className="post__buttons">
        <div className="pawButton" onClick={pawsLike}>
          <PetsIcon />
          <p>Paw</p>
        </div>
        <div
          className="commentButton"
          onClick={() => setShowComments(!showComments)}
        >
          <ChatBubbleOutlinedIcon />
          <p>Comment</p>
        </div>
      </div>

      {showComments ? (
        <div className="post__commentSection">
          <div className="commentSender">
            <Avatar className="commentSender__avatar" />
            <div className="commentSender__content">
              <input type="text" placeholder="Write a comment"></input>
              <button className="commentBork">Bork</button>
            </div>
          </div>
          <div className="userComments">
            <PostComment />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Post;
