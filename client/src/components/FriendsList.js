import React from "react";
import { useState, useEffect } from "react";
import "./FriendsList.css";
import FriendsListUser from "./FriendsListUser";
import axios from "axios";
import { useContext } from "react";
import { userContext } from "./providers/UserProvider";

function FriendsList() {
  const [friends, setFriends] = useState([]);
  const { userDog } = useContext(userContext);

  useEffect(() => {
    //Gets list of friends for user 1 and populates the friends section.
    let dog_id = userDog;
    axios.get(`/api/friends/${dog_id}`).then((response) => {
      console.log("Friends response: ", response);
      let friendlist = response.data;
      setFriends(friendlist);
    });
  }, []);

  return (
    <div className="friendslist">
      <div className="friendslist__title">
        <h2>Friends</h2>
      </div>
      <div className="friendslist__users">
        {friends.map((friend) => {
          return (
            <FriendsListUser
              profile_pic_url={friend.profile_pic_url}
              name={friend.dog_name}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FriendsList;
