import React, { useState, useEffect } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import user from "../../assets/images/user/user-1.jpg";
import logo from "../../assets/images/logo.png";
import Sidebar from "../sidebar/Sidebar";
import { Link } from "react-router-dom";
import {
  useSendNotificationMutation,
  useGetNotificationQuery,
  useGetAdminQuery,
  useGetPendingUpdationRequestQuery,
  useAddRejectUpdationRequestMutation,
  useAddAcceptUpdationRequestMutation,
} from "../../services/SignUpApi";
import AdminNotification from "../adminNotification/AdminNotification";

const Notification = () => {
  const [name, setName] = useState("");
  const [notification, setNotification] = useState([]);
  const [isNotification, setIsNotification] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [to, setTo] = useState("default");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");

  const [addRejectUpdationRequest] = useAddRejectUpdationRequestMutation();
  const [addAcceptUpdationRequest] = useAddAcceptUpdationRequestMutation();

  const handleAccept = async (notificationId) => {
    console.log(notificationId);
    let formData = {
      updateDetailId: notificationId,
    };

    console.log(formData);

    const res = await addAcceptUpdationRequest(formData);
    console.log(res);
    alert(`Updation request accepted  successfully!`);
  };

  const handleReject = async (notificationId) => {
    console.log(notificationId);
    let formData = {
      updateDetailId: notificationId,
    };

    console.log(formData);

    const res = await addRejectUpdationRequest(formData);
    console.log(res);
    alert(`Updation request rejected  successfully!`);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    alert("Admin logout successfully!");
  };
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const [sendNotification] = useSendNotificationMutation();
  const clearTextInput = () => {
    setTo("default");
    setMessage("");
    setLink("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = {
      to,
      message,
    };

    if (link) {
      formData.link = link;
    }

    console.log(formData);
    const res = await sendNotification(formData);
    console.log(res);
    alert(`Notification send to ${to}  successfully!`);
    clearTextInput();
  };

  const { data: adminNotification, isSuccess: adminIsSuccess } =
    useGetNotificationQuery();

  console.log(adminNotification);
  // console.log("data", notification);
  const {
    data: updateRequestNotification,
    isSuccess: updateRequestNotificationIsSuccess,
  } = useGetPendingUpdationRequestQuery();
  console.log(updateRequestNotification);

  // useEffect(() => {
  //   if (adminNotification && adminIsSuccess && adminNotification.data) {
  //     setNotification(adminNotification.data);
  //   }
  // }, [adminNotification, adminIsSuccess]);

  useEffect(() => {
    if (
      adminNotification &&
      adminIsSuccess &&
      adminNotification.data &&
      updateRequestNotificationIsSuccess
    ) {
      const combinedData = [
        ...adminNotification.data,
        ...updateRequestNotification.data,
      ];
      const sortedData = combinedData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setNotification(sortedData);
    }
  }, [adminNotification, adminIsSuccess, updateRequestNotification]);

  const { data, isSuccess } = useGetAdminQuery();
  console.log(data);

  useEffect(() => {
    if (data && isSuccess && data.data) {
      setName(data.data.name);
    }
  }, [data, isSuccess]);

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
                {/* <div className="nav-tools flex items-center lg:space-x-5 space-x-3 rtl:space-x-reverse leading-0">
                
                  <div className="relative md:block hidden">
                    <button
                      className="lg:h-[32px] lg:w-[32px] lg:bg-slate-50 lg:dark:bg-slate-900 dark:text-white text-slate-900 cursor-pointer
      rounded-full text-[20px] flex flex-col items-center justify-center"
                    >
                      <NotificationsIcon
                        onClick={() => setIsNotification(!isNotification)}
                      />
                      <span
                        className="absolute -right-1 lg:top-0 -top-[6px] h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center
        justify-center rounded-full text-white z-[99]"
                      >
                        4
                      </span>
                    </button>
                 
                    {isNotification && (
                      <div
                        className="dropdown-menu z-10  bg-white divide-y divide-slate-100 dark:divide-slate-900 shadow w-[335px]
      dark:bg-slate-800 border dark:border-slate-900 !top-[23px] rounded-md absolute"
                        style={{ right: "0" }}
                      >
                        <div className="flex items-center justify-between py-3 px-3">
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
                        {notification.map((notification) => (
                          <div
                            className="divide-y divide-slate-100 dark:divide-slate-900"
                            role="none"
                            key={notification.id}
                          >
                            <div className="bg-slate-100 dark:bg-slate-700 dark:text-white text-slate-800 block w-full px-4 py-2 text-sm relative">
                              <div className="flex ltr:text-left rtl:text-right">
                                <div className="flex-1">
                                  <div className="text-slate-600 text-xs leading-4">
                                    {notification.message}
                                  </div>
                                  <div className="text-xs font-Inter font-normal underline text-slate-500 dark:text-white">
                                    {notification.link}
                                  </div>
                                  {notification.postingTime && (
                                    <div className="text-slate-400 dark:text-slate-400 text-xs mt-1">
                                      {notification.createdAt}
                                    </div>
                                  )}
                                </div>
                                {notification.otp === null && (
                                  <div>
                                    <div className="flex-1">
                                      <div className="text-slate-600 text-xs leading-4">
                                        {notification.requestMessage}
                                      </div>
                                      <div className="text-slate-400 dark:text-slate-400 text-xs mt-1">
                                        {notification.createdAt}
                                      </div>
                                    </div>
                                    <button
                                      className=" inline-flex justify-center "
                                      type="button"
                                      style={{
                                        color: "#fff",
                                        background:
                                          "linear-gradient(to top right, #ccffcc 0%, #99ff99 100%)",
                                        width: "55px",
                                        height: "26px",
                                        borderRadius: "4px",
                                        marginTop: "3px",
                                        marginRight: "5px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                      onClick={() =>
                                        handleAccept(notification.id)
                                      }
                                    >
                                      Accept
                                    </button>
                                    <button
                                      className=" inline-flex justify-center "
                                      type="button"
                                      style={{
                                        color: "#fff",
                                        background:
                                          "linear-gradient(to bottom, #ffcc99 0%, #ff9900 100%)",
                                        width: "55px",
                                        height: "26px",
                                        borderRadius: "4px",
                                        marginTop: "3px",
                                        marginRight: "5px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                      onClick={() =>
                                        handleReject(notification.id)
                                      }
                                    >
                                      Reject
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                 
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
                        {name}
                      </span>
                   

                      <KeyboardArrowDownIcon onClick={toggleDropdown} />
                    </button>
                  
                    {isDropdownOpen && (
                      <div
                        className="dropdown-menu z-10  bg-white divide-slate-100 shadow w-44 dark:bg-slate-800 border dark:border-slate-700 top-[23px] rounded-md
      overflow-hidden absolute "
                      >
                        <ul className="py-1 text-sm text-slate-800 dark:text-slate-200">
                          <li>
                            <Link
                              to={"/login"}
                              className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:text-white font-inter text-sm text-slate-600
            dark:text-white font-normal"
                              onClick={handleLogout}
                            >
                            
                              <LogoutIcon style={{ fontSize: "medium" }} />{" "}
                              &nbsp;
                              <span className="font-Inter">Logout</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  
                </div> */}
                <AdminNotification />
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
                  <div className="card xl:col-span-2 mt-5">
                    <div className="card-body flex flex-col p-6">
                      <header className="flex mb-5 items-center border-b border-slate-100 dark:border-slate-700 pb-5 -mx-6 px-6">
                        <div className="flex-1">
                          <div className="card-title text-slate-900 dark:text-white">
                            Notification
                          </div>
                        </div>
                      </header>
                      <div className="card-text h-full">
                        <form className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="input-area">
                              <label htmlFor="to" className="form-label">
                                To
                              </label>
                              <div className="relative">
                                <select
                                  id="to"
                                  className="form-control"
                                  value={to}
                                  onChange={(e) => setTo(e.target.value)}
                                >
                                  <option
                                    value="default"
                                    className="dark:bg-slate-700"
                                    disabled
                                  >
                                    Select Option
                                  </option>
                                  <option value="Donar">Donar</option>
                                  <option value="Student">Student</option>
                                </select>
                              </div>
                            </div>

                            <div className="input-area">
                              <label htmlFor="link" className="form-label">
                                Link
                              </label>
                              <div className="relative">
                                <input
                                  id="link"
                                  type="text"
                                  name="link"
                                  className="form-control"
                                  placeholder="Enter Link"
                                  value={link}
                                  onChange={(e) => setLink(e.target.value)}
                                />
                              </div>
                            </div>

                            <div class="input-area">
                              <label for="message" class="form-label">
                                Message
                              </label>
                              <textarea
                                id="message"
                                rows="5"
                                class="form-control"
                                placeholder="Your Answer"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                              />
                            </div>
                          </div>
                          <button
                            className="btn inline-flex justify-center btn-dark"
                            type="button"
                            onClick={(e) => handleSubmit(e)}
                          >
                            Submit
                          </button>
                        </form>
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

export default Notification;
