import React from "react";
import SidebarRow from "./SidebarRow";
import "./Sidebar.css";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ChatIcon from "@mui/icons-material/Chat";

function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarRow Icon={PersonIcon} sideName="Profile" />
      <SidebarRow Icon={GroupIcon} sideName="Friends" />
      <SidebarRow Icon={CalendarMonthIcon} sideName="Events" />
      <SidebarRow Icon={StorefrontIcon} sideName="Marketplace" />
      <SidebarRow Icon={ChatIcon} sideName="Chat" />
    </div>
  );
}

export default Sidebar;
