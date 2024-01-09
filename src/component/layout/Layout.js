import React, { useState, useEffect } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import user from "../../assets/images/user/user-1.jpg";
import logo from "../../assets/images/logo.png";
import Sidebar from "../sidebar/Sidebar";
import { Link } from "react-router-dom";
import {
  useGetAdminQuery,
  useGetAllDonarQuery,
  useGetAllStudentQuery,
  useGetDashboardRaiseFundQuery,
  useGetDashboardTodayDonarQuery,
  useGetDashboardTodayRaiseFundQuery,
  useGetDashboardTodayStudentQuery,
  useGetNotificationQuery,
} from "../../services/SignUpApi";
import AdminNotification from "../adminNotification/AdminNotification";

const Layout = () => {
  const [name, setName] = useState("");
  const [student, setStudent] = useState("");
  const [donar, setDonar] = useState("");
  const [raiseFund, setRaiseFund] = useState("");
  const [dashboardTodayStudent, setDashboardTodayStudent] = useState("");
  const [dashboardTodayDonar, setDashboardTodayDonar] = useState("");
  const [dashboardTodayFund, setDashboardTodayFund] = useState("");

  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const { data, isSuccess } = useGetAdminQuery();
  // console.log(data);

  useEffect(() => {
    if (data && isSuccess && data.data) {
      setName(data.data.name);
    }
  }, [data, isSuccess]);

  const { data: totalStudent, isSuccess: totalStudentIsSuccess } =
    useGetAllStudentQuery();

  useEffect(() => {
    if (totalStudent && totalStudentIsSuccess && totalStudent.data) {
      setStudent(totalStudent.data);
    }
  }, [totalStudent, totalStudentIsSuccess]);

  const { data: totalDonar, isSuccess: totalDonarIsSuccess } =
    useGetAllDonarQuery();
  useEffect(() => {
    if (totalDonar && totalDonarIsSuccess && totalDonar.data) {
      setDonar(totalDonar.data);
    }
  }, [totalDonar, totalDonarIsSuccess]);

  const { data: fund, isSuccess: fundIsSuccess } =
    useGetDashboardRaiseFundQuery();

  useEffect(() => {
    if (fund && fundIsSuccess && fund.data) {
      setRaiseFund(fund.data);
    }
  }, [fund, fundIsSuccess]);

  const { data: todayStudent, isSuccess: todayStudentIsSuccess } =
    useGetDashboardTodayStudentQuery();
  useEffect(() => {
    if (todayStudent && todayStudentIsSuccess && todayStudent.data !== null) {
      setDashboardTodayStudent(todayStudent.data.toString());
    }
  }, [todayStudent, todayStudentIsSuccess]);

  const { data: todayDonar, isSuccess: todayDonarIsSuccess } =
  useGetDashboardTodayDonarQuery();
useEffect(() => {
  if (todayDonar && todayDonarIsSuccess && todayDonar.data !== null) {
    setDashboardTodayDonar(todayDonar.data.toString());
  }
}, [todayDonar, todayDonarIsSuccess]);


  const { data: todayFund, isSuccess: todayFundIsSuccess } =
    useGetDashboardTodayRaiseFundQuery();
  useEffect(() => {
    if (todayFund && todayFundIsSuccess && todayFund.data !== null) {
      setDashboardTodayFund(todayFund.data.toString());
    }
  }, [todayFund, todayFundIsSuccess]);

  console.log(todayFund);

  return (
    <>
      <div className="sidebar-wrapper group w-0  xl:w-[248px] xl:block hidden md:hidden sm:hidden">
        <Sidebar />
      </div>
      <div className="flex flex-col justify-between min-h-screen">
        <div>
          {/* <!-- BEGIN: Header --> */}
          {/* <!-- BEGIN: Header --> */}
          <div className="z-[9]" id="app_header ">
            <div className="app-header z-[999] bg-white dark:bg-slate-800 shadow-sm dark:shadow-slate-700 xl:w-[248px]  ml-0 ml-248px">
              <div className="flex justify-between items-center h-full">
                <div className="flex items-center md:space-x-4 space-x-4 rtl:space-x-reverse vertical-box">
                  <a href="#" className="mobile-logo xl:hidden inline-block">
                    <img
                      src={logo}
                      className="black_logo"
                      alt="logo"
                      width={50}
                      height={30}
                    />
                    {/* <img
                      src="assets/images/logo/logo-c-white.svg"
                      className="white_logo"
                      alt="logo"
                    /> */}
                  </a>
                  <button className="smallDeviceMenuController open-sdiebar-controller hidden xl:hidden md:inline-block">
                    <MenuIcon onClick={toggleSidebar} />
                    {isSidebarVisible && <Sidebar toggle={toggleSidebar} />}
                  </button>
                  <button className="sidebarOpenButton text-xl text-slate-900 dark:text-white !ml-0 rtl:rotate-180 md:hidden">
                    <MenuIcon onClick={toggleSidebar} />
                    {isSidebarVisible && <Sidebar toggle={toggleSidebar} />}
                  </button>

                
                </div>
                {/* <!-- end vertcial --> */}
                <div className="items-center space-x-4 rtl:space-x-reverse horizental-box">
                  <a href="index.html" className="leading-0">
                    <span className="xl:inline-block ">
                      <img
                        // src="assets/images/logo/logo.svg"
                        className="black_logo "
                        alt="logo"
                      />
                      {/* <img
                        src="assets/images/logo/logo-white.svg"
                        className="white_logo"
                        alt="logo"
                      /> */}
                    </span>
                    <span className="xl:hidden inline-block">
                      <img
                        // src="assets/images/logo/logo-c.svg"
                        className="black_logo "
                        alt="logo1"
                      />
                    </span>
                  </a>
                  <button className="smallDeviceMenuController open-sdiebar-controller hidden md:inline-block xl:hidden">
                    <MenuIcon />
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

                <AdminNotification />
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
            className="content-wrapper  ml-0 ml-248px"
            id="content_wrapper"
            style={{ backgroundColor: "#F1F5F9" }}
          >
            <div className="page-content">
              <div id="content_layout">
                <div>
                  <div className="flex justify-between flex-wrap items-center mb-6">
                    <div>
                      <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 mb-4 sm:mb-0 flex space-x-3 rtl:space-x-reverse">
                        Dashboard
                      </h4>
                      <p style={{ color: "#8e8e8e" }}>
                        Hii, {name}. Welcome back to GET.
                      </p>
                    </div>
                    {/* <div>
                      <p>Profile Progress: {percentageComplete}%</p>
                      <div className="progress-bar">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${percentageComplete}%` }}
                        />
                      </div>
                    </div> */}
                  </div>
                  <div className="grid grid-cols-12 gap-5 mb-5">
                    <div className="2xl:col-span-9 lg:col-span-12 col-span-12">
                      <div className="p-4 card">
                        <div className="grid md:grid-cols-4 col-span-1 gap-4">
                          {/* <!-- BEGIN: Group Chart2 --> */}

                          <div className="py-[18px] px-4 rounded-[6px] bg-[#EAE5FF] dark:bg-slate-900	 ">
                            <div className="flex items-center space-x-6 rtl:space-x-reverse">
                              <div className="flex-none">
                                <div id="wline1"></div>
                              </div>
                              <div className="flex-1">
                                <div className="text-slate-800 dark:text-slate-300 text-sm mb-1 font-medium">
                                  Total Students
                                </div>
                                <div className="text-slate-900 dark:text-white text-lg font-medium">
                                  {student}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="py-[18px] px-4 rounded-[6px] bg-[#FFEDE5] dark:bg-slate-900	 ">
                            <div className="flex items-center space-x-6 rtl:space-x-reverse">
                              <div className="flex-none">
                                <div id="wline2"></div>
                              </div>
                              <div className="flex-1">
                                <div className="text-slate-800 dark:text-slate-300 text-sm mb-1 font-medium">
                                  Total Donar
                                </div>
                                <div className="text-slate-900 dark:text-white text-lg font-medium">
                                  {donar}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="py-[18px] px-4 rounded-[6px] bg-[#E5F9FF] dark:bg-slate-900	 ">
                            <div className="flex items-center space-x-6 rtl:space-x-reverse">
                              <div className="flex-none">
                                <div id="wline1"></div>
                              </div>
                              <div className="flex-1">
                                <div className="text-slate-800 dark:text-slate-300 text-sm mb-1 font-medium">
                                  Total Fund Request
                                </div>
                                <div className="text-slate-900 dark:text-white text-lg font-medium">
                                  {raiseFund}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="py-[18px] px-4 rounded-[6px] bg-[#E5F9FF] dark:bg-slate-900	 ">
                            <div className="flex items-center space-x-6 rtl:space-x-reverse">
                              <div className="flex-none">
                                <div id="wline1"></div>
                              </div>
                              <div className="flex-1">
                                <div className="text-slate-800 dark:text-slate-300 text-sm mb-1 font-medium">
                                  Total Register Fund Request (Today)
                                </div>
                                <div className="text-slate-900 dark:text-white text-lg font-medium">
                                  {dashboardTodayFund}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="py-[18px] px-4 rounded-[6px] bg-[#FFEDE5] dark:bg-slate-900	 ">
                            <div className="flex items-center space-x-6 rtl:space-x-reverse">
                              <div className="flex-none">
                                <div id="wline2"></div>
                              </div>
                              <div className="flex-1">
                                <div className="text-slate-800 dark:text-slate-300 text-sm mb-1 font-medium">
                                  Total Register Student (Today)
                                </div>
                                <div className="text-slate-900 dark:text-white text-lg font-medium">
                                  {dashboardTodayStudent}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="py-[18px] px-4 rounded-[6px] bg-[#EAE5FF] dark:bg-slate-900	 ">
                            <div className="flex items-center space-x-6 rtl:space-x-reverse">
                              <div className="flex-none">
                                <div id="wline3"></div>
                              </div>
                              <div className="flex-1">
                                <div className="text-slate-800 dark:text-slate-300 text-sm mb-1 font-medium">
                                  Total Register Donar (Today)
                                </div>
                                <div className="text-slate-900 dark:text-white text-lg font-medium">
                                  {dashboardTodayDonar}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <!-- END: Group Chart2 --> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- BEGIN: Footer For Desktop and tab -->
      <footer id="footer">
        <div className="site-footer px-6 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 py-4 ltr:ml-[248px] rtl:mr-[248px]">
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5">
            <div className="text-center ltr:md:text-start rtl:md:text-right text-sm">
              COPYRIGHT ©
              <span id="thisYear"></span>
              DashCode, All rights Reserved
            </div>
            <div className="ltr:md:text-right rtl:md:text-end text-center text-sm">
              Hand-crafted &amp; Made by
              <a href="https://codeshaper.net/" target="_blank" className="text-primary-500 font-semibold">
                Codeshaper
              </a>
            </div>
          </div>
        </div>
      </footer>
      <!-- END: Footer For Desktop and tab -->
      <div className="bg-white bg-no-repeat custom-dropshadow footer-bg dark:bg-slate-700 flex justify-around items-center
    backdrop-filter backdrop-blur-[40px] fixed left-0 bottom-0 w-full z-[9999] bothrefm-0 py-[12px] px-4 md:hidden">
        <a href="chat.html">
          <div>
            <span className="relative cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center mb-1 dark:text-white
          text-slate-900 ">
        <iconify-icon icon="heroicons-outline:mail"></iconify-icon>
        <span className="absolute right-[5px] lg:hrefp-0 -hrefp-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center
            justify-center rounded-full text-white z-[99]">
          10
        </span>
            </span>
            <span className="block text-[11px] text-slate-600 dark:text-slate-300">
        Messages
      </span>
          </div>
        </a>
        <a href="profile.html" className="relative bg-white bg-no-repeat backdrop-filter backdrop-blur-[40px] rounded-full footer-bg dark:bg-slate-700
      h-[65px] w-[65px] z-[-1] -mt-[40px] flex justify-center items-center">
          <div className="h-[50px] w-[50px] rounded-full relative left-[0px] hrefp-[0px] custom-dropshadow">
            <img src="assets/images/users/user-1.jpg" alt="" className="w-full h-full rounded-full border-2 border-slate-100">
          </div>
        </a>
        <a href="#">
          <div>
            <span className=" relative cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center mb-1 dark:text-white
          text-slate-900">
        <iconify-icon icon="heroicons-outline:bell"></iconify-icon>
        <span className="absolute right-[17px] lg:hrefp-0 -hrefp-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center
            justify-center rounded-full text-white z-[99]">
          2
        </span>
            </span>
            <span className=" block text-[11px] text-slate-600 dark:text-slate-300">
        Notifications
      </span>
          </div>
        </a>
      </div> */}
      </div>
    </>
  );
};

export default Layout;
