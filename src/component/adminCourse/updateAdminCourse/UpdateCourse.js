import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Search, Menu } from "react-feather";
import { useParams } from "react-router-dom";
import Sidebar from "../../sidebar/Sidebar";
import logo from "../../../assets/images/logo.png";
import AdminNotification from "../../adminNotification/AdminNotification";
import { useUpdateCourseMutation } from "../../../services/SignUpApi";

const UpdateCourse = () => {
  const { id } = useParams();
  console.log(id)
  const [courseName, setCourseName] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseType, setCourseType] = useState("default");
  const [courseTeacher, setCourseTeacher] = useState("");

  const [price, setPrice] = useState("");

  const handleCourseType = (event) => {
    setCourseType(event.target.value);
  };
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const [updateAdminCourse] = useUpdateCourseMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !courseName ||
      !courseTitle ||
      !courseType ||
      !courseTeacher ||
      !price
    ) {
      toast.error("Please fill in all fields.");

      return;
    }

    const formData = {
      courseName,
      courseTitle,
      courseType,
      courseTeacher,
      price,
      id,
    };

    console.log(formData);
    const res = await updateAdminCourse(formData);
    console.log(res);
    if (res.data.success) {
      toast.success(res.data.message);

      clearTextInput();
    }
  };

  const clearTextInput = () => {
    setCourseName("");
    setCourseType("default");
    setPrice("");
    setCourseTitle("");
    setCourseTeacher("");
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
                    <header className="flex mb-5 items-center border-b border-slate-100 dark:border-slate-700 pb-5 -mx-6 px-6">
                      <div className="flex-1">
                        <div className="card-title text-slate-900 dark:text-white">
                          Update Course
                        </div>
                      </div>
                    </header>
                    <div>
                      <div className="card-text h-full">
                        <form className="space-y-4" id="multipleValidation">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="input-area">
                              <label
                                htmlFor="course_name"
                                className="form-label"
                              >
                                Course Name
                              </label>
                              <div className="relative">
                                <input
                                  style={{ fontSize: "12px" }}
                                  id="course_name"
                                  type="text"
                                  name="course_name"
                                  className="form-control"
                                  placeholder="Course Name"
                                  value={courseName}
                                  onChange={(e) =>
                                    setCourseName(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="input-area">
                              <label
                                htmlFor="course_teacher"
                                className="form-label"
                              >
                                Course Teacher
                              </label>
                              <div className="relative">
                                <input
                                  style={{ fontSize: "12px" }}
                                  id="course_teacher"
                                  type="text"
                                  name="course_teacher"
                                  className="form-control"
                                  placeholder="Course Teacher"
                                  value={courseTeacher}
                                  onChange={(e) =>
                                    setCourseTeacher(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="input-area">
                              <label
                                htmlFor="course_title"
                                className="form-label"
                              >
                                Course Title
                              </label>
                              <div className="relative">
                                <input
                                  style={{ fontSize: "12px" }}
                                  id="course_title"
                                  type="text"
                                  name="course_title"
                                  className="form-control"
                                  placeholder="Course Title"
                                  value={courseTitle}
                                  onChange={(e) =>
                                    setCourseTitle(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="input-area">
                              <label htmlFor="price" className="form-label">
                                Price
                              </label>
                              <div className="relative">
                                <input
                                  style={{ fontSize: "12px" }}
                                  id="price"
                                  type="text"
                                  name="price"
                                  className="form-control"
                                  placeholder="Price"
                                  value={price}
                                  onChange={(e) => setPrice(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="input-area">
                              <label
                                htmlFor="coursetype"
                                className="form-label"
                              >
                                Course Type
                              </label>
                              <select
                                id="coursetype"
                                className="form-control"
                                value={courseType}
                                onChange={handleCourseType}
                                style={{ fontSize: "12px" }}
                              >
                                <option
                                  value="default"
                                  className="dark:bg-slate-700"
                                  selected
                                >
                                  Select Course Type
                                </option>
                                <option
                                  value="Certification"
                                  className="dark:bg-slate-700"
                                >
                                  Certification
                                </option>
                                <option
                                  value="Diploma"
                                  className="dark:bg-slate-700"
                                >
                                  Diploma
                                </option>
                                <option
                                  value="Degree"
                                  className="dark:bg-slate-700"
                                >
                                  Degree
                                </option>
                              </select>
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

      <ToastContainer />
    </>
  );
};

export default UpdateCourse;
