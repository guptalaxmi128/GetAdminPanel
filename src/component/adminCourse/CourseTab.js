import React, { useState} from "react";
import PropTypes from "prop-types";
import { Search, Menu } from "react-feather";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import logo from "../../assets/images/logo.png";
import AdminNotification from "../adminNotification/AdminNotification";
import AddCourse from "./addCourse/AddCourse";
import GetCourse from "./GetCourse/GetCourse";

const CourseTab = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
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

  return (
    <>
      <div className="sidebar-wrapper group w-0  xl:w-[248px] xl:block hidden md:hidden sm:hidden">
        <Sidebar />
      </div>
      <div
        className="flex flex-col justify-between min-h-screen"
        // style={{ marginLeft: "248px" }}
      >
        <div>
          {/* <!-- BEGIN: Header --> */}
          {/* <!-- BEGIN: Header --> */}
          <div className="z-[9]" id="app_header">
            <div className="app-header z-[999] bg-white dark:bg-slate-800 shadow-sm dark:shadow-slate-700  ml-0 ml-248px">
              <div className="flex justify-between items-center h-full">
                <div className="flex items-center md:space-x-4 space-x-4 rtl:space-x-reverse vertical-box">
                  <a href="#" className="mobile-logo xl:hidden inline-block">
                    <img
                      src={logo}
                      className="white_logo"
                      alt="logo"
                      width={50}
                      height={30}
                    />
                  </a>
                  <button className="smallDeviceMenuController open-sdiebar-controller hidden xl:hidden md:inline-block">
                    <Menu onClick={toggleSidebar} />
                    {isSidebarVisible && <Sidebar toggle={toggleSidebar} />}
                  </button>
                  <button className="sidebarOpenButton text-xl text-slate-900 dark:text-white !ml-0 rtl:rotate-180 md:hidden">
                    <Menu onClick={toggleSidebar} />
                    {isSidebarVisible && <Sidebar toggle={toggleSidebar} />}
                  </button>
                  <button
                    className="flex items-center xl:text-sm text-lg xl:text-slate-400 text-slate-800 dark:text-slate-300 focus:outline-none focus:shadow-none px-1 space-x-3
        rtl:space-x-reverse search-modal"
                    data-bs-toggle="modal"
                    data-bs-target="#searchModal"
                  >
                    <Search />
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
                    <Search />
                    <span className="xl:inline-block hidden">Search...</span>
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
            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto inset-0 bg-slate-900/40 backdrop-filter backdrop-blur-sm backdrop-brightness-10"
            id="searchModal"
            tabIndex="-1"
            aria-labelledby="searchModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog relative w-auto pointer-events-none top-1/4">
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white dark:bg-slate-900 bg-clip-padding rounded-md outline-none text-current">
                <form>
                  <div className="relative">
                    <button className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-full text-xl dark:text-slate-300 flex items-center justify-center">
                      <Search />
                    </button>
                    <input
                      type="text"
                      className="form-control !py-[14px] !pl-10"
                      placeholder="Search"
                      autoFocus
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
            className="content-wrapper transition-all duration-150 xl:ltr:ml-[248px] ml-0 ml-248px"
            id="content_wrapper"
            style={{ backgroundColor: "#F1F5F9" }}
          >
            <div className="page-content">
              <div id="content_layout">
                <div className="card xl:col-span-2 mt-5">
                  <div className="card-body flex flex-col p-6">
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
                                   
                                    : "#000",
                              },
                            }}
                          >
                            <Tab
                              label="Add Course"
                              style={{
                                color: value === 0 ? "#EC6E46" : "#000",
                              }}
                            />
                            <Tab
                              label="Courses"
                              style={{
                                color: value === 1 ? "#EC6E46" : "#000",
                              }}
                            />
                          
                          </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <AddCourse />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                          <GetCourse />
                        </TabPanel>
                     
                      </>
                    </div>
                  </div>
                </div>
                {/* Form End */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseTab;
