import React from "react";
import "./SidebarRow.css";

function SidebarRow({ Icon, sideName }) {
  return (
    <div className="sidebarRow">
      {Icon && <Icon />}
      <h4>{sideName}</h4>
    </div>
  );
}

export default SidebarRow;
