import React from "react";
import { useState, useEffect } from "react";
import "./FriendsList.css";
import "./FriendRequest.css";
import FriendsListUser from "./FriendsListUser";
import FriendRequest from "./FriendRequest";
import axios from "axios";
import { useContext } from "react";
import { userContext } from "./providers/UserProvider";
import { toggleContext } from "./providers/ToggleProvider";

function FriendsList({ changePage }) {
  const [friends, setFriends] = useState([]);
  const [friendReqs, setfriendReqs] = useState([]);
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
    //Gets list of requested friends for user and populates the friendrequests section
    axios.get(`/api/friendreqs/${dog_id}`).then((response) => {
      console.log("Friends request response: ", response);
      let friendreqlist = response.data;
      setfriendReqs(friendreqlist);
    });
  }, []);


  const handleProfileClick = (page, friend) => () => {
    settargetID(friend);
    changePage(page);
  }

  const onHandleFriend = (handle, dog_id) => {
    const data = { requested_dog_id: dog_id, target_dog_id: userDog};
    axios.post(`/api/${handle}friend/`, data).then((response) => {
      axios.get(`/api/friendreqs/${userDog}`).then((response) => {
        console.log("Friends request response: ", response);
        let friendreqlist = response.data;
        setfriendReqs(friendreqlist);
      });
      if (handle === 'confirm') {
        axios.get(`/api/friends/${userDog}`).then((response) => {
          console.log("Friends response: ", response);
          let friendlist = response.data;
          setFriends(friendlist);
        });
      }
    });
  }

  return (
    <div className="friendslist">
          {friendReqs[0] && 
       <div className="FriendRequest">
        <div className="FriendRequest__from">
            <p>New friend request from...</p>
        </div>
        {friendReqs.map((friendreq) => {
          return (
            <FriendRequest 
            profile_pic_url={friendreq.profile_pic_url}
            name={friendreq.dog_name}
            dog_id = {friendreq.id}
            onClick={handleProfileClick("Profile", friendreq.id)}
            onHandleFriend={onHandleFriend}
            />
            )
          })}
      </div>
        }
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
