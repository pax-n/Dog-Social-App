import React from "react";
import "./SidebarRow.css";

//same as using props
function SidebarRow({ Icon, sideName, onClick }) {
  return (
    <div onClick={onClick} className="sidebarRow">
      {Icon && <Icon />}
      <h4>{sideName}</h4>
    </div>
  );
}

export default SidebarRow;
