import React, { useState, useEffect, useRef } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import user from "../../assets/images/user/user-1.jpg";
import { Link } from "react-router-dom";
import {
  useGetNotificationQuery,
  useGetAdminQuery,
  useGetPendingUpdationRequestQuery,
  useAddRejectUpdationRequestMutation,
  useAddAcceptUpdationRequestMutation,
  useGetDonationHistoryForAllQuery,
} from "../../services/SignUpApi";

const AdminNotification = () => {
  const [name, setName] = useState("");
  const [notification, setNotification] = useState([]);
  const [isNotification, setIsNotification] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const notificationIconRef = useRef(null);
  const logoutIconRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    // alert("Admin logout successfully!");
  };

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
    if (res.data.success) {
      toast.success(res.data.message);

     
    }
  };

  const handleReject = async (notificationId) => {
    console.log(notificationId);
    let formData = {
      updateDetailId: notificationId,
    };

    console.log(formData);

    const res = await addRejectUpdationRequest(formData);
    console.log(res);
    if (res.data.success) {
      toast.success(res.data.message);

    
    }
  };

  const { data: adminNotification, isSuccess: adminIsSuccess } =
    useGetNotificationQuery();

  const {
    data: updateRequestNotification,
    isSuccess: updateRequestNotificationIsSuccess,
  } = useGetPendingUpdationRequestQuery();
  const { data: donation, isSuccess: donationIsSuccess } =
    useGetDonationHistoryForAllQuery();


  useEffect(() => {
    if (
      adminNotification &&
      adminIsSuccess &&
      adminNotification.data &&
      updateRequestNotificationIsSuccess &&
      donation &&
      donationIsSuccess
    ) {
      const combinedData = [
        ...adminNotification.data,
        ...updateRequestNotification.data,
        ...donation.data,
      ];
      const sortedData = combinedData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setNotification(sortedData);
    }
  }, [adminNotification, adminIsSuccess, updateRequestNotification, donation]);

  const { data, isSuccess } = useGetAdminQuery();
  // console.log(notification);

  useEffect(() => {
    if (data && isSuccess && data.data) {
      setName(data.data.name);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationIconRef.current &&
        !notificationIconRef.current.contains(event.target)
      ) {
        setIsNotification(false);
      }
      if (
        logoutIconRef.current &&
        !logoutIconRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  
  

  return (
    <>
      <div className="nav-tools flex items-center lg:space-x-5 space-x-3 rtl:space-x-reverse leading-0">
        <div className="relative md:block hidden">
          <button
            className="lg:h-[32px] lg:w-[32px] lg:bg-slate-50 lg:dark:bg-slate-900 dark:text-white text-slate-900 cursor-pointer
      rounded-full text-[20px] flex flex-col items-center justify-center"
          >
            <NotificationsIcon
              ref={notificationIconRef}
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
              <div
                className="max-h-60 overflow-y-auto"
                style={{
    maxHeight: "300px",
    scrollbarWidth: "thin", 
    scrollbarColor: "#4A5568 #E2E8F0", 
  }}
              >
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
                            <div className="inline-block px-3 min-w-[100px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-success-500 bg-success-500 cursor-pointer"
                              onClick={() => handleAccept(notification.id)}
                            >
                              Accept
                            </div>
                            <div className="inline-block px-3 min-w-[100px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-warning-500 bg-warning-500 cursor-pointer"
                              onClick={() => handleReject(notification.id)}
                            >
                              Reject
                            </div>
                          </div>
                        )}
                      </div>
                      {(notification.status === null ||
                        notification.status === "SUCCESS" ||
                        notification.status === "FAILED") && (
                        <div>
                          <div className="flex-1">
                            <div className="text-slate-600 text-xs leading-4">
                              {notification.status === "SUCCESS" ? (
                                <p>
                                  {notification.donarName} has paid to{" "}
                                  {notification.studentName} an amount of ₹
                                  {notification.amount}
                                  <br />
                                  Status: Success
                                </p>
                              ) : (
                                <>
                                  {notification.amount && (
                                    <p>
                                      <p style={{ color: "red" }}>
                                        {" "}
                                        {notification.donarName} attempted to pay
                                        to {notification.studentName} an amount
                                        of ₹{notification.amount}
                                      </p>
                                      Status:{" "}
                                      {notification.status !== null
                                        ? notification.status
                                        : "null"}
                                    </p>
                                  )}
                                </>
                              )}
                            </div>
                            {notification.amount ?   <div className="text-slate-400 dark:text-slate-400 text-xs mt-1">
                              {notification.createdAt}
                            </div> :''}
                          
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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

            <KeyboardArrowDownIcon
              ref={logoutIconRef}
              onClick={toggleDropdown}
            />
          </button>

          {isDropdownOpen && (
            <div
              className="dropdown-menu z-10  bg-white divide-slate-100 shadow w-44 dark:bg-slate-800 border dark:border-slate-700 top-[23px] rounded-md
      overflow-hidden absolute "
            >
              <ul className="py-1 text-sm text-slate-800 dark:text-slate-200">
                <li>
                  <Link
                    to={"/"}
                    className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:text-white font-inter text-sm text-slate-600
            dark:text-white font-normal"
                    onClick={handleLogout}
                  >
                    <LogoutIcon style={{ fontSize: "medium" }} /> &nbsp;
                    <span className="font-Inter">Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
  
    </>
  );
};

export default AdminNotification;
