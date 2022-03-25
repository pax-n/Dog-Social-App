import "./App.css";
import { useContext } from "react";
import { userContext } from "./providers/UserProvider";
import { toggleContext } from "./providers/ToggleProvider";
import React, { useState } from "react";
import axios from "axios";
import Header from "./layout/Header";
import Login from "./Login";
import Register from "./Register";
import Sidebar from "./layout/Sidebar";
import Feed from "./Feed";

function App() {
  const { loggedin, setUser } = useContext(userContext);
  const { toggleRegister } = useContext(toggleContext);
  const [show, setShow] = useState("Feed");
  const changePage = (page) => {
    setShow(page);
  };
  axios.get("/auth").then((responses) => {
    console.log("Response: ", responses.data);
    if (responses.data) {
      setUser(responses.data)
    };
  });

  return (
    <div className="App">
      <Header changePage={changePage} />
      <div className="body">
        {!loggedin && toggleRegister && <Register />}
        {!loggedin && !toggleRegister && <Login />}
        {loggedin && <Sidebar changePage={changePage} />}
        {loggedin && <Feed show={show} />}
        {/* Uncomment above code once cookies properly implemented
        Until then, manually comment and uncomment below code as needed */}
        {/* <Login /> */}
        {/* <Register /> */}
        {/* <Sidebar changePage={changePage} />
        <Feed show={show} /> */}
      </div>
    </div>
  );
}

export default App;
