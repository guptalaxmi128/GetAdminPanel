import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  Home,
  Users,
  Gift,
  DollarSign,
  Award,
  BookOpen,
  Bell,
  FileText,
  Heart,
  Power,
  X,
  CheckCircle,
} from "react-feather";
import logo from "../../assets/images/logo.png";
import SubMenu from "./SubMenu";

const subMenuItems = [
  {
    label: "Raise Fund ",
    route: "/raise-fund-request",
    icon: <DollarSign size={24} />,
  },

  {
    label: "Account",
    route: "/account-request",
    icon: <Users size={24} />,
  },

  {
    label: "Profile",
    route: "/profile-request",
    icon: <User size={24} />,
  },
  {
    label: "Qualification",
    route: "/qualification-request",
    icon: <Award size={24} />,
  },
];

const Sidebar = ({ toggle }) => {
  const [activeItem, setActiveItem] = useState(0);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null)

  const handleItemClick = (index) => {
    if (index === 3) {
      setActiveSubMenu("Request");
      setShowSubMenu(!showSubMenu);
    } else {
      setShowSubMenu(false);
      setActiveItem(index);
      setActiveSubMenu(null); 
    }
  };

  

  const handleLogout = () => {
    localStorage.removeItem("authToken");
  };

  return (
    <div className="sidebar-wrapper group w-0  xl:w-[248px] xl:block">
      <div
        id="bodyOverlay"
        className="w-screen h-screen fixed top-0 bg-slate-900 bg-opacity-50 backdrop-blur-sm z-10 hidden"
      ></div>
      <div className="logo-segment">
        <NavLink className="flex items-center" to="/">
          <img
            src={logo}
            className="white_logo"
            alt="logo"
            width={50}
            height={50}
          />
          <span className="ltr:ml-3 rtl:mr-3 text-xl font-Inter font-bold text-slate-900 dark:text-white">
            GET
          </span>
        </NavLink>
        <button
          className="sidebarCloseIcon text-2xl inline-block xl:hidden"
          onClick={toggle}
        >
          <X size={24} />
        </button>
      </div>
      <div
        id="nav_shadow"
        className="nav_shadow h-[60px] absolute top-[0px] nav-shadow z-[1] w-full  pointer-events-none
  opacity-0"
      ></div>
      <div
        className="sidebar-menus bg-white dark:bg-slate-800 py-2 px-4 h-[calc(100%-80px)] z-50 "
        id="sidebar_menus"
      >
       <div className="sidebar-content">
        <ul className="sidebar-menu">
          <li
            className={activeItem === 0 ? "active" : ""}
            onClick={() => handleItemClick(0)}
          >
            <NavLink to="/home" className="navItem">
              <span className="flex items-center">
                <Home size={24} /> &nbsp; &nbsp;
                <span>Dashboard</span>
              </span>
            </NavLink>
          </li>

          <li
            className={activeItem === 1 ? "active" : ""}
            onClick={() => handleItemClick(1)}
          >
            <NavLink to="/student" className="navItem">
              <span className="flex items-center">
                <Users size={24} />
                &nbsp; &nbsp;
                <span>Students</span>
              </span>
            </NavLink>
          </li>
          <li
            className={activeItem === 2 ? "active" : ""}
            onClick={() => handleItemClick(2)}
          >
            <NavLink to="/donar" className="navItem">
              <span className="flex items-center">
                <Gift size={24} /> &nbsp; &nbsp;
                <span>Donar</span>
              </span>
            </NavLink>
          </li>
          <li
            className={activeItem === 3 ? "active" : ""}
            onClick={() => handleItemClick(3)}
          >
            <NavLink to="#"
             className="request"
             >
              <span className="flex items-center">
                <DollarSign size={24} />
                &nbsp; &nbsp;
                <span> Request</span>
              </span>
            </NavLink>
          </li>
       {showSubMenu && <SubMenu subMenuItems={subMenuItems} activeSubMenu={activeSubMenu} /> }   

          <li
            className={activeItem === 4 ? "active" : ""}
            onClick={() => handleItemClick(4)}
          >
            <NavLink to="/donated" className="navItem">
              <span className="flex items-center">
                <CheckCircle size={24} /> &nbsp;&nbsp;&nbsp;
                <span>Donated</span>
              </span>
            </NavLink>
          </li>
          <li
            className={activeItem === 5 ? "active" : ""}
            onClick={() => handleItemClick(5)}
          >
            <NavLink to="/course-offered" className="navItem">
              <span className="flex items-center">
                <BookOpen size={24} />
                &nbsp;&nbsp;&nbsp;
                <span>Course Offered</span>
              </span>
            </NavLink>
          </li>
          <li
            className={activeItem === 6 ? "active" : ""}
            onClick={() => handleItemClick(6)}
          >
            <NavLink to="/notification" className="navItem">
              <span className="flex items-center">
                <Bell size={24} />
                &nbsp;&nbsp;&nbsp;
                <span>Notification</span>
              </span>
            </NavLink>
          </li>
          <li
            className={activeItem === 7 ? "active" : ""}
            onClick={() => handleItemClick(7)}
          >
            <NavLink to="/invoice" className="navItem">
              <span className="flex items-center">
                <FileText size={24} />
                &nbsp;&nbsp;&nbsp;
                <span>Invoice Generate</span>
              </span>
            </NavLink>
          </li>
          <li
            className={activeItem === 8 ? "active" : ""}
            onClick={() => handleItemClick(8)}
          >
            <NavLink to="/open-donar-data" className="navItem">
              <span className="flex items-center">
                <Heart size={24} />
                &nbsp;&nbsp;&nbsp;
                <span>Open Source Donar</span>
              </span>
            </NavLink>
          </li>
          <li
            className={activeItem === 9 ? "active" : ""}
            onClick={() => handleItemClick(9)}
          >
            <NavLink to="/" className="navItem" onClick={handleLogout}>
              <span className="flex items-center">
                <Power size={24} />
                &nbsp;&nbsp;&nbsp;
                <span>Logout</span>
              </span>
            </NavLink>
          </li>
        </ul>
        </div>
      </div>
    </div>
    // {/* <!-- End: Sidebar --> */}
  );
};

export default Sidebar;
