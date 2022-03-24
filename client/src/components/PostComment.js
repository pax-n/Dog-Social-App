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
        <h4>{dog_name}</h4>
        <div>
          <p>{created_at}</p>
        </div>
        <p>{comment}</p>
      </div>
    </div>
  );
}

export default PostComment;
