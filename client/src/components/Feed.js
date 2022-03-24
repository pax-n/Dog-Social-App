import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Feed.css";
import axios from "axios";
import MessageSender from "./MessageSender";
import Post from "./Post";
import Profile from "./Profile";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let bark_id = 1;
    Promise.all([axios.get(`/barks/${bark_id}`)])
      .then((responses) => {
        console.log("Responses: ", responses);
        console.log(responses[0]);
        const posts = responses[0].data;
        setPosts(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="feed">
      <Profile />
      <MessageSender setPosts={setPosts} />
      {posts.map((post) => {
        console.log("Post: ", post);
        return (
          <Post
            bark_id={post.id}
            profile_pic_url={post.profile_pic_url}
            dog_name={post.dog_name}
            created_at={post.created_at}
            caption={post.caption}
            image_url={post.image_url}
            paws={post.paws}
          />
        );
      })}
    </div>
  );
}

export default Feed;
