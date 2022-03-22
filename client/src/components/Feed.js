import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Feed.css";
import axios from "axios";
import MessageSender from "./MessageSender";
import Post from "./Post";

function Feed() {
  const [posts, setPosts] = useState([
    {
      profile_pic_url:
        "https://www.nicepng.com/png/detail/1-10149_doge-deal-with-it-doge-png-transparent.png",
      username: "Doge",
      timestamp: "Time",
      caption: "Tibetan Mastiff",
      image_url:
        "https://images.ctfassets.net/a9237abdyvg9/5XYBjAvKsMFUid5n7Dm1hp/9d6542ace2f3e816b0498c03df8fe6ee/doge.jpeg",
      paws: "10",
    },
  ]);

  useEffect(() => {
    Promise.all([axios.get("/barks")])
      .then((responses) => {
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
      <MessageSender />
      {posts.map((post) => {
        return (
          <Post
            profile_pic_url={post.profile_pic_url}
            dog_name={post.dog_name}
            created_at={post.created_at}
            caption={post.caption}
            image_url={post.image_url}
            paws={post.paws}
          />
        );
      })}

      {/* <Post
        profilePic="https://www.nicepng.com/png/detail/1-10149_doge-deal-with-it-doge-png-transparent.png"
        username="Doge"
        timestamp="Time"
        message="World Hello"
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
      /> */}
    </div>
  );
}

export default Feed;
