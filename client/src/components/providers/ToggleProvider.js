import React from "react";
import { createContext, useState } from 'react';

export const toggleContext = createContext();

export default function ToggleProvider(props) {
  const [toggleRegister, settoggleRegister] = useState(false);
  const [targetID, settargetID] = useState(null);

  // Reset toggle
  const toggleReset = function() {
    settoggleRegister(false);
  }

  // Perform toggle process
  const toggle = function() {
    settoggleRegister(!toggleRegister);
  };

  // toggleContext will expose these items
  const toggleData = { toggleRegister, targetID, toggle, toggleReset, settargetID };

  // We can use this component to wrap any content we want to share this context
  return (
    <toggleContext.Provider value={toggleData}>
      {props.children}
    </toggleContext.Provider>
  );
};