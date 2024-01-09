import React, { useState, useEffect } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2, Edit } from "react-feather";
import noRecord from "../../../assets/no-record-found.png";
import {
  useDeleteLessonMutation,
  useGetLessonQuery,
} from "../../../services/SignUpApi";

const GetLesson = (props) => {
  const adminCourseId = props.adminCourseId;

  const [lesson, setLesson] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(5); // Default value
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(lesson?.length);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEntries, setFilteredEntries] = useState([]);

  const { data, isSuccess } = useGetLessonQuery(adminCourseId);
  // console.log(data);
  useEffect(() => {
    if (data && isSuccess && data.data) setLesson(data.data);
  }, [data, isSuccess]);

  useEffect(() => {
    const filteredData = lesson?.filter((entry) => {
      const link = entry.videoLink || "";

      return link.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredEntries(filteredData);
    setTotalEntries(filteredData?.length || 0);
    setCurrentPage(1);
  }, [searchQuery, lesson]);

  const getCurrentPageEntries = () => {
    if (entriesPerPage === Infinity) {
      // Show all entries
      return searchQuery
        ? filteredEntries
        : lesson.slice((currentPage - 1) * entriesPerPage);
    }

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);

    return searchQuery
      ? filteredEntries.slice(startIndex, endIndex)
      : lesson.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate the start and end index of the entries to display on the current page
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);

  const [deleteAdminLesson] = useDeleteLessonMutation();

  const handleDelete = async (id) => {
    try {
      const res = await deleteAdminLesson(id);
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };



  return (
    <>
      <div className=" space-y-5">
        <div className="card">
          <div className="card-body ">
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
                      style={{ width: "20px", height: "20px" }}
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
                      <SearchIcon style={{ margin: "8px", color: "#EC6E46" }} />
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
                          <div className="checkbox-area">
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="hidden"
                                name="checkbox"
                              />
                              <span className="h-4 w-4 border flex-none border-slate-100 dark:border-slate-800 rounded inline-flex ltr:mr-3 rtl:ml-3 relative transition-all duration-150 bg-slate-100 dark:bg-slate-900"></span>
                            </label>
                          </div>
                        </th>

                        <th scope="col" className=" table-th ">
                          Video Link
                        </th>

                        <th scope="col" className=" table-th ">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                      {getCurrentPageEntries().map((data) => {
                        const id = data.id;

                        return (
                          <tr key={id}>
                            <td className="table-td">
                              <div className="checkbox-area">
                                <label className="inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="hidden"
                                    name="checkbox"
                                  />
                                  <span className="h-4 w-4 border flex-none border-slate-100 dark:border-slate-800 rounded inline-flex ltr:mr-3 rtl:ml-3 relative transition-all duration-150 bg-slate-100 dark:bg-slate-900"></span>
                                </label>
                              </div>
                            </td>

                            <td className="table-td">
                              <span
                                style={{
                                  color: "#000",
                                  fontWeight: 500,
                                }}
                              >
                                {data.videoLink}
                              </span>
                            </td>

                            <td className="table-td">
                              <div
                                style={{ display: "flex", cursor: "pointer" }}
                              >
                                <Link to={`lesson/${data.id}`}>
                                  <Edit size={22} />
                                </Link>{" "}
                                &nbsp;
                                <Trash2
                                  size={22}
                                  color="red"
                                  onClick={() => handleDelete(data.id)}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
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
      <ToastContainer />
    </>
  );
};

export default GetLesson;
