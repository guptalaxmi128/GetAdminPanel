import React, { useState, useEffect } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { DatePicker, Button } from "antd";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import moment from "moment";
import SearchIcon from "@mui/icons-material/Search";
import icon from "../../assets/images/ck.svg";
// import filter from "../../assets/images/filter.png";
import logo from "../../assets/images/logo.png";
import Sidebar from "../sidebar/Sidebar";
import { useGetStudentProfileQuery } from "../../services/SignUpApi";
import AdminNotification from "../adminNotification/AdminNotification";
import noRecord from "../../assets/no-record-found.png";

const Student = () => {
  const { RangePicker } = DatePicker;
  const [studentData, setStudentData] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(5); // Default value
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(studentData?.length);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEntries, setFilteredEntries] = useState([]);

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const { data: allStudent, isSuccess: allStudentIsSuccess } =
    useGetStudentProfileQuery();

  useEffect(() => {
    if (allStudent && allStudentIsSuccess) {
      setStudentData(allStudent);
    }
  }, [allStudent, allStudentIsSuccess]);
  // console.log(studentData);

  useEffect(() => {
    const filteredData = studentData?.filter((entry) => {
      const name = entry.name || "";
      const email = entry.email || "";
      const mobileNumber = entry.mobileNumber || "";
      const currentCourse = entry?.Qualification || "";
      const currentAddress = entry?.currentAddress || "";

      return (
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mobileNumber.includes(searchQuery.toLowerCase()) ||
        currentAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        currentCourse.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredEntries(filteredData);
    setTotalEntries(filteredData?.length || 0);
    setCurrentPage(1);
  }, [searchQuery, studentData]);

  const getCurrentPageEntries = () => {
    if (entriesPerPage === Infinity) {
      // Show all entries
      return searchQuery
        ? filteredEntries
        : studentData.slice((currentPage - 1) * entriesPerPage);
    }

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);

    return searchQuery
      ? filteredEntries.slice(startIndex, endIndex)
      : studentData.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate the start and end index of the entries to display on the current page
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);

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

  function generateStatus(status) {
    const response = status ? "married" : "unmarried";

    return response;
  }

  function filterStudentDataByDateRange(data, startDate, endDate) {
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    const filteredData = data.filter((student) => {
      const createdAtDate = new Date(student.createdAt);
      return createdAtDate >= parsedStartDate && createdAtDate <= parsedEndDate;
    });

    return filteredData;
  }

  function generateCSVData(filteredData) {
    console.log(filteredData);
    const csvData = [];
    csvData.push([
      "Student ID",
      "Date",
      "Name",
      "Email",
      "Mobile Number",
      "DOB",
      "Gender",
      "Marital Status",
      "Father Name",
      "Mother Name",
      "Qualification",
      "Religion",
      "Occupation",
      "Current Address",
      "District",
      "Nationality",
    ]);

    filteredData.forEach((student) => {
      csvData.push([
        student.UID,
        formatDate(student.createdAt),
        student.name,
        student.email,
        student.mobileNumber,
        student.dateOfBirth,
        student.gender,
        generateStatus(student.maritalStatus),
        student.fatherName,
        student.motherName,
        student.Qualification,
        student.religion,
        student.occupation,
        student.currentAddress,
        student.district,
        student.nationality,
      ]);
    });

    return Papa.unparse(csvData);
  }

  const handleDateRangeChange = (dates) => {
    setSelectedDateRange(dates);
  };

  const handleExport = () => {
    if (selectedDateRange && selectedDateRange.length === 2) {
      const [startDate, endDate] = selectedDateRange;
      const filteredData = filterStudentDataByDateRange(
        studentData,
        startDate,
        endDate
      );
      const csvData = generateCSVData(filteredData);

      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "student_data.csv");
    }
  };

  return (
    <>
      <div className="sidebar-wrapper group w-0  xl:w-[248px] xl:block hidden md:hidden sm:hidden">
        <Sidebar />
      </div>
      <div class="z-[9]" id="app_header">
        <div class="app-header z-[999] bg-white dark:bg-slate-800 shadow-sm dark:shadow-slate-700  ml-0 ml-248px">
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
                class="flex items-center xl:text-sm text-lg xl:text-slate-400 text-slate-800 dark:text-slate-300 focus:outline-none focus:shadow-none px-1 space-x-3
        rtl:space-x-reverse search-modal"
                data-bs-toggle="modal"
                data-bs-target="#searchModal"
              >
                <SearchIcon />
                <span class="xl:inline-block hidden">Search...</span>
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
      <div class="flex flex-col justify-between min-h-screen">
        <div
          class="content-wrapper transition-all duration-150 xl:ltr:ml-[248px]  ml-0 ml-248px"
          id="content_wrapper"
          style={{ backgroundColor: "#F1F5F9" }}
        >
          <div class="page-content">
            <div id="content_layout">
              <div>
                <div className="card xl:col-span-2 mt-5">
                  <div className="flex flex-col p-6">
                    <header className="flex mb-5 items-center border-b border-slate-100 dark:border-slate-700 pb-5 -mx-6 px-6">
                      <div className="flex-1">
                        <div className="card-title text-slate-900 dark:text-white">
                          Students
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400 cursor-pointer">
                          {" "}
                          <RangePicker onChange={handleDateRangeChange} />
                        </span>
                        <Button onClick={handleExport}>Export</Button>
                      </div>
                    </header>
                    <div className="card-text h-full">
                      <div className=" space-y-5">
                        <div className="card">
                          <div className=" px-6">
                            <div className="overflow-x-auto -mx-6 dashcode-data-table">
                              <span className=" col-span-8  "></span>
                              <span className="  col-span-4 "></span>
                              <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden ">
                                  {getCurrentPageEntries().length === 0 ? (
                                    // If there's no data, don't render the table
                                    <div className="text-center py-4">
                                      <img
                                        src={noRecord}
                                        alt="No data available"
                                        style={{
                                          display: "block",
                                          margin: "0 auto",
                                        }}
                                      />
                                      <p>No data available.</p>
                                    </div>
                                  ) : (
                                    <>
                                      <div
                                        style={{ margin: "12px" }}
                                        className="flex"
                                      >
                                        {/* <div
                                      className="flex"
                                      style={{
                                        width: "88px",
                                        height: "40px",
                                        border: "1px solid #EC6E46",
                                        borderRadius: "6px",
                                        justifyContent: "space-between",
                                        padding: "10px",
                                      }}
                                    >
                                      <img
                                        src={filter}
                                        alt="filter"
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                        }}
                                      />
                                      <p style={{ fontSize: "12px" }}>Filter</p>
                                    </div> */}
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
                                            placeholder="Search Users by Name,Mobile Number,Current Course Or Email"
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
                                            <th
                                              scope="col"
                                              className=" table-th "
                                            >
                                              <div class="checkbox-area">
                                                <label class="inline-flex items-center cursor-pointer">
                                                  <input
                                                    type="checkbox"
                                                    class="hidden"
                                                    name="checkbox"
                                                  />
                                                  <span class="h-4 w-4 border flex-none border-slate-100 dark:border-slate-800 rounded inline-flex ltr:mr-3 rtl:ml-3 relative transition-all duration-150 bg-slate-100 dark:bg-slate-900">
                                                    <img
                                                      src={icon}
                                                      alt=""
                                                      class="h-[10px] w-[10px] block m-auto opacity-0"
                                                    />
                                                  </span>
                                                </label>
                                              </div>
                                            </th>

                                            <th
                                              scope="col"
                                              className=" table-th "
                                            >
                                              Name
                                            </th>

                                            <th
                                              scope="col"
                                              className=" table-th "
                                            >
                                              Email
                                            </th>

                                            <th
                                              scope="col"
                                              className=" table-th "
                                            >
                                              Mobile Number
                                            </th>

                                            <th
                                              scope="col"
                                              className=" table-th "
                                            >
                                              Location
                                            </th>

                                            <th
                                              scope="col"
                                              className=" table-th "
                                            >
                                              Current Course
                                            </th>

                                            <th
                                              scope="col"
                                              className=" table-th "
                                            >
                                              View Profile
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                                          {getCurrentPageEntries().map(
                                            (item, index) => (
                                              <tr key={index}>
                                                <td className="table-td">
                                                  {" "}
                                                  <div class="checkbox-area">
                                                    <label class="inline-flex items-center cursor-pointer">
                                                      <input
                                                        type="checkbox"
                                                        class="hidden"
                                                        name="checkbox"
                                                      />
                                                      <span class="h-4 w-4 border flex-none border-slate-100 dark:border-slate-800 rounded inline-flex ltr:mr-3 rtl:ml-3 relative transition-all duration-150 bg-slate-100 dark:bg-slate-900">
                                                        <img
                                                          src={icon}
                                                          alt=""
                                                          class="h-[10px] w-[10px] block m-auto opacity-0"
                                                        />
                                                      </span>
                                                    </label>
                                                  </div>
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
                                                </td>

                                                <td className="table-td">
                                                  <div className="table-data">
                                                    {item.email}
                                                  </div>
                                                </td>
                                                <td className="table-td ">
                                                  <span
                                                    style={{
                                                      color: "#000",
                                                      fontWeight: 500,
                                                    }}
                                                  >
                                                    {item.mobileNumber}
                                                  </span>
                                                </td>
                                                <td className="table-td ">
                                                  <span
                                                    style={{
                                                      color: "#000",
                                                      fontWeight: 500,
                                                    }}
                                                  >
                                                    {item?.currentAddress}
                                                  </span>
                                                </td>
                                                <td className="table-td ">
                                                  {" "}
                                                  {item?.Qualification}
                                                </td>
                                                <td className="table-td ">
                                                  <Link
                                                    to={`profile/${item.UID}`}
                                                  >
                                                    <span
                                                      style={{
                                                        color: "#EC6E46",
                                                      }}
                                                    >
                                                      Profile
                                                    </span>
                                                  </Link>
                                                </td>
                                              </tr>
                                            )
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
                                              <option value={Infinity}>
                                                All
                                              </option>
                                            </select>
                                          </div>

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
                                                    totalEntries /
                                                      entriesPerPage
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
                                                      totalEntries /
                                                        entriesPerPage
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
                                    </>
                                  )}
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

export default Student;
