import React from "react";
import "./PostComment.css";
import { Avatar } from "@mui/material";

function PostComment({ profilePic, username, comment }) {
  return (
    <div className="postcomment">
      <Avatar className="commentAvatar" />
      <div className="postcomment__comment">
        <h4>Username</h4>
        <p>
          CommentCommentCommentCommentCommentCommentCommentCommentCommentComment
          CommentComment CommentComment CommentComment CommentComment
        </p>
      </div>
    </div>
  );
}

export default PostComment;
