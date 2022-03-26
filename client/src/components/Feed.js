import React from "react";
import { useEffect, useState, useContext } from "react";
import { toggleContext } from "./providers/ToggleProvider";
import "./Feed.css";
import axios from "axios";
import MessageSender from "./MessageSender";
import Post from "./Post";
import Profile from "./Profile";
import FriendsList from "./FriendsList";
import EventsFeed from "./events/EventsFeed";

function Feed({ show, changePage }) {
  const [posts, setPosts] = useState([]);
  const { targetID } = useContext(toggleContext);

  const [paws, setPaws] = useState(0);
  useEffect(() => {
    let bark_id = 1;
    Promise.all([axios.get(`/barks/${bark_id}`), axios.get(`/paws/${bark_id}`)])
      .then((responses) => {
        const posts = responses[0].data;
        setPosts(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="feed">
      {show === "Events" && <EventsFeed />}
      {show === "Friends" && <FriendsList />}
      {show === "Profile" && <Profile userID={targetID}/>}
      {show === "Feed" && (
        <>
          <MessageSender setPosts={setPosts} />
          {posts.map((post) => {
            return (
              <Post
                bark_id={post.id}
                dog_id={post.dog_id}
                profile_pic_url={post.profile_pic_url}
                dog_name={post.dog_name}
                created_at={post.created_at}
                caption={post.caption}
                image_url={post.image_url}
                paws={post.paws}
                changePage={changePage}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default Feed;
