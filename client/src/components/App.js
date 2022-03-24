import "./App.css";
import React, { useState } from "react";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import Feed from "./Feed";

function App() {
  const [show, setShow] = useState("Feed");
  const changePage = (page) => {
    setShow(page);
  };

  return (
    <div className="App">
      <Header changePage={changePage} />
      <div className="body">
        <Sidebar changePage={changePage} />
        <Feed show={show} />
      </div>
    </div>
  );
}

export default App;
