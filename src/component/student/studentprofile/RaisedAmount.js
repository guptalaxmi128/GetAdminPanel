import React, { useState } from "react";
import noRecord from "../../../assets/no-record-found.png";

const RaisedAmount = () => {
  const [raisedData, setRaisedData] = useState([]);

  return (
    <>
      {raisedData.length === 0 ? (
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
          <div className="card-body" style={{ padding: "0.5rem" }}>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex mb-2">
                <div
                  className="text-xs text-slate-500 dark:text-slate-300 "
                  style={{ fontSize: "14px", color: "#000" }}
                >
                  Current Course:
                </div>{" "}
                &nbsp;
                <div
                  className="text-xs text-slate-500 dark:text-slate-300 "
                  style={{ fontSize: "14px" }}
                ></div>
              </div>

              <div className="flex mb-2">
                <div
                  className=" text-xs text-slate-500 dark:text-slate-300 "
                  style={{ fontSize: "14px", color: "#000" }}
                >
                  Contribution :
                </div>
                &nbsp;
                <div
                  className="text-xs text-slate-500 dark:text-slate-300 "
                  style={{ fontSize: "14px" }}
                ></div>
              </div>

              <div className="flex mb-2">
                <div
                  className=" text-xs text-slate-500 dark:text-slate-300 "
                  style={{ fontSize: "14px", color: "#000" }}
                >
                  Requirement :
                </div>
                &nbsp;
                <div
                  className="text-xs text-slate-500 dark:text-slate-300 "
                  style={{ fontSize: "14px" }}
                ></div>
              </div>
            </div>
          </div>

          <div className=" space-y-5 mt-5">
            <div className="card">
              <>
                <header className=" card-header noborder">
                  <div className="flex">
                    <h4 className="card-title" style={{ fontSize: "16px" }}>
                      Past Raised Fund Request
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
                                Current Course
                              </th>
                              <th
                                scope="col"
                                className=" table-th "
                                style={{ color: "#000" }}
                              >
                                Contribution
                              </th>

                              <th
                                scope="col"
                                className=" table-th "
                                style={{ color: "#000" }}
                              >
                                Requirement
                              </th>
                              {/* <th
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
                                </th> */}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                            <tr>
                              <td className="table-td "></td>

                              <td className="table-td "></td>

                              <td className="table-td "></td>
                              <td className="table-td "></td>
                              <td className="table-td "></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RaisedAmount;
