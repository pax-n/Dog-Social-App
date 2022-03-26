import React from "react";
import { useState, useEffect } from "react";
import "./FriendsList.css";
import FriendsListUser from "./FriendsListUser";
import FriendRequest from "./FriendRequest";
import axios from "axios";
import { useContext } from "react";
import { userContext } from "./providers/UserProvider";
import { toggleContext } from "./providers/ToggleProvider";

function FriendsList({ changePage }) {
  const [friends, setFriends] = useState([]);
  const { userDog } = useContext(userContext);
  const { settargetID } = useContext(toggleContext);

  useEffect(() => {
    //Gets list of friends for user 1 and populates the friends section.
    let dog_id = userDog;
    axios.get(`/api/friends/${dog_id}`).then((response) => {
      console.log("Friends response: ", response);
      let friendlist = response.data;
      setFriends(friendlist);
    });
  }, []);

  const handleProfileClick = (page, friend) => () => {
    settargetID(friend);
    changePage(page);
  }

  return (
    <div className="friendslist">
      <FriendRequest />
      <div className="friendslist__main">
        <div className="friendslist__title">
          <h2>Friends</h2>
        </div>
        <div className="friendslist__users">
          {friends.map((friend) => {
            return (
              <FriendsListUser
                profile_pic_url={friend.profile_pic_url}
                name={friend.dog_name}
                onClick={handleProfileClick("Profile", friend.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FriendsList;
