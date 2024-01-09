import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import logo from "../../assets/images/logo.png";
import Sidebar from "../sidebar/Sidebar";
import Pending from "./pending/Pending";
import Approved from "./approved/Approved";
import Decline from "./decline/Decline";
import AdminNotification from "../adminNotification/AdminNotification";

const RaiseFundRequest = () => {
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

  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="sidebar-wrapper group w-0  xl:w-[248px] xl:block hidden md:hidden sm:hidden">
        <Sidebar />
      </div>
      <div class="flex flex-col justify-between min-h-screen">
        <div>
          {/* <!-- BEGIN: Header --> */}
          {/* <!-- BEGIN: Header --> */}
          <div class="z-[9]" id="app_header">
            <div class="app-header z-[999] bg-white dark:bg-slate-800 shadow-sm dark:shadow-slate-700 ml-0 ml-248px">
              <div class="flex justify-between items-center h-full">
                <div className="flex items-center md:space-x-4 space-x-4 rtl:space-x-reverse vertical-box">
                  <a href="#" className="mobile-logo xl:hidden inline-block">
                    <img
                      src={logo}
                      className="black_logo"
                      alt="logo"
                      width={50}
                      height={30}
                    />
                  </a>
                  <button className="smallDeviceMenuController open-sdiebar-controller hidden xl:hidden md:inline-block">
                    <MenuIcon onClick={toggleSidebar} />
                    {isSidebarVisible && <Sidebar toggle={toggleSidebar} />}
                  </button>
                  <button className="sidebarOpenButton text-xl text-slate-900 dark:text-white !ml-0 rtl:rotate-180 md:hidden">
                    <MenuIcon onClick={toggleSidebar} />
                    {isSidebarVisible && <Sidebar toggle={toggleSidebar} />}
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
                <div class="items-center space-x-4 rtl:space-x-reverse horizental-box">
                  <a href="index.html" class="leading-0">
                    <span class="xl:inline-block hidden">
                      <img
                        src="assets/images/logo/logo.svg"
                        class="black_logo "
                        alt="logo"
                      />
                      <img
                        src="assets/images/logo/logo-white.svg"
                        class="white_logo"
                        alt="logo"
                      />
                    </span>
                    <span class="xl:hidden inline-block">
                      <img
                        src="assets/images/logo/logo-c.svg"
                        class="black_logo "
                        alt="logo"
                      />
                      <img
                        src="assets/images/logo/logo-c-white.svg"
                        class="white_logo "
                        alt="logo"
                      />
                    </span>
                  </a>
                  <button class="smallDeviceMenuController open-sdiebar-controller hidden md:inline-block xl:hidden">
                    <iconify-icon
                      class="leading-none bg-transparent relative text-xl top-[2px] text-slate-900 dark:text-white"
                      icon="heroicons-outline:menu-alt-3"
                    ></iconify-icon>
                  </button>
                  <button
                    class="items-center xl:text-sm text-lg xl:text-slate-400 text-slate-800 dark:text-slate-300 focus:outline-none focus:shadow-none px-1 space-x-3
        rtl:space-x-reverse search-modal inline-flex xl:hidden"
                    data-bs-toggle="modal"
                    data-bs-target="#searchModal"
                  >
                    <SearchIcon />
                    <span class="xl:inline-block hidden">Search...</span>
                  </button>
                </div>
                {/* <!-- end horizental --> */}

                {/* <!-- end top menu --> */}
                <AdminNotification />
                {/* <!-- end nav tools --> */}
              </div>
            </div>
          </div>

          {/* <!-- BEGIN: Search Modal --> */}
          <div
            class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto inset-0 bg-slate-900/40 backdrop-filter backdrop-blur-sm backdrop-brightness-10"
            id="searchModal"
            tabindex="-1"
            aria-labelledby="searchModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog relative w-auto pointer-events-none top-1/4">
              <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white dark:bg-slate-900 bg-clip-padding rounded-md outline-none text-current">
                <form>
                  <div class="relative">
                    <button class="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-full text-xl dark:text-slate-300 flex items-center justify-center">
                      <SearchIcon />
                    </button>
                    <input
                      type="text"
                      class="form-control !py-[14px] !pl-10"
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
            class="content-wrapper transition-all duration-150 xl:ltr:ml-[248px] ml-0 ml-248px"
            id="content_wrapper"
            style={{ backgroundColor: "#F1F5F9" }}
          >
            <div class="page-content">
              <div id="content_layout">
                <div>
                  <>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
                          label="Pending"
                          style={{ color: value === 0 ? "#EC6E46" : "#000" }}
                        />
                        <Tab
                          label="Approved"
                          style={{ color: value === 1 ? "#EC6E46" : "#000" }}
                        />
                        <Tab
                          label="Decline"
                          style={{ color: value === 2 ? "#EC6E46" : "#000" }}
                        />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <Pending />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <Approved />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <Decline />
                    </TabPanel>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RaiseFundRequest;
