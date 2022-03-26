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
import { useContext } from "react";
import { userContext } from "./providers/UserProvider";

function Profile({
  dog_name,
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
  ]);
  const [profile, setProfile] = useState([
    {
      bio_description: "A doggo.",
      owner_first_name: "Doge",
      owner_last_name: "Dogest",
      breed_id: 1,
      Gender: "m",
      Location: "Toronto, ON, Canada",
      profile_pic_url:
        "https://m.media-amazon.com/images/I/51Tahu98IiL._AC_SL1001_.jpg",
    },
  ]);
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

  useEffect(() => {
    let dog_id = userDog;
    axios.get(`/api/profile/${dog_id}`).then((response) => {
      console.log("Profile response: ", response);
      setProfile(response.data);
    });
  }, []);

  const addDogAsFriend = () => {
    let requested_dog_id = userDog;

    //PLACEHOLDER until profiles are set up.
    let target_dog_id = 10;
    const data = { requested_dog_id, target_dog_id };
    axios.post(`/api/addfriend/`, data).then((response) => {
      console.log("Add dog as friend response: ");
    });
  };
  return (
    <div className="profile">
      <div className="profile__top">
        <div className="profile__banner"></div>
        <Avatar
          className="profile__avatar"
          src={profile.profile_pic_url}
          sx={{ height: "100px", width: "100px" }}
        />
        <div className="profile__user">
          <p>{profile.dog_name}</p>
          <Button variant="outlined" onClick={addDogAsFriend}>
            Add Friend
          </Button>
        </div>
      </div>

      <div className="profile__bottom">
        <div className="profile__description">
          <div className="profile__bio">
            <LibraryBooksIcon />
            <p>Bio: {profile.bio_description}</p>
          </div>
          <div className="profile__owner">
            <PersonIcon />
            <p>
              Owner: {profile.owner_first_name} {profile.owner_last_name}
            </p>
          </div>
          <div className="profile__breed">
            <PetsIcon />
            <p>Breed: {profile.breed_id}</p>
          </div>
          <div className="profile__gender">
            <WcIcon />
            <p>Gender: {profile.gender}</p>
          </div>
          <div className="profile__country">
            <PublicIcon />
            <p>Location: {profile.location}</p>
          </div>
        </div>

        <div className="profile__friends">
          <h4>Friends</h4>
          <div className="profile__friendslist">
            {friends.map((friend) => {
              return (
                <ProfileFriends
                  profilePic={friend.profile_pic_url}
                  name={friend.dog_name}
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
