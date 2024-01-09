import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Menu } from "react-feather";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import Sidebar from "../../sidebar/Sidebar";
import user from "../../../assets/images/user/user-1.jpg";
import logo from "../../../assets/images/logo.png";
import AdminNotification from "../../adminNotification/AdminNotification";
import Profile from "./Profile";
import RaisedFundRequest from "./RaisedFundRequest";
import RejectedRequest from "./RejectedRequest";
import DonatedRequest from "./DonatedRequest";
import { useGetDonarQuery } from "../../../services/SignUpApi";

const DonarProfile = () => {
  const { ID } = useParams();
  // console.log(ID);

  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const localHost = "http://localhost:5000";
  const localHost = "https://global-education-t.onrender.com";

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const { data, isSuccess } = useGetDonarQuery(ID);
  console.log(data);

  useEffect(() => {
    if (data && isSuccess && data.data) {
      setName(data.data.name);
      setAddress(data.data.address);
      setMobileNumber(data.data.mobileNumber);
      setEmail(data.data.email);
      setProfileImage(data.data.donarProfileImage?.profileImage_FileName);
    }
  }, [data, isSuccess]);

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
      <div className="flex flex-col justify-between min-h-screen">
        <div>
          {/* <!-- BEGIN: Header --> */}
          {/* <!-- BEGIN: Header --> */}
          <div className="z-[9]" id="app_header">
            <div className="app-header z-[999] bg-white dark:bg-slate-800 shadow-sm dark:shadow-slate-700 ml-0 ml-248px">
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
                </div>
                {/* <!-- end vertcial --> */}
                <AdminNotification />
              </div>
            </div>
          </div>

          {/* <!-- BEGIN: Search Modal --> */}

          {/* <!-- END: Search Modal --> */}
          {/* <!-- END: Header --> */}
          {/* <!-- END: Header --> */}
          <div
            className="content-wrapper transition-all duration-150 xl:ltr:ml-[248px] ml-0 ml-248px "
            id="content_wrapper"
            style={{ backgroundColor: "#F1F5F9" }}
          >
            <div className="page-content">
              <div id="content_layout">
                <div className="space-y-5 profile-page">
                  <div
                    className="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0
                space-y-6 justify-between items-end relative z-[1]"
                  >
                    <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg "></div>
                    <div className="profile-box flex-none md:text-start text-center">
                      <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
                        <div className="flex-none">
                          <div
                            className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4
                                ring-slate-100 relative"
                          >
                            <img
                              src={`${localHost}/donarProfile/${profileImage}`}
                              // src={user}
                              alt=""
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-4">
                            {name}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end profile box --> */}
                    <div className="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
                      <div className="flex-1 ">
                        <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1 mt-3 ">
                          Email
                        </div>
                        <div className="text-sm text-slate-600 font-light dark:text-slate-300 ">
                          {email}
                        </div>
                      </div>
                      {/* <!-- end single --> */}
                      <div className="flex-1">
                        <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1 mt-3">
                          Phone
                        </div>
                        <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                          +91 {mobileNumber}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1 mt-3">
                          Location
                        </div>
                        <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                          {address}
                        </div>
                      </div>
                    </div>

                    {/* <!-- profile info-500 --> */}
                  </div>
                  <div
                    className="content-wrapper transition-all duration-150 xl:ltr:ml-[248px] "
                    id="content_wrapper"
                    style={{ backgroundColor: "#F1F5F9" }}
                  >
                    <div className="page-content">
                      <div id="content_layout">
                        <div className="card xl:col-span-2 mt-5">
                          <div className="card-body flex flex-col p-6">
                            <div>
                              <>
                                <Box
                                  sx={{
                                    borderBottom: 1,
                                    borderColor: "divider",
                                  }}
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
                                            : value === 3
                                            ? "#EC6E46"
                                            : "#000",
                                      },
                                    }}
                                  >
                                    <Tab
                                      label="Profile"
                                      style={{
                                        color: value === 0 ? "#EC6E46" : "#000",
                                      }}
                                    />
                                    <Tab
                                      label="Raised Fund Request"
                                      style={{
                                        color: value === 1 ? "#EC6E46" : "#000",
                                      }}
                                    />
                                    <Tab
                                      label="Rejected Request"
                                      style={{
                                        color: value === 2 ? "#EC6E46" : "#000",
                                      }}
                                    />

                                    <Tab
                                      label="Donated"
                                      style={{
                                        color: value === 3 ? "#EC6E46" : "#000",
                                      }}
                                    />
                                  </Tabs>
                                </Box>
                                <TabPanel value={value} index={0}>
                                  <Profile ID={ID} />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                  <RaisedFundRequest ID={ID} />
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                  <RejectedRequest ID={ID} />
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                  <DonatedRequest ID={ID} />
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonarProfile;
