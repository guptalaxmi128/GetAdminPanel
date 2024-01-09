import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useDeletePreviousAccountMutation,
  useGetStudentAccountByIdQuery,
} from "../../../services/SignUpApi";
import { Trash2 } from "react-feather";
import noRecord from "../../../assets/no-record-found.png";

const Account = (props) => {
  const UID = props.UID;
  // const localHost = "http://localhost:5000";
  const localHost = "https://global-education-t.onrender.com";
  const [account, setAccount] = useState([]);

  const [selectedImage, setSelectedImage] = useState("");
  const [openPopup, setOpenPopup] = useState(false);

  const { data, isSuccess } = useGetStudentAccountByIdQuery(UID);
  useEffect(() => {
    if (data && isSuccess) {
      setAccount([data.data]);
    }
  }, [data, isSuccess]);

  const handleImageClick = (fileName) => {
    setSelectedImage(fileName);
    setOpenPopup(true);
  };

  const [deletePreviousAccount] = useDeletePreviousAccountMutation();

  const deleteDocument = async (id) => {
    try {
      const res = await deletePreviousAccount(id);
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
          {data && account && account.length > 0 ? (
            account?.map((item, index) => (
              <>
                <header className=" card-header noborder">
                  <div className="flex">
                    <h4 className="card-title" style={{ fontSize: "16px" }}>
                      Account
                    </h4>
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
                                Account Name
                              </th>
                              <th
                                scope="col"
                                className=" table-th "
                                style={{ color: "#000" }}
                              >
                                Account Number
                              </th>

                              <th
                                scope="col"
                                className=" table-th "
                                style={{ color: "#000" }}
                              >
                                Branch
                              </th>
                              <th
                                scope="col"
                                className=" table-th "
                                style={{ color: "#000" }}
                              >
                                IFSC Code
                              </th>
                              <th
                                scope="col"
                                className=" table-th "
                                style={{ color: "#000" }}
                              >
                                UPI Id
                              </th>
                              <th
                                scope="col"
                                className=" table-th "
                                style={{ color: "#000" }}
                              >
                                QR Code
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                            <tr key={item.id}>
                              <td className="table-td ">
                                {item && item.accountName
                                  ? item.accountName
                                  : "-"}
                              </td>

                              <td className="table-td ">
                                {item && item.accountNumber
                                  ? item.accountNumber
                                  : "-"}
                              </td>

                              <td className="table-td ">
                                {item && item.branch ? item.branch : "-"}
                              </td>
                              <td className="table-td ">
                                {item && item.IFSCCode ? item.IFSCCode : "-"}
                              </td>
                              <td className="table-td ">
                                {item && item.UPIId ? item.UPIId : "-"}
                              </td>
                              <td
                                className="table-td cursor-pointer"
                                onClick={() =>
                                  handleImageClick(item.UPIQRCode_FileName)
                                }
                              >
                                {item && item.UPIQRCode_Name
                                  ? item.UPIQRCode_Name
                                  : "-"}
                              </td>
                            </tr>
                            <Dialog
                              open={openPopup}
                              onClose={() => setOpenPopup(false)}
                            >
                              <DialogContent>
                                <img
                                  src={`${localHost}/studentFile/${selectedImage}`}
                                  alt="document"
                                  style={{ width: "100%", height: "auto" }}
                                />
                              </DialogContent>
                            </Dialog>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" space-y-5">
                  <div className="card">
                    {item?.previousStudentAccounts.map((item, index) => (
                      <>
                        <header className=" card-header noborder">
                          <div className="flex">
                            <h4
                              className="card-title"
                              style={{ fontSize: "16px" }}
                            >
                              History
                            </h4>
                          </div>
                          <div style={{ cursor: "pointer" }}>
                            <Trash2
                              size={22}
                              color="red"
                              onClick={() => deleteDocument(item.id)}
                            />
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
                                        Account Name
                                      </th>
                                      <th
                                        scope="col"
                                        className=" table-th "
                                        style={{ color: "#000" }}
                                      >
                                        Account Number
                                      </th>

                                      <th
                                        scope="col"
                                        className=" table-th "
                                        style={{ color: "#000" }}
                                      >
                                        Branch
                                      </th>
                                      <th
                                        scope="col"
                                        className=" table-th "
                                        style={{ color: "#000" }}
                                      >
                                        IFSC Code
                                      </th>
                                      <th
                                        scope="col"
                                        className=" table-th "
                                        style={{ color: "#000" }}
                                      >
                                        UPI Id
                                      </th>
                                      <th
                                        scope="col"
                                        className=" table-th "
                                        style={{ color: "#000" }}
                                      >
                                        QR Code
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                                    <tr key={index}>
                                      <td className="table-td ">
                                        {item && item.accountName
                                          ? item.accountName
                                          : "-"}
                                      </td>

                                      <td className="table-td ">
                                        {item && item.accountNumber
                                          ? item.accountNumber
                                          : "-"}
                                      </td>

                                      <td className="table-td ">
                                        {item && item.branch
                                          ? item.branch
                                          : "-"}
                                      </td>
                                      <td className="table-td ">
                                        {item && item.IFSCCode
                                          ? item.IFSCCode
                                          : "-"}
                                      </td>
                                      <td className="table-td ">
                                        {item && item.UPIId ? item.UPIId : "-"}
                                      </td>
                                      <td
                                        className="table-td cursor-pointer"
                                        onClick={() =>
                                          handleImageClick(
                                            item.UPIQRCode_FileName
                                          )
                                        }
                                      >
                                        {item && item.UPIQRCode_Name
                                          ? item.UPIQRCode_FileName
                                          : "-"}
                                      </td>
                                    </tr>
                                    <Dialog
                                      open={openPopup}
                                      onClose={() => setOpenPopup(false)}
                                    >
                                      <DialogContent>
                                        <img
                                          src={`${localHost}/studentFile/${selectedImage}`}
                                          alt="document"
                                          style={{
                                            width: "100%",
                                            height: "auto",
                                          }}
                                        />
                                      </DialogContent>
                                    </Dialog>
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
              </>
            ))
          ) : (
            <div className="text-center py-4">
              <img
                src={noRecord}
                alt="No data available"
                style={{
                  display: "block",
                  margin: "0 auto",
                }}
              />
              <p>No account data available.</p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Account;
