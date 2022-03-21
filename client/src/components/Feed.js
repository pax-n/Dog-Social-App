import React from "react";
import "./Feed.css";
import MessageSender from "./MessageSender";
import Post from "./Post";

function Feed() {
  return (
    <div className="feed">
      <MessageSender />
      <Post
        profilePic=""
        username="Username"
        timestamp="Time"
        message="Hello World"
        image="https://images.ctfassets.net/a9237abdyvg9/5XYBjAvKsMFUid5n7Dm1hp/9d6542ace2f3e816b0498c03df8fe6ee/doge.jpeg"
        paws="10"
      />
      <Post
        profilePic=""
        username="Username"
        timestamp="Time"
        message="Hello World"
        image="https://images.ctfassets.net/a9237abdyvg9/5XYBjAvKsMFUid5n7Dm1hp/9d6542ace2f3e816b0498c03df8fe6ee/doge.jpeg"
        paws="10"
      />
    </div>
  );
}

export default Feed;
