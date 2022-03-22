import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Feed.css";
import MessageSender from "./MessageSender";
import Post from "./Post";
import Profile from "./Profile";

function Feed() {
  const [posts, setPosts] = useState([
    {
      profilePic:
        "https://www.nicepng.com/png/detail/1-10149_doge-deal-with-it-doge-png-transparent.png",
      username: "Doge",
      timestamp: "Time",
      message: "World Hello",
      image:
        "https://images.ctfassets.net/a9237abdyvg9/5XYBjAvKsMFUid5n7Dm1hp/9d6542ace2f3e816b0498c03df8fe6ee/doge.jpeg",
      paws: "10",
    },
    {
      profilePic:
        "https://www.nicepng.com/png/detail/1-10149_doge-deal-with-it-doge-png-transparent.png",
      username: "Doge",
      timestamp: "Time",
      message: "Hey Test",
      image:
        "https://images.ctfassets.net/a9237abdyvg9/5XYBjAvKsMFUid5n7Dm1hp/9d6542ace2f3e816b0498c03df8fe6ee/doge.jpeg",
      paws: "10",
    },
  ]);

  useEffect(() => {
    alert("OH NO ALERT");
  }, []);

  return (
    <div className="feed">
      <Profile />
      <MessageSender />
      {posts.map((post) => {
        return (
          <Post
            profilePic={post.profilePic}
            username={post.username}
            timestamp={post.timestamp}
            message={post.message}
            image={post.image}
            paws={post.paws}
          />
        );
      })}
    </div>
  );
}

export default Feed;
