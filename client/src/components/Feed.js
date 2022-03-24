import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Feed.css";
import axios from "axios";
import MessageSender from "./MessageSender";
import Post from "./Post";
import Profile from "./Profile";
import FriendsList from "./FriendsList";

function Feed({ show }) {
  const [posts, setPosts] = useState([
    {
      profile_pic_url:
        "https://www.nicepng.com/png/detail/1-10149_doge-deal-with-it-doge-png-transparent.png",
      dog_name: "Doge",
      created_at: "Time",
      caption: "World Hello",
      image_url:
        "https://images.ctfassets.net/a9237abdyvg9/5XYBjAvKsMFUid5n7Dm1hp/9d6542ace2f3e816b0498c03df8fe6ee/doge.jpeg",
      paws: "10",
    },
  ]);

  const [paws, setPaws] = useState(0);
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
      {show === "Profile" && <Profile />}
      {show === "Friends" && <FriendsList />}
      {show === "Feed" && (
        <>
          <MessageSender setPosts={setPosts} />
          {posts.map((post) => {
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
        </>
      )}
    </div>
  );
}

export default Feed;
