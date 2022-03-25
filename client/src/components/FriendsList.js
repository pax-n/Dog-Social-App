import React from "react";
import { useState } from "react";
import "./FriendsList.css";
import FriendsListUser from "./FriendsListUser";

function FriendsList() {
  const [friends, setFriends] = useState([]);
  return (
    <div className="friendslist">
      <div className="friendslist__title">
        <h2>Friends</h2>
      </div>
      <div className="friendslist__users">
        {friends.map((friend) => {
          return (
            <FriendsListUser
              profilePic={friend.profilePic}
              user={friend.user}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FriendsList;
