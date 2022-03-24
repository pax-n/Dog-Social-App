import React from "react";
import { createContext, useState, useEffect } from 'react';
import axios from "axios";

export const userContext = createContext();

export default function UserProvider(props) {
  const [loggedin, setLoggedin] = useState(false);
  const [userDog, setUserDog] = useState(null);

  // Perform login process for the user & save ID etc
  const login = function(email, password) {
    
    
    // Promise.all([axios.get("/login:"+email)])
    //   .then((responses) => {
    //     console.log(responses[0]);
    //   })
    //   .catch((error) => {
    //     console.log("Provider error: ", error);
    //   });
   
    setLoggedin(true);
    const id = "1";
    setUserDog({ id });
  };

  const logout = function() {
    setLoggedin(false);
    setUserDog(null);
  };

  // userContext will expose these items
  const userData = { loggedin, userDog, login, logout };

  // We can use this component to wrap any content we want to share this context
  return (
    <userContext.Provider value={userData}>
      {props.children}
    </userContext.Provider>
  );
};