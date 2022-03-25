import React from "react";
import "./PostComment.css";
import { Avatar } from "@mui/material";

function PostComment({
  profile_pic_url,
  dog_name,
  comment_id,
  comment,
  dog_id,
  created_at,
}) {
  return (
    <div className="postcomment">
      <Avatar className="commentAvatar" src={profile_pic_url} />
      <div className="postcomment__comment">
        <div className="postcomment__content">
          <h4>{dog_name}</h4>
          <p>{comment}</p>
        </div>
        <div className="postcomment__timestamp">
          <p>{created_at}</p>
        </div>
      </div>
    </div>
  );
}

export default PostComment;
