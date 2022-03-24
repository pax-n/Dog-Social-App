import React from "react";
import SidebarRow from "./SidebarRow";
import "./Sidebar.css";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ChatIcon from "@mui/icons-material/Chat";

function Sidebar({ changePage }) {
  const handleClick = (page) => () => {
    changePage(page);
  };

  return (
    <div className="sidebar">
      <SidebarRow
        onClick={handleClick("Profile")}
        Icon={PersonIcon}
        sideName="Profile"
      />
      <SidebarRow
        onClick={handleClick("Friends")}
        Icon={GroupIcon}
        sideName="Friends"
      />
      <SidebarRow
        onClick={handleClick("Events")}
        Icon={CalendarMonthIcon}
        sideName="Events"
      />
      <SidebarRow
        onClick={handleClick("Market")}
        Icon={StorefrontIcon}
        sideName="Marketplace"
      />
      <SidebarRow
        onClick={handleClick("Chat")}
        Icon={ChatIcon}
        sideName="Chat"
      />
    </div>
  );
}

export default Sidebar;
