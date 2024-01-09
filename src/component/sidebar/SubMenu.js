import React from "react";
import { NavLink } from "react-router-dom";

const SubMenu = ({ subMenuItems, activeSubMenu }) => {
  return (
    <ul className="sidebar-menu">
      {subMenuItems.map((item, index) => (
        <li
          key={index}
          className={activeSubMenu === item.label ? "active" : ""}
        >
          <NavLink to={item.route} className="navItem" style={{ marginLeft: 20 }}>
            <span className="flex items-center">
              {item.icon} &nbsp; &nbsp; <span> {item.label}</span>
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;
