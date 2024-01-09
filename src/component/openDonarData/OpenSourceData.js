import React, { useState, useEffect } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import icon from "../../assets/images/ck.svg";
import logo from "../../assets/images/logo.png";
import Sidebar from "../sidebar/Sidebar";
import { useGetOpenDonarDataQuery } from "../../services/SignUpApi";
import AdminNotification from "../adminNotification/AdminNotification";

const OpenSourceData = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10); // Default value
  const [donarData, setDonarData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(donarData?.length);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEntries, setFilteredEntries] = useState([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  console.log(donarData);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    alert("Admin logout successfully!");
  };

  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const { data: openSource, isSuccess: openSourceIsSuccess } =
    useGetOpenDonarDataQuery();
  //   console.log(openSource)

  useEffect(() => {
    if (openSource && openSourceIsSuccess && openSource.data) {
      setDonarData(openSource.data);
    }
  }, [openSource, openSourceIsSuccess]);
  console.log(donarData);

  function formatDate(createdAt) {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    // Pad single digits with leading zero
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}.${formattedMonth}.${year}`;
  }

  useEffect(() => {
    const filteredData = donarData?.filter((entry) => {
      const donarName = entry.name || "";
      const amount = entry.donationAmount || "";
      return (
        donarName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        amount.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredEntries(filteredData);
    setTotalEntries(filteredData?.length || 0);
    setCurrentPage(1);
  }, [searchQuery, donarData]);
  const getCurrentPageEntries = () => {
    if (entriesPerPage === Infinity) {
      // Show all entries
      return searchQuery
        ? filteredEntries
        : donarData.slice((currentPage - 1) * entriesPerPage);
    }

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);

    return searchQuery
      ? filteredEntries.slice(startIndex, endIndex)
      : donarData.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate the start and end index of the entries to display on the current page
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);

  return (
    <>
      <div className="sidebar-wrapper group w-0  xl:w-[248px] xl:block hidden md:hidden sm:hidden">
        <Sidebar />
      </div>
      <div className="z-[9]" id="app_header">
        <div className="app-header z-[999] bg-white dark:bg-slate-800 shadow-sm dark:shadow-slate-700 ml-0 ml-248px">
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
            <div className="items-center space-x-4 rtl:space-x-reverse horizental-box">
              <a href="#" className="leading-0">
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
      <div className="flex flex-col justify-between min-h-screen">
        <div
          className="content-wrapper transition-all duration-150 xl:ltr:ml-[248px] ml-0 ml-248px"
          id="content_wrapper"
          style={{ backgroundColor: "#F1F5F9" }}
        >
          <div className="page-content">
            <div id="content_layout">
              <div>
                <div className="card xl:col-span-2 mt-5">
                  <div className=" flex flex-col p-6">
                    <header className="flex mb-5 items-center border-b border-slate-100 dark:border-slate-700 pb-5 -mx-6 px-6">
                      <div className="flex-1">
                        <div className="card-title text-slate-900 dark:text-white">
                          Open Source Donar
                        </div>
                      </div>
                    </header>
                    <div className="card-text h-full">
                      <div className=" space-y-5">
                        <div className="card">
                          <div className="px-6">
                            <div className="overflow-x-auto -mx-6 dashcode-data-table">
                              <span className=" col-span-8  "></span>
                              <span className="  col-span-4 "></span>
                              <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden ">
                                  <div
                                    style={{ margin: "12px" }}
                                    className="flex"
                                  >
                                    <div
                                      style={{
                                        width: "392px",
                                        height: "40px",
                                        borderRadius: "6px",
                                        marginLeft: "10px",
                                        border: "1px solid #dcdcdc",
                                        display: "flex",
                                      }}
                                    >
                                      <SearchIcon
                                        style={{
                                          margin: "8px",
                                          color: "#EC6E46",
                                        }}
                                      />
                                      <input
                                        type="text"
                                        name="search"
                                        //   className="py-2"
                                        style={{
                                          border: "none",
                                          outline: "none",
                                          boxShadow: "none",
                                          width: "300px",
                                        }}
                                        value={searchQuery}
                                        onChange={(e) =>
                                          setSearchQuery(e.target.value)
                                        }
                                        placeholder="Search Users by Name or Amount"
                                      />
                                    </div>
                                  </div>
                                  <table
                                    className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                                    id="data-table"
                                  >
                                    <thead
                                      className=" border-t border-slate-100 dark:border-slate-800 "
                                      style={{ backgroundColor: "#EC6E46" }}
                                    >
                                      <tr>
                                        <th scope="col" className=" table-th ">
                                          SNo
                                        </th>

                                        <th scope="col" className=" table-th ">
                                          Donar Name
                                        </th>

                                        <th scope="col" className=" table-th ">
                                          GetePay Txn Id
                                        </th>

                                        <th scope="col" className=" table-th ">
                                          Merchant Transaction Id
                                        </th>

                                        <th scope="col" className=" table-th ">
                                          Mobile Number
                                        </th>

                                        <th scope="col" className=" table-th ">
                                          Donation Amount
                                        </th>

                                        <th scope="col" className=" table-th ">
                                          Location
                                        </th>
                                        <th scope="col" className=" table-th ">
                                          IP Address
                                        </th>
                                        <th scope="col" className=" table-th ">
                                          Pin Code
                                        </th>
                                        <th scope="col" className=" table-th ">
                                          PAN
                                        </th>
                                        <th scope="col" className=" table-th ">
                                          Date
                                        </th>
                                        <th scope="col" className=" table-th ">
                                          Status
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                                      {getCurrentPageEntries().map(
                                        (item, index) => {
                                          return (
                                            <tr>
                                              <td className="table-td">
                                                {index + 1}
                                              </td>
                                              <td className="table-td ">
                                                <span
                                                  style={{
                                                    color: "#000",
                                                    fontWeight: 500,
                                                  }}
                                                >
                                                  {item.name}
                                                </span>
                                                <div className="table-data">
                                                  {item.email}
                                                </div>
                                              </td>
                                              {/* <td className="table-td table-data">+91 7088440955</td> */}
                                              <td className="table-td">
                                                <div className="table-data">
                                                  {item.getepayTxnId}
                                                </div>
                                              </td>

                                              <td className="table-td ">
                                                {" "}
                                                <div
                                                  className="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-warning-500
        bg-warning-500"
                                                >
                                                  {item.merchantTransactionId}
                                                </div>
                                              </td>
                                              <td className="table-td table-data">
                                                +91{item.mobileNumber}
                                              </td>
                                              <td className="table-td ">
                                                <div>
                                                  ₹ {item.donationAmount}
                                                  <p
                                                    style={{
                                                      marginLeft: "30px",
                                                      fontSize: "12px",
                                                      color: "#6E6893",
                                                    }}
                                                  >
                                                    INR
                                                  </p>
                                                </div>
                                              </td>

                                              <td className="table-td ">
                                                <span
                                                  style={{
                                                    color: "#000",
                                                    fontWeight: 500,
                                                  }}
                                                >
                                                  {item.address}
                                                </span>
                                              </td>
                                              <td className="table-td table-data">
                                                192.168.1.5:12000
                                              </td>
                                              <td className="table-td table-data">
                                                {item.pinCode}
                                              </td>
                                              <td className="table-td table-data">
                                                {item.pan === ""
                                                  ? "-"
                                                  : item.pan}
                                              </td>
                                              <td className="table-td table-data">
                                                {formatDate(item.createdAt)}
                                              </td>
                                              <td className="table-td table-data">
                                                {item.status === "SUCCESS" ? (
                                                  <div
                                                    className="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-success-500
        bg-success-500"
                                                  >
                                                    {item.status}
                                                  </div>
                                                ) : item.status ===
                                                  "FAILED" ? (
                                                  <div
                                                    className="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-danger-500
        bg-danger-500"
                                                  >
                                                    {item.status}
                                                  </div>
                                                ) : (
                                                  <div
                                                    className="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-white
        bg-gray-700"
                                                  >
                                                    Not Attempt
                                                  </div>
                                                )}
                                              </td>
                                            </tr>
                                          );
                                        }
                                      )}
                                    </tbody>
                                  </table>

                                  <div
                                    className="flex flex-col p-6"
                                    style={{
                                      backgroundColor:
                                        "rgba(236, 110, 70, 0.2)",
                                    }}
                                  >
                                    <div className="card-text h-full flex flex-wrap items-center justify-between">
                                      <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                                        <span>Entries per page:</span>
                                        <select
                                          value={entriesPerPage}
                                          onChange={(e) => {
                                            setEntriesPerPage(
                                              Number(e.target.value)
                                            );
                                            setCurrentPage(1);
                                          }}
                                        >
                                          <option value="5">5</option>
                                          <option value="10">10</option>
                                          <option value="20">20</option>
                                          <option value={Infinity}>All</option>
                                        </select>
                                      </div>
                                      {/* <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                                      
                                      </div> */}
                                      <div>
                                        <ul className="list-none">
                                          <li className="inline-block">
                                            <button
                                              onClick={() =>
                                                handlePageChange(
                                                  currentPage - 1
                                                )
                                              }
                                              disabled={currentPage === 1}
                                            >
                                              <KeyboardArrowLeftIcon
                                                style={{
                                                  fontSize: "20px",
                                                }}
                                              />
                                            </button>
                                          </li>

                                          {Array.from(
                                            {
                                              length: Math.ceil(
                                                totalEntries / entriesPerPage
                                              ),
                                            },
                                            (_, index) => index + 1
                                          ).map((page) => (
                                            <li
                                              key={page}
                                              className="inline-block"
                                            >
                                              <button
                                                onClick={() =>
                                                  handlePageChange(page)
                                                }
                                                className={`flex items-center justify-center w-6 h-6 bg-slate-100 dark:bg-slate-700 dark:hover:bg-black-500 text-slate-800
                                        dark:text-white rounded mx-[3px] sm:mx-1 hover:bg-black-500 hover:text-white text-sm font-Inter font-medium transition-all
                                        duration-300 relative top-[2px]  ${
                                          currentPage === page ? "active" : ""
                                        }`}
                                              >
                                                {page}
                                              </button>
                                            </li>
                                          ))}

                                          <li className="inline-block">
                                            <button
                                              onClick={() =>
                                                handlePageChange(
                                                  currentPage + 1
                                                )
                                              }
                                              disabled={
                                                currentPage ===
                                                Math.ceil(
                                                  totalEntries / entriesPerPage
                                                )
                                              }
                                            >
                                              <KeyboardArrowRightIcon
                                                style={{ fontSize: "20px" }}
                                              />
                                            </button>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
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

export default OpenSourceData;
