import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import Sidebar from "../sidebar/Sidebar";
import user from "../../assets/images/user/user-1.jpg";
import qrCode from "../../assets/qrCode.png";
import AccountInfo from "./accountinfo/AccountInfo";

const Profile = () => {
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDateOfBirthChange = (date) => {
    setDateOfBirth(date[0]);
  };
  return (
    <>
      <Sidebar />
      <div
        className="flex flex-col justify-between min-h-screen"
        style={{ marginLeft: "248px" }}
      >
        <div>
          {/* <!-- BEGIN: Header --> */}
          {/* <!-- BEGIN: Header --> */}
          <div className="z-[9]" id="app_header">
            <div className="app-header z-[999] bg-white dark:bg-slate-800 shadow-sm dark:shadow-slate-700">
              <div className="flex justify-between items-center h-full">
                <div className="flex items-center md:space-x-4 space-x-4 rtl:space-x-reverse vertical-box">
                  <a
                    href="index.html"
                    className="mobile-logo xl:hidden inline-block"
                  >
                    {/* <img
                      src="assets/images/logo/logo-c.svg"
                      className="black_logo"
                      alt="logo"
                    />
                    <img
                      src="assets/images/logo/logo-c-white.svg"
                      className="white_logo"
                      alt="logo"
                    /> */}
                  </a>
                  <button className="smallDeviceMenuController open-sdiebar-controller hidden xl:hidden md:inline-block">
                    {/* <iconify-icon
                      className="leading-none bg-transparent relative text-xl top-[2px] text-slate-900 dark:text-white"
                      icon="heroicons-outline:menu-alt-3"
                    ></iconify-icon> */}
                    {/* <MenuIcon /> */}
                  </button>
                  <button className="sidebarOpenButton text-xl text-slate-900 dark:text-white !ml-0 hidden rtl:rotate-180">
                    <iconify-icon icon="ph:arrow-right-bold"></iconify-icon>
                  </button>
                  <button
                    className="flex items-center xl:text-sm text-lg xl:text-slate-400 text-slate-800 dark:text-slate-300 focus:outline-none focus:shadow-none px-1 space-x-3
        rtl:space-x-reverse search-modal"
                    data-bs-toggle="modal"
                    data-bs-target="#searchModal"
                  >
                    <SearchIcon />
                    <span className="xl:inline-block hidden">Search...</span>
                  </button>
                </div>
                {/* <!-- end vertcial --> */}
                <div className="items-center space-x-4 rtl:space-x-reverse horizental-box">
                  <a href="index.html" className="leading-0">
                    <span className="xl:inline-block hidden">
                      <img
                        src="assets/images/logo/logo.svg"
                        className="black_logo "
                        alt="logo"
                      />
                      <img
                        src="assets/images/logo/logo-white.svg"
                        className="white_logo"
                        alt="logo"
                      />
                    </span>
                    <span className="xl:hidden inline-block">
                      <img
                        src="assets/images/logo/logo-c.svg"
                        className="black_logo "
                        alt="logo"
                      />
                      <img
                        src="assets/images/logo/logo-c-white.svg"
                        className="white_logo "
                        alt="logo"
                      />
                    </span>
                  </a>
                  <button className="smallDeviceMenuController open-sdiebar-controller hidden md:inline-block xl:hidden">
                    <iconify-icon
                      className="leading-none bg-transparent relative text-xl top-[2px] text-slate-900 dark:text-white"
                      icon="heroicons-outline:menu-alt-3"
                    ></iconify-icon>
                  </button>
                  <button
                    className="items-center xl:text-sm text-lg xl:text-slate-400 text-slate-800 dark:text-slate-300 focus:outline-none focus:shadow-none px-1 space-x-3
        rtl:space-x-reverse search-modal inline-flex xl:hidden"
                    data-bs-toggle="modal"
                    data-bs-target="#searchModal"
                  >
                    <SearchIcon />
                    <span className="xl:inline-block hidden">Search...</span>
                  </button>
                </div>
                {/* <!-- end horizental --> */}

                <div className="main-menu">
                  <ul>
                    <li
                      className="
             menu-item-has-children 
              "
                    >
                      {/* <!--  Single menu --> */}

                      {/* <!-- has dropdown --> */}

                      <a href="javascript:void()">
                        <div className="flex flex-1 items-center space-x-[6px] rtl:space-x-reverse">
                          <span className="icon-box">
                            <iconify-icon icon="heroicons-outline:home">
                              {" "}
                            </iconify-icon>
                          </span>
                          <div className="text-box">Dashboard</div>
                        </div>
                        <div className="flex-none text-sm ltr:ml-3 rtl:mr-3 leading-[1] relative top-1">
                          <iconify-icon icon="heroicons-outline:chevron-down">
                            {" "}
                          </iconify-icon>
                        </div>
                      </a>

                      {/* <!-- Dropdown menu --> */}

                      <ul className="sub-menu">
                        <li>
                          <a href="#">
                            <div className="flex space-x-2 items-start rtl:space-x-reverse">
                              <iconify-icon
                                icon="heroicons:presentation-chart-line"
                                className="leading-[1] text-base"
                              >
                                {" "}
                              </iconify-icon>
                              <span className="leading-[1]">
                                Analytics Dashboard
                              </span>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <div className="flex space-x-2 items-start rtl:space-x-reverse">
                              <iconify-icon
                                icon="heroicons:shopping-cart"
                                className="leading-[1] text-base"
                              >
                                {" "}
                              </iconify-icon>
                              <span className="leading-[1]">
                                Ecommerce Dashboard
                              </span>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <div className="flex space-x-2 items-start rtl:space-x-reverse">
                              <iconify-icon
                                icon="heroicons:briefcase"
                                className="leading-[1] text-base"
                              >
                                {" "}
                              </iconify-icon>
                              <span className="leading-[1]">
                                Project Dashboard
                              </span>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <div className="flex space-x-2 items-start rtl:space-x-reverse">
                              <iconify-icon
                                icon="ri:customer-service-2-fill"
                                className="leading-[1] text-base"
                              >
                                {" "}
                              </iconify-icon>
                              <span className="leading-[1]">CRM Dashboard</span>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <div className="flex space-x-2 items-start rtl:space-x-reverse">
                              <iconify-icon
                                icon="heroicons:wrench-screwdriver"
                                className="leading-[1] text-base"
                              >
                                {" "}
                              </iconify-icon>
                              <span className="leading-[1]">
                                Banking Dashboard
                              </span>
                            </div>
                          </a>
                        </li>
                      </ul>

                      {/* <!-- Megamenu --> */}
                    </li>

                    <li
                      className="
             menu-item-has-children 
              "
                    >
                      {/* <!--  Single menu --> */}

                      {/* <!-- has dropdown --> */}

                      <a href="javascript:void()">
                        <div className="flex flex-1 items-center space-x-[6px] rtl:space-x-reverse">
                          <span className="icon-box">
                            <iconify-icon icon="heroicons-outline:chip">
                              {" "}
                            </iconify-icon>
                          </span>
                          <div className="text-box">App</div>
                        </div>
                        <div className="flex-none text-sm ltr:ml-3 rtl:mr-3 leading-[1] relative top-1">
                          <iconify-icon icon="heroicons-outline:chevron-down">
                            {" "}
                          </iconify-icon>
                        </div>
                      </a>

                      {/* <!-- Dropdown menu --> */}

                      <ul className="sub-menu">
                        <li>
                          <a href="#">
                            <div className="flex space-x-2 items-start rtl:space-x-reverse">
                              <iconify-icon
                                icon="heroicons-outline:chat"
                                className="leading-[1] text-base"
                              >
                                {" "}
                              </iconify-icon>
                              <span className="leading-[1]">Chat</span>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <div className="flex space-x-2 items-start rtl:space-x-reverse">
                              <iconify-icon
                                icon="heroicons-outline:mail"
                                className="leading-[1] text-base"
                              >
                                {" "}
                              </iconify-icon>
                              <span className="leading-[1]">Email</span>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <div className="flex space-x-2 items-start rtl:space-x-reverse">
                              <iconify-icon
                                icon="heroicons-outline:calendar"
                                className="leading-[1] text-base"
                              >
                                {" "}
                              </iconify-icon>
                              <span className="leading-[1]">Calendar</span>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <div className="flex space-x-2 items-start rtl:space-x-reverse">
                              <iconify-icon
                                icon="heroicons-outline:view-boards"
                                className="leading-[1] text-base"
                              >
                                {" "}
                              </iconify-icon>
                              <span className="leading-[1]">Kanban</span>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <div className="flex space-x-2 items-start rtl:space-x-reverse">
                              <iconify-icon
                                icon="heroicons-outline:clipboard-check"
                                className="leading-[1] text-base"
                              >
                                {" "}
                              </iconify-icon>
                              <span className="leading-[1]">Todo</span>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <div className="flex space-x-2 items-start rtl:space-x-reverse">
                              <iconify-icon
                                icon="heroicons-outline:document"
                                className="leading-[1] text-base"
                              >
                                {" "}
                              </iconify-icon>
                              <span className="leading-[1]">Projects</span>
                            </div>
                          </a>
                        </li>
                      </ul>

                      {/* <!-- Megamenu --> */}
                    </li>

                    <li
                      className="
              menu-item-has-children has-megamenu
            "
                    >
                      {/* <!--  Single menu --> */}

                      {/* <!-- has dropdown --> */}

                      <a href="javascript:void()">
                        <div className="flex flex-1 items-center space-x-[6px] rtl:space-x-reverse">
                          <span className="icon-box">
                            <iconify-icon icon="heroicons-outline:view-boards">
                              {" "}
                            </iconify-icon>
                          </span>
                          <div className="text-box">Pages</div>
                        </div>
                        <div className="flex-none text-sm ltr:ml-3 rtl:mr-3 leading-[1] relative top-1">
                          <iconify-icon icon="heroicons-outline:chevron-down">
                            {" "}
                          </iconify-icon>
                        </div>
                      </a>

                      {/* <!-- Dropdown menu --> */}

                      {/* <!-- Megamenu --> */}

                      <div className="rt-mega-menu">
                        <div className="flex flex-wrap space-x-8 justify-between rtl:space-x-reverse">
                          <div>
                            {/* <!-- mega menu title --> */}
                            <div className="text-sm font-medium text-slate-900 dark:text-white mb-2 flex space-x-1 items-center">
                              <span> Authentication</span>
                            </div>
                            {/* <!-- single menu item* --> */}

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Signin One
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Signin Two
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Signin Three
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Signup One
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Signup Two
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Signup Three
                                </span>
                              </div>
                            </a>
                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Forget Password One
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Forget Password Two
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Forget Password Three
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Lock Screen One
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Lock Screen Two
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Lock Screen Three
                                </span>
                              </div>
                            </a>
                          </div>

                          <div>
                            {/* <!-- mega menu title --> */}
                            <div className="text-sm font-medium text-slate-900 dark:text-white mb-2 flex space-x-1 items-center">
                              <span> Components</span>
                            </div>
                            {/* <!-- single menu item* --> */}

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  typography
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  colors
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  alert
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  button
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  card
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  carousel
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  dropdown
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  image
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  modal
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Progress bar
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Placeholder
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Tab &amp; Accordion
                                </span>
                              </div>
                            </a>
                          </div>

                          <div>
                            {/* <!-- mega menu title --> */}
                            <div className="text-sm font-medium text-slate-900 dark:text-white mb-2 flex space-x-1 items-center">
                              <span> Forms</span>
                            </div>
                            {/* <!-- single menu item* --> */}

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Input
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Input group
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Input layout
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Form validation
                                </span>
                              </div>
                            </a>

                            <a href="#">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Wizard
                                </span>
                              </div>
                            </a>

                            <a href="input-mask.html">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Input mask
                                </span>
                              </div>
                            </a>

                            <a href="file-input-2.html">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  File input
                                </span>
                              </div>
                            </a>

                            <a href="form-repeater.html">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Form repeater
                                </span>
                              </div>
                            </a>

                            <a href="textarea.html">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Textarea
                                </span>
                              </div>
                            </a>

                            <a href="checkbox.html">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Checkbox
                                </span>
                              </div>
                            </a>

                            <a href="radio-button.html">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Radio button
                                </span>
                              </div>
                            </a>

                            <a href="switch.html">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Switch
                                </span>
                              </div>
                            </a>
                          </div>

                          <div>
                            {/* <!-- mega menu title --> */}
                            <div className="text-sm font-medium text-slate-900 dark:text-white mb-2 flex space-x-1 items-center">
                              <span> Utility</span>
                            </div>
                            {/* <!-- single menu item* --> */}

                            <a href="invoice.html">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Invoice
                                </span>
                              </div>
                            </a>

                            <a href="pricing.html">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Pricing
                                </span>
                              </div>
                            </a>

                            <a href="faq.html">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  FAQ
                                </span>
                              </div>
                            </a>

                            <a href="blank-page.html">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Blank page
                                </span>
                              </div>
                            </a>

                            <a href="blog.html">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Blog
                                </span>
                              </div>
                            </a>

                            <a href="404.html">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  404 page
                                </span>
                              </div>
                            </a>

                            <a href="comming-soon.html">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Coming Soon
                                </span>
                              </div>
                            </a>

                            <a href="under-maintanance.html">
                              <div className="flex items-center space-x-2 text-[15px] leading-6 rtl:space-x-reverse">
                                <span className="h-[6px] w-[6px] rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
                                <span className="capitalize text-slate-600 dark:text-slate-300">
                                  Under Maintanance page
                                </span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li
                      className="
             menu-item-has-children 
              "
                    >
                      {/* <!--  Single menu --> */}

                      {/* <!-- has dropdown --> */}

                      <a href="javascript:void()">
                        <div className="flex flex-1 items-center space-x-[6px] rtl:space-x-reverse">
                          <span className="icon-box">
                            <iconify-icon icon="heroicons-outline:view-grid-add">
                              {" "}
                            </iconify-icon>
                          </span>
                          <div className="text-box">Widgets</div>
                        </div>
                        <div className="flex-none text-sm ltr:ml-3 rtl:mr-3 leading-[1] relative top-1">
                          <iconify-icon icon="heroicons-outline:chevron-down">
                            {" "}
                          </iconify-icon>
                        </div>
                      </a>

                      {/* <!-- Dropdown menu --> */}

                      <ul className="sub-menu">
                        <li>
                          <a href="basic-widgets.html">
                            <div className="flex space-x-2 items-start rtl:space-x-reverse">
                              <iconify-icon
                                icon="heroicons-outline:document-text"
                                className="leading-[1] text-base"
                              >
                                {" "}
                              </iconify-icon>
                              <span className="leading-[1]">Basic</span>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="statistics-widgets.html">
                            <div className="flex space-x-2 items-start rtl:space-x-reverse">
                              <iconify-icon
                                icon="heroicons-outline:document-text"
                                className="leading-[1] text-base"
                              >
                                {" "}
                              </iconify-icon>
                              <span className="leading-[1]">Statistic</span>
                            </div>
                          </a>
                        </li>
                      </ul>

                      {/* <!-- Megamenu --> */}
                    </li>

                    <li
                      className="
             menu-item-has-children 
              "
                    >
                      {/* <!--  Single menu --> */}

                      {/* <!-- has dropdown --> */}

                      <a href="javascript:void()">
                        <div className="flex flex-1 items-center space-x-[6px] rtl:space-x-reverse">
                          <span className="icon-box">
                            <iconify-icon icon="heroicons-outline:template">
                              {" "}
                            </iconify-icon>
                          </span>
                          <div className="text-box">Extra</div>
                        </div>
                        <div className="flex-none text-sm ltr:ml-3 rtl:mr-3 leading-[1] relative top-1">
                          <iconify-icon icon="heroicons-outline:chevron-down">
                            {" "}
                          </iconify-icon>
                        </div>
                      </a>

                      {/* <!-- Dropdown menu --> */}

                      <ul className="sub-menu">
                        <li>
                          <a href="basic-table.html">
                            <div className="flex space-x-2 items-start rtl:space-x-reverse">
                              <iconify-icon
                                icon="heroicons-outline:table"
                                className="leading-[1] text-base"
                              >
                                {" "}
                              </iconify-icon>
                              <span className="leading-[1]">Basic Table</span>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="advance-table.html">
                            <div className="flex space-x-2 items-start rtl:space-x-reverse">
                              <iconify-icon
                                icon="heroicons-outline:table"
                                className="leading-[1] text-base"
                              >
                                {" "}
                              </iconify-icon>
                              <span className="leading-[1]">
                                Advanced table
                              </span>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="apex-chart.html">
                            <div className="flex space-x-2 items-start rtl:space-x-reverse">
                              <iconify-icon
                                icon="heroicons-outline:chart-bar"
                                className="leading-[1] text-base"
                              >
                                {" "}
                              </iconify-icon>
                              <span className="leading-[1]">Apex chart</span>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <div className="flex space-x-2 items-start rtl:space-x-reverse">
                              <iconify-icon
                                icon="heroicons-outline:chart-bar"
                                className="leading-[1] text-base"
                              >
                                {" "}
                              </iconify-icon>
                              <span className="leading-[1]">Chart js</span>
                            </div>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <div className="flex space-x-2 items-start rtl:space-x-reverse">
                              <iconify-icon
                                icon="heroicons-outline:map"
                                className="leading-[1] text-base"
                              >
                                {" "}
                              </iconify-icon>
                              <span className="leading-[1]">Map</span>
                            </div>
                          </a>
                        </li>
                      </ul>

                      {/* <!-- Megamenu --> */}
                    </li>
                  </ul>
                </div>
                {/* <!-- end top menu --> */}
                <div className="nav-tools flex items-center lg:space-x-5 space-x-3 rtl:space-x-reverse leading-0">
                  {/* <!-- BEGIN: Notification Dropdown --> */}
                  {/* <!-- Notifications Dropdown area --> */}
                  <div className="relative md:block hidden">
                    <button
                      className="lg:h-[32px] lg:w-[32px] lg:bg-slate-50 lg:dark:bg-slate-900 dark:text-white text-slate-900 cursor-pointer
      rounded-full text-[20px] flex flex-col items-center justify-center"
                      //   type="button"
                      //   data-bs-toggle="dropdown"
                      //   aria-expanded="false"
                    >
                      {/* <iconify-icon
                        className="animate-tada text-slate-800 dark:text-white text-xl"
                        icon="heroicons-outline:bell"
                      ></iconify-icon> */}
                      <NotificationsIcon />
                      <span
                        className="absolute -right-1 lg:top-0 -top-[6px] h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center
        justify-center rounded-full text-white z-[99]"
                      >
                        4
                      </span>
                    </button>
                    {/* <!-- Notifications Dropdown --> */}
                    <div
                      className="dropdown-menu z-10 hidden bg-white divide-y divide-slate-100 dark:divide-slate-900 shadow w-[335px]
      dark:bg-slate-800 border dark:border-slate-900 !top-[23px] rounded-md overflow-hidden lrt:origin-top-right rtl:origin-top-left"
                    >
                      <div className="flex items-center justify-between py-4 px-4">
                        <h3 className="text-sm font-Inter font-medium text-slate-700 dark:text-white">
                          Notifications
                        </h3>
                        <a
                          className="text-xs font-Inter font-normal underline text-slate-500 dark:text-white"
                          href="#"
                        >
                          See All
                        </a>
                      </div>
                      <div
                        className="divide-y divide-slate-100 dark:divide-slate-900"
                        role="none"
                      >
                        <div className="bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-800 block w-full px-4 py-2 text-sm relative">
                          <div className="flex ltr:text-left rtl:text-right">
                            <div className="flex-none ltr:mr-3 rtl:ml-3">
                              <div className="h-8 w-8 bg-white rounded-full">
                                <img
                                  src={user}
                                  alt="user"
                                  className="border-white block w-full h-full object-cover rounded-full border"
                                />
                              </div>
                            </div>
                            <div className="flex-1">
                              <a
                                href="#"
                                className="text-slate-600 dark:text-slate-300 text-sm font-medium mb-1 before:w-full before:h-full before:absolute
                before:top-0 before:left-0"
                              >
                                Your order is placed
                              </a>
                              <div className="text-slate-500 dark:text-slate-200 text-xs leading-4">
                                Amet minim mollit non deser unt ullamco est sit
                                aliqua.
                              </div>
                              <div className="text-slate-400 dark:text-slate-400 text-xs mt-1">
                                3 min ago
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-slate-600 dark:text-slate-300 block w-full px-4 py-2 text-sm">
                          <div className="flex ltr:text-left rtl:text-right relative">
                            <div className="flex-none ltr:mr-3 rtl:ml-3">
                              <div className="h-8 w-8 bg-white rounded-full">
                                <img
                                  src={user}
                                  alt="user"
                                  className="border-transparent block w-full h-full object-cover rounded-full border"
                                />
                              </div>
                            </div>
                            <div className="flex-1">
                              <a
                                href="#"
                                className="text-slate-600 dark:text-slate-300 text-sm font-medium mb-1 before:w-full before:h-full before:absolute
                before:top-0 before:left-0"
                              >
                                Congratulations Darlene 🎉
                              </a>
                              <div className="text-slate-600 dark:text-slate-300 text-xs leading-4">
                                Won the monthly best seller badge
                              </div>
                              3 min ago
                            </div>
                          </div>
                          <div className="flex-0">
                            <span className="h-[10px] w-[10px] bg-danger-500 border border-white dark:border-slate-400 rounded-full inline-block"></span>
                          </div>
                        </div>
                      </div>
                      <div className="text-slate-600 dark:text-slate-300 block w-full px-4 py-2 text-sm">
                        <div className="flex ltr:text-left rtl:text-right relative">
                          <div className="flex-none ltr:mr-3 rtl:ml-3">
                            <div className="h-8 w-8 bg-white rounded-full">
                              <img
                                src={user}
                                alt="user"
                                className="border-transparent block w-full h-full object-cover rounded-full border"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <a
                              href="#"
                              className="text-slate-600 dark:text-slate-300 text-sm font-medium mb-1 before:w-full before:h-full before:absolute
              before:top-0 before:left-0"
                            >
                              Revised Order 👋
                            </a>
                            <div className="text-slate-600 dark:text-slate-300 text-xs leading-4">
                              Won the monthly best seller badge
                            </div>
                            <div className="text-slate-400 dark:text-slate-400 text-xs mt-1">
                              3 min ago
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-slate-600 dark:text-slate-300 block w-full px-4 py-2 text-sm">
                        <div className="flex ltr:text-left rtl:text-right relative">
                          <div className="flex-none ltr:mr-3 rtl:ml-3">
                            <div className="h-8 w-8 bg-white rounded-full">
                              <img
                                src={user}
                                alt="user"
                                className="border-transparent block w-full h-full object-cover rounded-full border"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <a
                              href="#"
                              className="text-slate-600 dark:text-slate-300 text-sm font-medium mb-1 before:w-full before:h-full before:absolute
              before:top-0 before:left-0"
                            >
                              Brooklyn Simmons
                            </a>
                            <div className="text-slate-600 dark:text-slate-300 text-xs leading-4">
                              Added you to Top Secret Project group...
                            </div>
                            <div className="text-slate-400 dark:text-slate-400 text-xs mt-1">
                              3 min ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- END: Notification Dropdown --> */}

                  {/* <!-- BEGIN: Profile Dropdown --> */}
                  {/* <!-- Profile DropDown Area --> */}
                  <div className="md:block hidden w-full">
                    <button
                      className="text-slate-800 dark:text-white focus:ring-0 focus:outline-none font-medium rounded-lg text-sm text-center
      inline-flex items-center"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div
                        className="lg:h-8 lg:w-8 h-7 w-7 rounded-full flex-1 ltr:mr-[10px] rtl:ml-[10px]"
                        style={{ marginRight: 10 }}
                      >
                        <img
                          src={user}
                          alt="user"
                          className="block w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <span className="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap">
                        Ram Gupta
                      </span>
                      {/*   <svg
                        className="w-[16px] h-[16px] dark:text-white hidden lg:inline-block text-base inline-block ml-[10px] rtl:mr-[10px]"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewbox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                       <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        ></path> 
  
                      </svg> */}

                      <KeyboardArrowDownIcon onClick={toggleDropdown} />
                    </button>
                    {/* <!-- Dropdown menu --> */}
                    {isDropdownOpen && (
                      <div
                        className="dropdown-menu z-10  bg-white divide-y divide-slate-100 shadow w-44 dark:bg-slate-800 border dark:border-slate-700 top-[23px] rounded-md
      overflow-hidden absolute
      "
                      >
                        <ul className="py-1 text-sm text-slate-800 dark:text-slate-200">
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:text-white font-inter text-sm text-slate-600
            dark:text-white font-normal"
                            >
                              {/* <iconify-icon
                              icon="heroicons-outline:login"
                              className="relative top-[2px] text-lg ltr:mr-1 rtl:ml-1"
                            ></iconify-icon> */}
                              <LogoutIcon style={{ fontSize: "medium" }} />{" "}
                              &nbsp;
                              <span className="font-Inter">Logout</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  {/* <!-- END: Header --> */}
                  <button className="smallDeviceMenuController md:hidden block leading-0">
                    <iconify-icon
                      className="cursor-pointer text-slate-900 dark:text-white text-2xl"
                      icon="heroicons-outline:menu-alt-3"
                    ></iconify-icon>
                  </button>
                  {/* <!-- end mobile menu --> */}
                </div>
                {/* <!-- end nav tools --> */}
              </div>
            </div>
          </div>

          {/* <!-- BEGIN: Search Modal --> */}
          <div
            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto inset-0 bg-slate-900/40 backdrop-filter backdrop-blur-sm backdrop-brightness-10"
            id="searchModal"
            tabindex="-1"
            aria-labelledby="searchModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog relative w-auto pointer-events-none top-1/4">
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white dark:bg-slate-900 bg-clip-padding rounded-md outline-none text-current">
                <form>
                  <div className="relative">
                    <button className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-full text-xl dark:text-slate-300 flex items-center justify-center">
                      <SearchIcon />
                    </button>
                    <input
                      type="text"
                      className="form-control !py-[14px] !pl-10"
                      placeholder="Search"
                      autofocus
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* <!-- END: Search Modal --> */}
          {/* <!-- END: Header --> */}
          {/* <!-- END: Header --> */}

          <div
            class="content-wrapper transition-all duration-150 xl:ltr:ml-[248px]"
            id="content_wrapper"
            style={{ backgroundColor: "#F1F5F9" }}
          >
            <div class="page-content">
              <div id="content_layout">
                <div className="space-y-5 profile-page">
                  <div
                    className="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0
                space-y-6 justify-between items-end relative z-[1]"
                  >
                    <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg">
                      <img
                        src={qrCode}
                        alt="qrCode-image"
                        style={{
                          width: "100px",
                          height: "100px",
                          marginTop: "30px",
                          marginLeft: "925px",
                        }}
                      />
                    </div>
                    <div className="profile-box flex-none md:text-start text-center">
                      <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
                        <div className="flex-none">
                          <div
                            className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4
                                ring-slate-100 relative"
                          >
                            <img
                              src={user}
                              alt=""
                              className="w-full h-full object-cover rounded-full"
                            />
                            <a
                              href="profile-setting.html"
                              className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center
                                    justify-center md:top-[140px] top-[100px]"
                            >
                              {/* <iconify-icon icon="heroicons:pencil-square"></iconify-icon> */}
                              <CreateRoundedIcon />
                            </a>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                            Ram Gupta
                          </div>
                          <div className="text-sm font-light text-slate-600 dark:text-slate-400">
                            Front End Developer
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end profile box --> */}
                    <div className="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
                      <div className="flex-1 ">
                        <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1 ">
                          Current Course
                        </div>
                        <div className="text-sm text-slate-600 font-light dark:text-slate-300 ">
                          B.tech
                        </div>
                      </div>
                      {/* <!-- end single --> */}
                      <div className="flex-1">
                        <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                          UID
                        </div>
                        <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                          12345678
                        </div>
                      </div>
                    </div>
                    {/* <img src={qrCode} alt="qrCode-image" style={{width:'100px' ,height:'100px',marginTop:'auto'}} /> */}
                    {/* <!-- profile info-500 --> */}
                  </div>
                  <div
                    class="content-wrapper transition-all duration-150 xl:ltr:ml-[248px]"
                    id="content_wrapper"
                    style={{ backgroundColor: "#F1F5F9" }}
                  >
                    <div class="page-content">
                      <div id="content_layout">
                        <div>
                          <>
                            <Box
                              sx={{ borderBottom: 1, borderColor: "divider" }}
                            >
                              <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"
                                aria-label="scrollable auto tabs example"
                                sx={{
                                  "& .MuiTabs-indicator": {
                                    bgcolor:
                                      value === 0
                                        ? "#EC6E46"
                                        : value === 1
                                        ? "#EC6E46"
                                        : value === 2
                                        ? "#EC6E46"
                                        : "#000",
                                  },
                                }}
                              >
                                <Tab
                                  label="Info"
                                  style={{
                                    color: value === 0 ? "#EC6E46" : "#000",
                                  }}
                                />
                                <Tab
                                  label="Account Info"
                                  style={{
                                    color: value === 1 ? "#EC6E46" : "#000",
                                  }}
                                />
                                <Tab
                                  label="Course Details"
                                  style={{
                                    color: value === 2 ? "#EC6E46" : "#000",
                                  }}
                                />
                              </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                              {/* <All /> */}
                            </TabPanel>
                            <TabPanel value={value} index={1} className="custom-tab-panel">
                              <AccountInfo />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                              {/* <Today /> */}
                            </TabPanel>
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="grid grid-cols-12 gap-6">
                    <div className="lg:col-span-4 col-span-12">
                      <div className="card h-full">
                        <header className="card-header">
                          <h4 className="card-title">Info</h4>
                        </header>
                        <div className="card-body p-6">
                          <ul className="list space-y-8">
                            <li className="flex space-x-3 rtl:space-x-reverse">
                              <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                                <iconify-icon icon="heroicons:envelope"></iconify-icon>
                              </div>
                              <div className="flex-1">
                                <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                                  EMAIL
                                </div>
                                <a
                                  href="mailto:someone@example.com"
                                  className="text-base text-slate-600 dark:text-slate-50"
                                >
                                  info-example@email.com
                                </a>
                              </div>
                            </li>
                            <li className="flex space-x-3 rtl:space-x-reverse">
                              <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                                <iconify-icon icon="heroicons:phone-arrow-up-right"></iconify-icon>
                              </div>
                              <div className="flex-1">
                                <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                                  PHONE
                                </div>
                                <a
                                  href="#"
                                  className="text-base text-slate-600 dark:text-slate-50"
                                >
                                  +919540478632
                                </a>
                              </div>
                            </li>
                            <li className="flex space-x-3 rtl:space-x-reverse">
                              <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                                <iconify-icon icon="heroicons:map"></iconify-icon>
                              </div>
                              <div className="flex-1">
                                <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                                  LOCATION
                                </div>
                                <div className="text-base text-slate-600 dark:text-slate-50">
                                  #K-60, GF, RHS, JUNGPURA EXT.,
                                  <br />
                                  NEW DELHI - 110014
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                 
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
