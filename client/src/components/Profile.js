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
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useContext } from "react";
import { userContext } from "./providers/UserProvider";
import { toggleContext } from "./providers/ToggleProvider";

function Profile({ changePage, userID }) {
  const [ownProfile, setOwnProfile] = useState(true);
  const [isFriend, setisFriend] = useState(false);
  const [isSwitch, setisSwitch] = useState(true);

  const [friends, setFriends] = useState([
    {
      profilePic: null,
      name: null,
      id: null,
    },
  ]);
  const [profile, setProfile] = useState([
    {
      bio_description: null,
      owner_first_name: null,
      owner_last_name: null,
      breed_id: null,
      gender: null,
      location: null,
      profile_pic_url: null,
    },
  ]);
  const { userDog } = useContext(userContext);
  const { settargetID } = useContext(toggleContext);

  useEffect(() => {
    //Gets list of friends for user 1 and populates the friends section.
    let dog_id = userID;
    axios.get(`/api/friends/${dog_id}`).then((response) => {
      let friendlist = response.data;
      setFriends(friendlist);
      for (let friend in friendlist) {
        if (friendlist[friend].id === userDog) {
           setisFriend(true);
           return;
        } 
      }
    });
    console.log(dog_id)
    axios.get(`/api/friendsrequests/${dog_id}`).then((response) => {
      let friendlist = response.data;
      for (let friend in friendlist) {
        if (friendlist[friend].id === userDog) {
            setisFriend(true);
            return;
        } 
      }
    });
    setisFriend(false);    
  }, [userID, isSwitch]);

  useEffect(() => {
    let dog_id = userID;
    axios.get(`/api/profile/${dog_id}`).then((response) => {
      setProfile(response.data);
    });
    if (userID !== userDog) {
      setOwnProfile(false);
    } else {
      setOwnProfile(true);
    }
  }, [userID, isSwitch]);

  const addDogAsFriend = () => {
    let requested_dog_id = userDog;

    let target_dog_id = userID;
    const data = { requested_dog_id, target_dog_id };
    axios.post(`/api/addfriend/`, data).then((response) => {
      setisSwitch(!isSwitch);
    });
  };

  const parseGender = (genderKey) => {
    if (genderKey === "m") {
      return "Male";
    } else if (genderKey === "f") {
      return "Female";
    } else if (genderKey === "u") {
      return "Other/Unknown";
    }
  };

  const parseBreed = (breedKey) => {
    const breedList = [
      "Shiba Inu",
      "Dachshund",
      "Labrador Retriever",
      "Shih-tzu",
      "Husky",
      "Poodle",
      "Greyhound",
    ];
    return breedList[breedKey - 1];
  };

  const handleProfileClick = (page, friend) => () => {
    settargetID(friend);
    changePage(page);
  };
console.log("ownProfile = ", ownProfile, "isFriend = ", isFriend);
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
          {!ownProfile && !isFriend && (
            <Button variant="outlined" color="success" onClick={addDogAsFriend}>
              Add Friend
            </Button>
          )}
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
            <p>Breed: {parseBreed(profile.breed_id)}</p>
          </div>
          <div className="profile__gender">
            <WcIcon />
            <p>Gender: {parseGender(profile.gender)}</p>
          </div>
          <div className="profile__country">
            <PublicIcon />
            <p>Location: {profile.location}</p>
          </div>
        </div>

        <div className="profile__friends">
          <h4>Friends</h4>
          <div className="profile__friendslist">
            <Box>
              <Grid container spacing={0}>
                {friends.map((friend) => {
                  return (
                    <ProfileFriends
                      profilePic={friend.profile_pic_url}
                      name={friend.dog_name}
                      onClick={handleProfileClick("Profile", friend.id)}
                    />
                  );
                })}
              </Grid>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
