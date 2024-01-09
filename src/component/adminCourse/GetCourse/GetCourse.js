import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, DialogContent } from "@mui/material";
import { Trash2, Edit } from "react-feather";
import PropTypes from "prop-types";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import icon from "../../../assets/images/ck.svg";
import { Link } from "react-router-dom";
import filter from "../../../assets/images/filter.png";
import {
  useDeleteCourseMutation,
  useGetAdminCourseQuery,
  useUpdateCourseImageMutation,
} from "../../../services/SignUpApi";
import noRecord from "../../../assets/no-record-found.png";
import AddLesson from "../addLesson/AddLesson";
import GetLesson from "../addLesson/GetLesson";

const GetCourse = () => {
  const [value, setValue] = useState(0);

  const [adminCourse, setAdminCourse] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [openPopup, setOpenPopup] = useState(false);

  const [adminCourseId, setAdminCourseId] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5); // Default value
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(adminCourse?.length);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [showLesson, setShowLesson] = useState(false);

  //   const localHost = "http://localhost:5000";
  const localHost = "https://global-education-t.onrender.com";

  const { data, isSuccess } = useGetAdminCourseQuery();

  console.log(data);

  useEffect(() => {
    if (data && isSuccess) {
      setAdminCourse(data.data);
    }
  }, [data, isSuccess]);

  const handleImageClick = (fileName) => {
    setSelectedImage(fileName);
    setOpenPopup(true);
  };

  const handleClick = (courseId) => {
    setAdminCourseId(courseId);
    setShowLesson(true);
  };

  useEffect(() => {
    const filteredData = adminCourse?.filter((entry) => {
      const courseName = entry.courseName || "";
      const courseTitle = entry.courseTitle || "";
      const courseTeacher = entry.courseTeacher || "";
      const courseType = entry.courseType || "";

      return (
        courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        courseTeacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
        courseType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredEntries(filteredData);
    setTotalEntries(filteredData?.length || 0);
    setCurrentPage(1);
  }, [searchQuery, adminCourse]);

  const getCurrentPageEntries = () => {
    if (entriesPerPage === Infinity) {
      // Show all entries
      return searchQuery
        ? filteredEntries
        : adminCourse.slice((currentPage - 1) * entriesPerPage);
    }

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);

    return searchQuery
      ? filteredEntries.slice(startIndex, endIndex)
      : adminCourse.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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

  const [deleteAdminCourse] = useDeleteCourseMutation();
  const handleDelete = async (id) => {
    try {
      const res = await deleteAdminCourse(id);
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const [updateCourseImage] = useUpdateCourseImageMutation();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event, id) => {
    setSelectedFile(event.target.files[0]);
    handleImage(id);
  };

  const handleImage = async (id) => {
    try {
      const formData = new FormData();
      formData.append("courseImage", selectedFile);
      formData.append("id", id);

      const response = await updateCourseImage(formData);

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Failed to update profile image.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating profile image.");
    }
  };

  return (
    <>
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
                        style={{ display: "block", margin: "0 auto" }} 
                      />
                      <p>No data available.</p>
                    </div>
                  ) : (<>
                  <div style={{ margin: "12px" }} className="flex">
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
                        //   className="py-2"
                        style={{
                          border: "none",
                          outline: "none",
                          boxShadow: "none",
                          width: "300px",
                        }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search...."
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

                        <th scope="col" className=" table-th ">
                          Course Name
                        </th>

                        <th scope="col" className=" table-th ">
                          Course Title
                        </th>

                        <th scope="col" className=" table-th ">
                          Course Teacher
                        </th>

                        <th scope="col" className=" table-th ">
                          Course Type
                        </th>

                        <th scope="col" className=" table-th ">
                          Course Image
                        </th>

                        <th scope="col" className=" table-th ">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                      {getCurrentPageEntries().map((item, index) => (
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
                          <td
                            className="table-td cursor-pointer"
                            onClick={() => handleClick(item.id)}
                          >
                            <span
                              style={{
                                color: "#000",
                                fontWeight: 500,
                              }}
                            >
                              {item.courseName}
                            </span>
                          </td>

                          <td className="table-td">
                            <div className="table-data">{item.courseTitle}</div>
                          </td>
                          <td className="table-td ">{item.courseTeacher}</td>
                          <td className="table-td ">{item.courseType}</td>
                          <td
                            className="table-td cursor-pointer "
                          
                          >
                            <div style={{ display: "flex" }}>
                            <div   onClick={() =>
                              handleImageClick(item.courseImage_FileName)
                            }>
                            {item.courseImage_Name}
                            </div>
                             
                              <div style={{ marginLeft: "5px" }}>
                                <label htmlFor={`fileInput-${item.id}`}>
                                  <Edit size={18} />
                                </label>
                                <input
                                  id={`fileInput-${item.id}`}
                                  type="file"
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  onClick={(e) => e.stopPropagation()}
                                  onChange={(e) => handleFileChange(e, item.id)}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="table-td cursor-pointer ">
                            <div style={{ display: "flex" }}>
                              <Link to={`${item.id}`}>
                                <Edit size={22} />
                              </Link>
                              &nbsp;
                              <Trash2
                                size={22}
                                color="red"
                                onClick={() => handleDelete(item.id)}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}

                      <Dialog
                        open={openPopup}
                        onClose={() => setOpenPopup(false)}
                      >
                        <DialogContent>
                          <img
                            src={`${localHost}/courseImage/${selectedImage}`}
                            alt="document"
                            style={{ width: "100%", height: "auto" }}
                          />
                        </DialogContent>
                      </Dialog>
                    </tbody>
                  </table>
                  <div
                    className="flex flex-col p-6"
                    style={{
                      backgroundColor: "rgba(236, 110, 70, 0.2)",
                    }}
                  >
                    <div className="card-text h-full flex flex-wrap items-center justify-between">
                      <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                        <span>Entries per page:</span>
                        <select
                          value={entriesPerPage}
                          onChange={(e) => {
                            setEntriesPerPage(Number(e.target.value));
                            setCurrentPage(1);
                          }}
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value={Infinity}>All</option>
                        </select>
                      </div>

                      <div>
                        <ul className="list-none">
                          <li className="inline-block">
                            <button
                              onClick={() => handlePageChange(currentPage - 1)}
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
                              length: Math.ceil(totalEntries / entriesPerPage),
                            },
                            (_, index) => index + 1
                          ).map((page) => (
                            <li key={page} className="inline-block">
                              <button
                                onClick={() => handlePageChange(page)}
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
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={
                                currentPage ===
                                Math.ceil(totalEntries / entriesPerPage)
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
                  </>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showLesson && (
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
                      label="Add Lesson"
                      style={{ color: value === 0 ? "#EC6E46" : "#000" }}
                    />
                    <Tab
                      label="Lesson"
                      style={{ color: value === 1 ? "#EC6E46" : "#000" }}
                    />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <AddLesson adminCourseId={adminCourseId} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <GetLesson adminCourseId={adminCourseId} />
                </TabPanel>
              </>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default GetCourse;
