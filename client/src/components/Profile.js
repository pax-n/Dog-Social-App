import React from "react";
import { useState, useEffect } from "react";
import "./Profile.css";
import ProfileFriends from "./ProfileFriends";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
import PetsIcon from "@mui/icons-material/Pets";
import WcIcon from "@mui/icons-material/Wc";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import axios from "axios";

function Profile({
  username,
  profilePic,
  bio,
  ownerName,
  breed,
  gender,
  location,
}) {
  const [friends, setFriends] = useState([
    {
      profilePic:
        "https://www.nicepng.com/png/detail/1-10149_doge-deal-with-it-doge-png-transparent.png",
      name: "Doge",
    },
    {
      profilePic:
        "https://www.nicepng.com/png/detail/1-10149_doge-deal-with-it-doge-png-transparent.png",
      name: "Doge",
    },
    {
      profilePic:
        "https://www.nicepng.com/png/detail/1-10149_doge-deal-with-it-doge-png-transparent.png",
      name: "Doge",
    },
    {
      profilePic:
        "https://www.nicepng.com/png/detail/1-10149_doge-deal-with-it-doge-png-transparent.png",
      name: "Doge",
    },
  ]);

  useEffect(() => {
    //Gets list of friends for user 1 and populates the friends section.
    let dog_id = 1;
    axios.get(`/api/friends/${dog_id}`).then((response) => {
      console.log("Friends response: ", response);
      const friends = response;
    });
  });
  return (
    <div className="profile">
      <div className="profile__top">
        <div className="profile__banner"></div>
        <Avatar
          className="profile__avatar"
          src={profilePic}
          sx={{ height: "100px", width: "100px" }}
        />
        <div className="profile__user">
          <p>{username}Username</p>
          <Button variant="outlined">Add Friend</Button>
        </div>
      </div>

      <div className="profile__bottom">
        <div className="profile__description">
          <div className="profile__bio">
            <LibraryBooksIcon />
            <p>{bio}Bio</p>
          </div>
          <div className="profile__owner">
            <PersonIcon />
            <p>{ownerName}Owner</p>
          </div>
          <div className="profile__breed">
            <PetsIcon />
            <p>{breed}Breed</p>
          </div>
          <div className="profile__gender">
            <WcIcon />
            <p>{gender}Gender</p>
          </div>
          <div className="profile__country">
            <PublicIcon />
            <p>{location}Location</p>
          </div>
        </div>

        <div className="profile__friends">
          <h4>Friends</h4>
          <div className="profile__friendslist">
            {friends.map((friend) => {
              return (
                <ProfileFriends
                  profilePic={friend.profilePic}
                  name={friend.name}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
