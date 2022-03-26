import React, { useState, useEffect, useContext } from "react";
import { toggleContext } from "./providers/ToggleProvider";
import Moment from "react-moment";
import "./Post.css";
import PostComment from "./PostComment";
import { Avatar } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import axios from "axios";

function Post({
  bark_id,
  dog_id,
  profile_pic_url,
  dog_name,
  caption,
  image_url,
  created_at,
  changePage,
}) {
  const [paws, setPaws] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [loadComments, setLoadComments] = useState([]);
  const [postComment, setPostComment] = useState("");
  const { settargetID } = useContext(toggleContext);

  useEffect(() => {
    axios.get(`/paws/${bark_id}`).then((response) => {
      const likes = response.data.count;
      setPaws((prev) => {
        return likes;
      });
    });
  }, []);

  const pawsLike = (dog_id, bark_id) => {
    const data = { dog_id };
    axios.post(`/paws/${bark_id}`, data).then((response) => {
      setPaws((prev) => {
        return parseInt(prev) + 1;
      });
    });
  };

  const loadCommentsForPost = (bark_id) => {
    console.log("Load comments bark_id: ", bark_id);
    setShowComments(!showComments);
    axios.get(`/api/comments/${bark_id}`).then((response) => {
      const comments = response.data;
      setLoadComments(comments);
    });
  };

  const handleProfileClick = (page) => () => {
    settargetID(dog_id);
    changePage(page);
  }

  return (
    <div className="post">
      <div className="post__top">
        <div className="post__user">
          <Avatar className="post__avatar" src={profile_pic_url} onClick={handleProfileClick("Profile")} />
          <h4 onClick={handleProfileClick("Profile")}>{dog_name}</h4>
        </div>
        <p>
          <Moment fromNow>{created_at}</Moment>
        </p>
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
        <div
          className="pawButton"
          onClick={() => {
            pawsLike(dog_id, bark_id);
          }}
        >
          <PetsIcon />
          <p>Paw</p>
        </div>
        <div
          className="commentButton"
          onClick={() => {
            loadCommentsForPost(bark_id);
          }}
          // onClick={() => setShowComments(!showComments)}
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
            {/* <PostComment loadComments={loadComments} /> */}
            {loadComments.map((comment) => {
              return (
                <PostComment
                  profile_pic_url={comment.profile_pic_url}
                  dog_id={comment.dog_id}
                  comment_id={comment.id}
                  comment={comment.comment}
                  created_at={comment.created_at}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Post;
