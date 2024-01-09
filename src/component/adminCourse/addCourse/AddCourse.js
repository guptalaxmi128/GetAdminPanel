import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAddCourseMutation } from "../../../services/SignUpApi";

const AddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseType, setCourseType] = useState("default");
  const [courseTeacher, setCourseTeacher] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [price, setPrice] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setCourseImage([file]);
    }
  };
  const handleCourseType = (event) => {
    setCourseType(event.target.value);
  };

  const [addAdminCourse] = useAddCourseMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !courseName ||
      !courseTitle ||
      !courseType ||
      !courseTeacher ||
      !courseImage ||
      !price
    ) {
      toast.error("Please fill in all fields.");

      return;
    }

    const formData = new FormData();
    {
      formData.append("courseName", courseName);
      formData.append("courseTitle", courseTitle);
      formData.append("courseType", courseType);
      formData.append("courseTeacher", courseTeacher);
      formData.append("courseImage", courseImage[0]);
      formData.append("price", price);
    }

    console.log(formData);
    const res = await addAdminCourse(formData);
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

    setCourseImage(null);
  };

  return (
    <>
      <div className="card-text h-full">
        <form className="space-y-4" id="multipleValidation">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="input-area">
              <label htmlFor="course_name" className="form-label">
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
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
            </div>
            <div className="input-area">
              <label htmlFor="course_teacher" className="form-label">
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
                  onChange={(e) => setCourseTeacher(e.target.value)}
                />
              </div>
            </div>
            <div className="input-area">
              <label htmlFor="course_title" className="form-label">
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
                  onChange={(e) => setCourseTitle(e.target.value)}
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
              <label htmlFor="coursetype" className="form-label">
                Course Type
              </label>
              <select
                id="coursetype"
                className="form-control"
                value={courseType}
                onChange={handleCourseType}
                style={{ fontSize: "12px" }}
              >
                <option value="default" className="dark:bg-slate-700" selected>
                  Select Course Type
                </option>
                <option value="Certification" className="dark:bg-slate-700">
                  Certification
                </option>
                <option value="Diploma" className="dark:bg-slate-700">
                  Diploma
                </option>
                <option value="Degree" className="dark:bg-slate-700">
                  Degree
                </option>
              </select>
            </div>
            <div className="input-area relative">
              <label htmlFor="fileInput" className="form-label">
                Course Image
              </label>
              <input
                style={{ fontSize: "12px" }}
                type="file"
                id="fileInput"
                className="form-control"
                accept="image/*"
                onChange={handleFileChange}
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
      <ToastContainer />
    </>
  );
};

export default AddCourse;
