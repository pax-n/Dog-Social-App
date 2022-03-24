import "./App.css";
import { useContext } from 'react';
import { userContext } from './providers/UserProvider';
import { toggleContext } from './providers/ToggleProvider';
import React, { useState } from "react";
import Header from "./layout/Header";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";

function App() {
  const { loggedin } = useContext(userContext);
  const { toggleRegister } = useContext(toggleContext);
  const [show, setShow] = useState("Feed");
  const changePage = (page) => {
    setShow(page);
  };

  return (
    <div className="App">
      <Header changePage={changePage} />
      <div className="body">
        {!loggedin && toggleRegister && <Register />}
        {!loggedin && !toggleRegister && <Login />}
        {loggedin && <Main />}
        {/* Uncomment above code once cookies properly implemented
        Until then, manually comment and uncomment below code as needed */}
        {/* <Login /> */}
        {/* <Register /> */}
        {/* <Main /> */}
      </div>
    </div>
  );
}

export default App;
