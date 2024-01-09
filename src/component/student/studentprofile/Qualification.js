import React, { useState, useEffect } from "react";
import { Trash2 } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Dialog, DialogContent } from "@mui/material";
import noRecord from "../../../assets/no-record-found.png";
import { useDeleteCourseDocumentMutation, useGetStudentCourseByIdQuery } from "../../../services/SignUpApi";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const Qualification = (props) => {

    // const localHost = "http://localhost:5000";
    const localHost="https://global-education-t.onrender.com"

  const UID = props.UID;
  const [currentData, setCurrentData] = useState([]);
  const [highSchoolData, setHighSchoolData] = useState([]);
  const [interData, setInterData] = useState([]);
  const [graduationData, setGraduationData] = useState([]);
  const [postGraduationData, setPostGraduationData] = useState([]);

  const [openPopup, setOpenPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [openPdf, setOpenPdf] = useState("");
  const [openFileType, setOpenFileType] = useState("");

  const [highPopup, setHighPopup] = useState(false);
  const [highImage, setHighImage] = useState("");
  const [highPdf, setHighPdf] = useState("");
  const [highFileType, setHighFileType] = useState("");

  const [interPopup, setInterPopup] = useState(false);
  const [interImage, setInterImage] = useState("");
  const [selectedPdf, setSelectedPdf] = useState("");
  const [selectedFileType, setSelectedFileType] = useState("");

  const [graduationPopup, setGraduationPopup] = useState(false);
  const [graduationImage, setGraduationImage] = useState("");
  const [graduationPdf, setGraduationPdf] = useState("");
  const [graduationFileType, setGraduationFileType] = useState("");

  const [postGraduationPopup, setPostGraduationPopup] = useState(false);
  const [postGraduationImage, setPostGraduationImage] = useState("");
  const [postGraduationPdf, setPostGraduationPdf] = useState("");
  const [postGraduationFileType, setPostGraduationFileType] = useState("");

  const { data, isSuccess } = useGetStudentCourseByIdQuery(UID);

  // console.log(courseData);

  useEffect(() => {
    if (data && isSuccess && data.data.length > 0) {
      const currentCourse = data.data.find((item) => item.onGoing === true);
      const highSchoolCourse = data.data.find(
        (item) => item.courseLevel === "High School" && item.onGoing === false
      );
      const interCourse = data.data.find(
        (item) => item.courseLevel === "Intermediate" && item.onGoing === false
      );
      const graduationCourse = data.data.find(
        (item) => item.courseLevel === "Graduation" && item.onGoing === false
      );
      const postGraduationCourse = data.data.find(
        (item) =>
          item.courseLevel === "Post Graduation" && item.onGoing === false
      );
      setCurrentData(currentCourse ? [currentCourse] : []);
      setHighSchoolData(highSchoolCourse ? [highSchoolCourse] : []);
      setInterData(interCourse ? [interCourse] : []);
      setGraduationData(graduationCourse ? [graduationCourse] : []);
      setPostGraduationData(postGraduationCourse ? [postGraduationCourse] : []);
    }
  }, [data, isSuccess]);

  const handleImageClick = (fileName) => {
    const extension = fileName.split(".").pop();
    setOpenPdf(null);
    setSelectedImage(null);

    if (extension === "pdf") {
      setOpenPdf(fileName);
      setOpenFileType("pdf");
    } else {
      setSelectedImage(fileName);
      setOpenFileType("image");
    }

    setOpenPopup(true);
  };

  const handleInterImageClick = (fileName) => {
    const extension = fileName.split(".").pop();
    setSelectedPdf(null);
    setSelectedImage(null);

    if (extension === "pdf") {
      setSelectedPdf(fileName);
      setSelectedFileType("pdf");
    } else {
      setInterImage(fileName);
      setSelectedFileType("image");
    }

    setInterPopup(true);
  };

  const handleHighImageClick = (fileName) => {
    const extension = fileName.split(".").pop();
    setHighPdf(null);
    setHighImage(null);

    if (extension === "pdf") {
      setHighPdf(fileName);
      setHighFileType("pdf");
    } else {
      setHighImage(fileName);
      setHighFileType("image");
    }

    setHighPopup(true);
  };

  const handleGraduationImageClick = (fileName) => {
    const extension = fileName.split(".").pop();
    setGraduationPdf(null);
    setGraduationImage(null);

    if (extension === "pdf") {
      setGraduationPdf(fileName);
      setGraduationFileType("pdf");
    } else {
      setGraduationImage(fileName);
      setGraduationFileType("image");
    }

    setGraduationPopup(true);
  };

  const handlePostGraduationImageClick = (fileName) => {
    const extension = fileName.split(".").pop();
    setPostGraduationPdf(null);
    setPostGraduationImage(null);

    if (extension === "pdf") {
      setPostGraduationPdf(fileName);
      setPostGraduationFileType("pdf");
    } else {
      setPostGraduationImage(fileName);
      setPostGraduationFileType("image");
    }

    setPostGraduationPopup(true);
  };

  function getYearFromDate(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    return year;
  }

  const [deleteCourseDocument]=useDeleteCourseDocumentMutation();

  const deleteDocument = async (documentId) => {
    try {
      const res = await deleteCourseDocument(documentId);
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const deleteHighDocument = async (documentId) => {
    try {
      const res = await deleteCourseDocument(documentId);
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const deleteInterDocument = async (documentId) => {
    try {
      const res = await deleteCourseDocument(documentId);
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const deleteGraduationDocument = async (documentId) => {
    try {
      const res = await deleteCourseDocument(documentId);
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const deletePostGraduationDocument = async (documentId) => {
    try {
      const res = await deleteCourseDocument(documentId);
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
          {data && currentData && currentData.length >0 ? (
            currentData?.map((item, index) => (
              <>
                <header className=" card-header noborder">
                  <div className="flex">
                    <h4 className="card-title" style={{ fontSize: "16px" }}>
                      {item.courseLevel}
                      <div
                        className="text-slate-500 dark:text-slate-400 text-base"
                        style={{ fontSize: "14px" }}
                      >
                        ({getYearFromDate(item.endDate)})
                      </div>
                    </h4>{" "}
                    &nbsp;
                    <div
                      className="inline-block px-3 min-w-[30px] text-center  py-1 rounded-[999px] bg-opacity-25 text-warning-500
        bg-warning-500"
                      style={{ height: "27px" }}
                    >
                      85.68%
                    </div>
                  </div>
                </header>

                <div className=" px-6 pb-6">
                  <div className="overflow-x-auto -mx-6 dashcode-data-table">
                    <span className=" col-span-8  "></span>
                    <span className="  col-span-4 "></span>
                    <div className="inline-block min-w-full align-middle">
                      <div className="overflow-hidden ">
                        <table
                          className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                          id="data-table"
                        >
                          <thead className=" border-t border-slate-100 dark:border-slate-800 ">
                            <tr>
                              <th
                                scope="col"
                                className=" table-th "
                                style={{ color: "#000" }}
                              >
                                Board Name
                              </th>
                              <th
                                scope="col"
                                className=" table-th "
                                style={{ color: "#000" }}
                              >
                                School / College Name
                              </th>

                              <th
                                scope="col"
                                className=" table-th "
                                style={{ color: "#000" }}
                              >
                                Course Duration
                              </th>
                              <th
                                scope="col"
                                className=" table-th "
                                style={{ color: "#000" }}
                              >
                                Duration Type
                              </th>
                              <th
                                scope="col"
                                className=" table-th "
                                style={{ color: "#000" }}
                              >
                                Course Type
                              </th>
                              <th
                                scope="col"
                                className=" table-th "
                                style={{ color: "#000" }}
                              >
                                Certificate / Marksheet
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                            <tr key={item.id}>
                              <td className="table-td ">
                                {item.boardOrUniversityName}
                              </td>

                              <td className="table-td ">
                                {item.schoolOrCollageName}
                              </td>

                              <td className="table-td ">
                                {item.courseDuration}
                              </td>
                              <td className="table-td ">{item.durationType}</td>
                              <td className="table-td ">{item.courseType}</td>
                              <td className="table-td cursor-pointer">
                                {item.document &&
                                  item.document.map((doc, docIndex) => (
                                    <div
                                      className="flex"
                                      key={docIndex}
                                      onClick={() =>
                                        handleImageClick(doc?.document_FileName)
                                      }
                                    >
                                      <Trash2
                                        size={18}
                                        color="red"
                                        onClick={() => deleteDocument(doc.id)}
                                      />{" "}
                                      &nbsp;{doc.document_Name}
                                    </div>
                                  ))}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )))
            : (
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
          )}
        </div>
      </div>

      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogContent>
          {openFileType === "pdf" && openPdf && (
            <Document
              file={`${localHost}/studentFile/${openPdf}`}
              options={{ workerSrc: pdfjs.GlobalWorkerOptions.workerSrc }}
            >
              <Page pageNumber={1} />
            </Document>
          )}
          {openFileType === "image" && selectedImage && (
            <img
              src={`${localHost}/studentFile/${selectedImage}`}
              alt="document"
              style={{ width: "100%", height: "auto" }}
            />
          )}
          {!openFileType && <div>No file selected.</div>}
        </DialogContent>
      </Dialog>
      {/* HighSchool Start */}
      {highSchoolData && highSchoolData.length > 0 ? (
        <div className=" space-y-5 mt-5">
          <div className="card">
            {data &&
              highSchoolData?.map((item, index) => (
                <>
                  <header className=" card-header noborder">
                    <div className="flex">
                      <h4 className="card-title" style={{ fontSize: "16px" }}>
                        {item?.courseLevel}
                        <div
                          className="text-slate-500 dark:text-slate-400 text-base"
                          style={{ fontSize: "14px" }}
                        >
                          ({getYearFromDate(item.endDate)})
                        </div>
                      </h4>
                      &nbsp;
                      <div
                        className="inline-block px-3 min-w-[30px] text-center  py-1 rounded-[999px] bg-opacity-25 text-warning-500
        bg-warning-500"
                        style={{ height: "27px" }}
                      >
                        85.68%
                      </div>
                    </div>
                  </header>

                  <div className=" px-6 pb-6">
                    <div className="overflow-x-auto -mx-6 dashcode-data-table">
                      <span className=" col-span-8  "></span>
                      <span className="  col-span-4 "></span>
                      <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                          <table
                            className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                            id="data-table"
                          >
                            <thead className=" border-t border-slate-100 dark:border-slate-800 ">
                              <tr>
                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  Board Name
                                </th>
                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  School / College Name
                                </th>

                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  Course Duration
                                </th>
                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  Duration Type
                                </th>
                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  Course Type
                                </th>
                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  Certificate / Marksheet
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                              <tr key={item?.id}>
                                <td className="table-td ">
                                  {item?.boardOrUniversityName}
                                </td>

                                <td className="table-td ">
                                  {item?.schoolOrCollageName}
                                </td>

                                <td className="table-td ">
                                  {item?.courseDuration}
                                </td>
                                <td className="table-td ">
                                  {item?.durationType}
                                </td>
                                <td className="table-td ">
                                  {item?.courseType}
                                </td>
                                <td className="table-td cursor-pointer">
                                  {item?.document &&
                                    item?.document?.map((doc, docIndex) => (
                                      <div
                                        className="flex"
                                        key={docIndex}
                                        onClick={() =>
                                          handleHighImageClick(
                                            doc?.document_FileName
                                          )
                                        }
                                      >
                                        <Trash2
                                          size={18}
                                          color="red"
                                          onClick={() =>
                                            deleteHighDocument(doc.id)
                                          }
                                        />{" "}
                                        &nbsp; {doc.document_Name}
                                      </div>
                                    ))}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      ) : null}
      <Dialog open={highPopup} onClose={() => setHighPopup(false)}>
        <DialogContent>
          {highFileType === "pdf" && highPdf && (
            <Document
              file={`${localHost}/studentFile/${highPdf}`}
              options={{ workerSrc: pdfjs.GlobalWorkerOptions.workerSrc }}
            >
              <Page pageNumber={1} />
            </Document>
          )}
          {highFileType === "image" && highImage && (
            <img
              src={`${localHost}/studentFile/${highImage}`}
              alt="document"
              style={{ width: "100%", height: "auto" }}
            />
          )}
          {!highFileType && <div>No file selected.</div>}
        </DialogContent>
      </Dialog>

      {/* HighSchool End */}

      {/* Intermediate Start */}
      {interData && interData.length > 0 ? (
        <div className=" space-y-5 mt-5">
          <div className="card">
            {data &&
              interData?.map((item, index) => (
                <>
                  <header className=" card-header noborder">
                    <div className="flex">
                      <h4 className="card-title" style={{ fontSize: "16px" }}>
                        {item.courseLevel}
                        <div
                          className="text-slate-500 dark:text-slate-400 text-base"
                          style={{ fontSize: "14px" }}
                        >
                          ({getYearFromDate(item.endDate)})
                        </div>
                      </h4>{" "}
                      &nbsp;
                      <div
                        className="inline-block px-3 min-w-[30px] text-center  py-1 rounded-[999px] bg-opacity-25 text-warning-500
        bg-warning-500"
                        style={{ height: "27px" }}
                      >
                        85.68%
                      </div>
                    </div>
                  </header>

                  <div className=" px-6 pb-6">
                    <div className="overflow-x-auto -mx-6 dashcode-data-table">
                      <span className=" col-span-8  "></span>
                      <span className="  col-span-4 "></span>
                      <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                          <table
                            className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                            id="data-table"
                          >
                            <thead className=" border-t border-slate-100 dark:border-slate-800 ">
                              <tr>
                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  Board Name
                                </th>
                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  School / College Name
                                </th>

                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  Course Duration
                                </th>
                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  Duration Type
                                </th>
                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  Course Type
                                </th>
                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  Certificate / Marksheet
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                              <tr key={item?.id}>
                                <td className="table-td ">
                                  {item?.boardOrUniversityName}
                                </td>

                                <td className="table-td ">
                                  {item?.schoolOrCollageName}
                                </td>

                                <td className="table-td ">
                                  {item?.courseDuration}
                                </td>
                                <td className="table-td ">
                                  {item?.durationType}
                                </td>
                                <td className="table-td ">
                                  {item?.courseType}
                                </td>
                                <td className="table-td cursor-pointer">
                                  {item?.document &&
                                    item?.document?.map((doc, docIndex) => (
                                      <div
                                        className="flex"
                                        key={docIndex}
                                        onClick={() =>
                                          handleInterImageClick(
                                            doc?.document_FileName
                                          )
                                        }
                                      >
                                        <Trash2
                                          size={18}
                                          color="red"
                                          onClick={() =>
                                            deleteInterDocument(doc.id)
                                          }
                                        />{" "}
                                        &nbsp;{doc.document_Name}
                                      </div>
                                    ))}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      ) : null}
      <Dialog open={interPopup} onClose={() => setInterPopup(false)}>
        <DialogContent>
          {selectedFileType === "pdf" && selectedPdf && (
            <Document
              file={`${localHost}/studentFile/${selectedPdf}`}
              options={{ workerSrc: pdfjs.GlobalWorkerOptions.workerSrc }}
            >
              <Page pageNumber={1} />
            </Document>
          )}
          {selectedFileType === "image" && interImage && (
            <img
              src={`${localHost}/studentFile/${interImage}`}
              alt="document"
              style={{ width: "100%", height: "auto" }}
            />
          )}
          {!selectedFileType && <div>No file selected.</div>}
        </DialogContent>
      </Dialog>
      {/* Intermediate End */}

      {/* Graduation Start */}
      {graduationData && graduationData.length > 0 ? (
        <div className=" space-y-5 mt-5">
          <div className="card">
            {data &&
              graduationData?.map((item, index) => (
                <>
                  <header className=" card-header noborder">
                    <div className="flex">
                      <h4 className="card-title" style={{ fontSize: "16px" }}>
                        {item.courseLevel}
                        <div
                          className="text-slate-500 dark:text-slate-400 text-base"
                          style={{ fontSize: "14px" }}
                        >
                          ({getYearFromDate(item.endDate)})
                        </div>
                      </h4>
                      &nbsp;
                      <div
                        className="inline-block px-3 min-w-[30px] text-center  py-1 rounded-[999px] bg-opacity-25 text-warning-500
        bg-warning-500"
                        style={{ height: "27px" }}
                      >
                        85.68%
                      </div>
                    </div>
                  </header>

                  <div className=" px-6 pb-6">
                    <div className="overflow-x-auto -mx-6 dashcode-data-table">
                      <span className=" col-span-8  "></span>
                      <span className="  col-span-4 "></span>
                      <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                          <table
                            className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                            id="data-table"
                          >
                            <thead className=" border-t border-slate-100 dark:border-slate-800 ">
                              <tr>
                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  Board Name
                                </th>
                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  School / College Name
                                </th>

                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  Course Duration
                                </th>
                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  Duration Type
                                </th>
                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  Course Type
                                </th>
                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  Certificate / Marksheet
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                              <tr key={item?.id}>
                                <td className="table-td ">
                                  {item?.boardOrUniversityName}
                                </td>

                                <td className="table-td ">
                                  {item?.schoolOrCollageName}
                                </td>

                                <td className="table-td ">
                                  {item?.courseDuration}
                                </td>
                                <td className="table-td ">
                                  {item?.durationType}
                                </td>
                                <td className="table-td ">
                                  {item?.courseType}
                                </td>
                                <td className="table-td cursor-pointer">
                                  {item?.document &&
                                    item?.document?.map((doc, docIndex) => (
                                      <div
                                        className="flex"
                                        key={docIndex}
                                        onClick={() =>
                                          handleGraduationImageClick(
                                            doc?.document_FileName
                                          )
                                        }
                                      >
                                        <Trash2
                                          size={18}
                                          color="red"
                                          onClick={() =>
                                            deleteGraduationDocument(doc.id)
                                          }
                                        />{" "}
                                        &nbsp; {doc.document_Name}
                                      </div>
                                    ))}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      ) : null}
      <Dialog open={graduationPopup} onClose={() => setGraduationPopup(false)}>
        <DialogContent>
          {graduationFileType === "pdf" && graduationPdf && (
            <Document
              file={`${localHost}/studentFile/${graduationPdf}`}
              options={{ workerSrc: pdfjs.GlobalWorkerOptions.workerSrc }}
            >
              <Page pageNumber={1} />
            </Document>
          )}
          {graduationFileType === "image" && graduationImage && (
            <img
              src={`${localHost}/studentFile/${graduationImage}`}
              alt="document"
              style={{ width: "100%", height: "auto" }}
            />
          )}
          {!graduationFileType && <div>No file selected.</div>}
        </DialogContent>
      </Dialog>
      {/* Graduation End */}

      {/* PostGraduation Start */}
      {postGraduationData && postGraduationData.length > 0 ? (
        <div className=" space-y-5 mt-5">
          <div className="card">
            {data &&
              postGraduationData?.map((item, index) => (
                <>
                  <header className=" card-header noborder">
                    <div className="flex">
                      <h4 className="card-title" style={{ fontSize: "16px" }}>
                        {item.courseLevel}
                        <div
                          className="text-slate-500 dark:text-slate-400 text-base"
                          style={{ fontSize: "14px" }}
                        >
                          ({getYearFromDate(item.endDate)})
                        </div>
                      </h4>
                      &nbsp;
                      <div
                        className="inline-block px-3 min-w-[30px] text-center  py-1 rounded-[999px] bg-opacity-25 text-warning-500
        bg-warning-500"
                        style={{ height: "27px" }}
                      >
                        85.68%
                      </div>
                    </div>
                  </header>

                  <div className=" px-6 pb-6">
                    <div className="overflow-x-auto -mx-6 dashcode-data-table">
                      <span className=" col-span-8  "></span>
                      <span className="  col-span-4 "></span>
                      <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                          <table
                            className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                            id="data-table"
                          >
                            <thead className=" border-t border-slate-100 dark:border-slate-800 ">
                              <tr>
                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  Board Name
                                </th>
                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  School / College Name
                                </th>

                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  Course Duration
                                </th>
                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  Duration Type
                                </th>
                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  Course Type
                                </th>
                                <th
                                  scope="col"
                                  className=" table-th "
                                  style={{ color: "#000" }}
                                >
                                  Certificate / Marksheet
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                              <tr key={item?.id}>
                                <td className="table-td ">
                                  {item?.boardOrUniversityName}
                                </td>

                                <td className="table-td ">
                                  {item?.schoolOrCollageName}
                                </td>

                                <td className="table-td ">
                                  {item?.courseDuration}
                                </td>
                                <td className="table-td ">
                                  {item?.durationType}
                                </td>
                                <td className="table-td ">
                                  {item?.courseType}
                                </td>
                                <td className="table-td cursor-pointer">
                                  {item?.document &&
                                    item?.document?.map((doc, docIndex) => (
                                      <div
                                        className="flex"
                                        key={docIndex}
                                        onClick={() =>
                                          handlePostGraduationImageClick(
                                            doc?.document_FileName
                                          )
                                        }
                                      >
                                        <Trash2
                                          size={18}
                                          color="red"
                                          onClick={() =>
                                            deletePostGraduationDocument(doc.id)
                                          }
                                        />{" "}
                                        &nbsp; {doc.document_Name}
                                      </div>
                                    ))}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      ) : null}

      <Dialog
        open={postGraduationPopup}
        onClose={() => setPostGraduationPopup(false)}
      >
        <DialogContent>
          {postGraduationFileType === "pdf" && postGraduationPdf && (
            <Document
              file={`${localHost}/studentFile/${postGraduationPdf}`}
              options={{ workerSrc: pdfjs.GlobalWorkerOptions.workerSrc }}
            >
              <Page pageNumber={1} />
            </Document>
          )}
          {postGraduationFileType === "image" && postGraduationImage && (
            <img
              src={`${localHost}/studentFile/${postGraduationImage}`}
              alt="document"
              style={{ width: "100%", height: "auto" }}
            />
          )}
          {!postGraduationFileType && <div>No file selected.</div>}
        </DialogContent>
      </Dialog>
      {/* PostGraduation End */}
      <ToastContainer />
    </>
  );
};

export default Qualification;
