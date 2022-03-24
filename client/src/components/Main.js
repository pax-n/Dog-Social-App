import "./App.css";
import React, { useState } from "react";
import Sidebar from "./layout/Sidebar";
import Feed from "./Feed";

function Main() {
  const [show, setShow] = useState("Feed");
  const changePage = (page) => {
    setShow(page);
  };

  return (
      <div className="body">
        <Sidebar changePage={changePage} />
        <Feed show={show} />
      </div>
  );
}

export default Main;
