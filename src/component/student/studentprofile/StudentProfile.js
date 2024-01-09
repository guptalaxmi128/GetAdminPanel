import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Menu } from "react-feather";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import Sidebar from "../../sidebar/Sidebar";
import user from "../../../assets/images/user/user-1.jpg";
import logo from "../../../assets/images/logo.png";
import AdminNotification from "../../adminNotification/AdminNotification";
import {
  useGetQRCodeQuery,
  useGetStudentCourseByIdQuery,
  useGetStudentProfileByIdQuery,
} from "../../../services/SignUpApi";
import Qualification from "./Qualification";
import Account from "./Account";
import RaisedAmount from "./RaisedAmount";
import Profile from "./Profile";

const StudentProfile = () => {
  const { UID } = useParams();
  //   console.log(UID);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [qRCode, setQRCode] = useState("");
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const [studentName, setStudentName] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState("");
  const [currentCourse, setCurrentCourse] = useState("");

 

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

  const { data, isSuccess } = useGetStudentProfileByIdQuery(UID);

  useEffect(() => {
    if (data && isSuccess) {
      setStudentName(data.name);
      setAddress(data.currentAddress);
      setProfileImage(data.studentProfileImage?.profileImage_FileName);
    }
  }, [data, isSuccess]);

  const { data: courseData, isSuccess: courseIsSuccess } =
    useGetStudentCourseByIdQuery(UID);

  // console.log(data);

  const {data:QRCode,isSuccess:QRCodeIsSuccess}=useGetQRCodeQuery(UID);

  console.log(QRCode)

  useEffect(() => {
    if (QRCode && QRCodeIsSuccess && QRCode.data) {
     setQRCode(QRCode.data.qRCode)
   
    }
  }, [QRCode, QRCodeIsSuccess]);


  useEffect(() => {
    if (courseData && courseIsSuccess && courseData.data) {
      const onGoingStudent = courseData.data.find(
        (student) => student.onGoing === true
      );
      console.log(onGoingStudent);
      if (onGoingStudent) {
        setCurrentCourse(onGoingStudent.courseLevel);
      }
    }
  }, [courseData, courseIsSuccess]);

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
                    <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg flex justify-end">
                      <img
                        src={qRCode}
                        alt="qrCode-image"
                        className="bg-white"
                        style={{
                          margin: "30px",
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
                                src={`${localHost}/studentFile/${profileImage}`}
                              alt=""
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-4">
                            {studentName}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end profile box --> */}
                    <div className="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
                      <div className="flex-1 ">
                        <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1 mt-3 ">
                          Current Course
                        </div>
                        <div className="text-sm text-slate-600 font-light dark:text-slate-300 ">
                          {currentCourse}
                        </div>
                      </div>
                      {/* <!-- end single --> */}
                      <div className="flex-1">
                        <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1 mt-3">
                          StudentUID
                        </div>
                        <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                          {UID}
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
                                      label="Qualification"
                                      style={{
                                        color: value === 1 ? "#EC6E46" : "#000",
                                      }}
                                    />
                                    <Tab
                                      label="Raised Request"
                                      style={{
                                        color: value === 2 ? "#EC6E46" : "#000",
                                      }}
                                    />
                                    <Tab
                                      label="Account Details"
                                      style={{
                                        color: value === 3 ? "#EC6E46" : "#000",
                                      }}
                                    />
                                  </Tabs>
                                </Box>
                                <TabPanel value={value} index={0}>
                                  <Profile UID={UID} />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <Qualification UID={UID} />
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <RaisedAmount />
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    <Account UID={UID} />
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

export default StudentProfile;
