import React from "react";
import { createContext, useState, useEffect } from 'react';
import axios from "axios";

export const userContext = createContext();

export default function UserProvider(props) {
  const [loggedin, setLoggedin] = useState(false);
  const [userDog, setUserDog] = useState(null);
  const [userInfo, setUserInfo] = useState({bio_description:null,birth_date:null,breed_id:null,created_at:null,dog_name:null,email:null,gender:null,id:null,location:null,owner_first_name:null,owner_last_name:null,password:null,profile_pic_url:null,updated_at:null});

  
  // Perform login process for the user & save ID etc
  const login = function(id) {  
    setLoggedin(true);
    setUserDog(id);
  };

  const logout = function() {
    setLoggedin(false);
    setUserDog(null);
    setUserInfo({bio_description:null,birth_date:null,breed_id:null,created_at:null,dog_name:null,email:null,gender:null,id:null,location:null,owner_first_name:null,owner_last_name:null,password:null,profile_pic_url:null,updated_at:null});
  };

  // userContext will expose these items
  const userData = { loggedin, userDog, userInfo, setUserInfo, login, logout };

  // We can use this component to wrap any content we want to share this context
  return (
    <userContext.Provider value={userData}>
      {props.children}
    </userContext.Provider>
  );
};