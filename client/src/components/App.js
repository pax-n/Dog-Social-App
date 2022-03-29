import "./App.css";
import { useContext, useEffect } from "react";
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
  const { loggedin, login, setUserInfo } = useContext(userContext);
  const { toggleRegister } = useContext(toggleContext);
  const [show, setShow] = useState("Feed");
  const changePage = (page) => {
    setShow(page);
  };
  useEffect(() => {
    axios.get("/auth").then((responses) => {
      if (responses.data) {
        login(responses.data);
        axios.get(`/dog/${responses.data}`).then((dog) => {
          setUserInfo(dog.data);
        });
      }
    });
  }, [loggedin]);

  return (
    <div className="App">
      <Header changePage={changePage} />
      <div className="body">
        {!loggedin && toggleRegister && <Register />}
        {!loggedin && !toggleRegister && <Login />}
        {loggedin && <Sidebar changePage={changePage} />}
        {loggedin && <Feed show={show} changePage={changePage} />}
        {/* <Sidebar changePage={changePage} />
        <Feed show={show} changePage={changePage} /> */}
      </div>
    </div>
  );
}

export default App;
