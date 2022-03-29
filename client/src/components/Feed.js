import React from "react";
import { useEffect, useState, useContext } from "react";
import { toggleContext } from "./providers/ToggleProvider";
import "./Feed.css";
import axios from "axios";
import MessageSender from "./MessageSender";
import Post from "./Post";
import Profile from "./Profile";
import FriendsList from "./FriendsList";
import SearchResults from "./SearchResults";
import EventsFeed from "./events/EventsFeed";
import EventsPage from "./events/EventsPage";
import resolveProps from "@mui/utils/resolveProps";
import { userContext } from "./providers/UserProvider";
import MarketplaceFeed from "./marketplace/MarketplaceFeed";

function Feed({ show, changePage }) {
  const [posts, setPosts] = useState([]);
  const { targetEvent, targetID, searchQuery } = useContext(toggleContext);
  const [paws, setPaws] = useState(0);
  const [isswitch, setisswitch] = useState(false);

  useEffect(() => {
    let dog_id = 1;
    Promise.all([axios.get(`/barks/${dog_id}`) ]) //, axios.get(`/paws/${dog_id}`)])
      .then((responses) => {
        const posts = responses[0].data;
        setPosts(posts);
        setisswitch(!isswitch);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="feed">
      {show === "Market" && <MarketplaceFeed changePage={changePage} />}
      {show === "Search" && (
        <SearchResults changePage={changePage} searchQuery={searchQuery} />
      )}
      {show === "Events" && (
        <EventsFeed changePage={changePage} targetEvent={targetEvent} />
      )}
      {/* {show === "Events Page" && (
        <EventsPage changePage={changePage} targetEvent={targetEvent} />
      )} */}
      {show === "Friends" && <FriendsList changePage={changePage} />}
      {show === "Profile" && (
        <Profile userID={targetID} changePage={changePage} />
      )}
      {show === "Feed" && (
        <>
          <MessageSender 
            setPosts={setPosts} 
            setPaws={setPaws}
            isswitch={isswitch}
            setisswitch={setisswitch}
             />
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
                isswitch={isswitch}
                setisswitch={setisswitch}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default Feed;
