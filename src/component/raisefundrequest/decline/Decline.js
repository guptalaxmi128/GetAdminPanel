import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import filter from "../../../assets/images/filter.png";
import noRecord from "../../../assets/no-record-found.png";
import close from "../../../assets/images/close.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetRejectedRaiseFundQuery,
  useApprovalStatusMutation,
} from "../../../services/SignUpApi";

const Decline = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [declineStudent, setDeclineStudent] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(5); // Default value
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(declineStudent?.length);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    name: {
      selected: false,
      subOptions: {
        firstname: false,
        lastname: false,
      },
    },
    gender: {
      selected: false,
      subOptions: {
        male: false,
        female: false,
      },
    },
    location: {
      selected: false,
      subOptions: {
        district: false,
        nationality: false,
        currentAddress: false,
      },
    },
    age: {
      selected: false,
      subOptions: {
        start: 0,
        end: 0,
      },
    },
    amount: {
      selected: false,
      subOptions: {
        yourRequirements: false,
        remainRequireFundForDonar: false,
      },
    },
  });

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { data: rejectRaiseFund, isSuccess: rejectRaiseFundIsSuccess } =
    useGetRejectedRaiseFundQuery();
  //   console.log(rejectRaiseFund)

  useEffect(() => {
    if (rejectRaiseFund && rejectRaiseFundIsSuccess && rejectRaiseFund.data) {
      setDeclineStudent(rejectRaiseFund.data);
    }
  }, [rejectRaiseFund, rejectRaiseFundIsSuccess]);

  // console.log(selectedId);

  const [approvalStatus] = useApprovalStatusMutation();

  const handleApproval = async (id) => {
    const formData = { id, approvalStatus: "Accept" };
    // console.log(formData);
    const res = await approvalStatus(formData);
    // console.log(res);
    if (res && res.data && res.data.success) {
      toast.success(res.data.message);
    }
  };

  useEffect(() => {
    const filteredData = declineStudent?.filter((entry) => {
      const name = entry.studentName || "";
      const [firstName, lastName] = name.split(" ");
      const requiredFund = entry.yourRequirements || "";
      const remainsRequiredFund = entry.remainRequireFundForDonar || "";
      const location = entry.studentProfile?.currentAddress || "";

      const nameMatches =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lastName.toLowerCase().includes(searchQuery.toLowerCase());
      return (
        nameMatches ||
        requiredFund.includes(searchQuery.toLowerCase()) ||
        remainsRequiredFund.includes(searchQuery.toLowerCase()) ||
        location.toLowerCase().includes(searchQuery.toLowerCase()) 
      );
    });
    setFilteredEntries(filteredData);
    setTotalEntries(filteredData?.length || 0);
    setCurrentPage(1);
  }, [searchQuery, declineStudent]);

  // const getCurrentPageEntries = () => {
  //   if (entriesPerPage === Infinity) {
  //     // Show all entries
  //     return searchQuery
  //       ? filteredEntries
  //       : declineStudent.slice((currentPage - 1) * entriesPerPage);
  //   }

  //   const startIndex = (currentPage - 1) * entriesPerPage;
  //   const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);

  //   return searchQuery
  //     ? filteredEntries.slice(startIndex, endIndex)
  //     : declineStudent.slice(startIndex, endIndex);
  // };

  const getCurrentPageEntries = () => {
    // Determine the data source based on whether there's a search query
    const dataToPaginate = searchQuery ? filteredEntries : filteredData;

    if (entriesPerPage === Infinity) {
      // Show all entries
      return dataToPaginate;
    }

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);

    // If there's no search query and no entries, return all approvedStudent
    if (!searchQuery && dataToPaginate.length === 0) {
      return declineStudent;
    }

    return dataToPaginate.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate the start and end index of the entries to display on the current page
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);

  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);


  const applyFilter = () => {
    const searchTerms = searchValue.toLowerCase().split(' ');
    const filteredData = declineStudent.filter((entry) => {
      const fullName = entry.studentName || "";
      const nameParts = fullName.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ");
      const location = entry.studentProfile?.currentAddress || "";
      const district = entry.studentProfile?.district || "";
      const nationality = entry.studentProfile?.nationality || "";
      const requiredFund = entry.yourRequirements || "";
      const remainsRequiredFund = entry.remainRequireFundForDonar || "";
      console.log(searchTerms)
      console.log(selectedFilters)
  
      if (selectedFilters.name.selected) {
        const nameMatches = searchTerms.some(term =>
          fullName.toLowerCase().includes(term) ||
          firstName.toLowerCase().includes(term) ||
          lastName.toLowerCase().includes(term)
        );
        if (!nameMatches) {
          return false;
        }
      }
  
      if (selectedFilters.location.selected) {
        const locationMatches = searchTerms.some(term =>
          location.toLowerCase().includes(term) ||
          district.toLowerCase().includes(term) ||
          nationality.toLowerCase().includes(term)
        );
        if (!locationMatches) {
          return false;
        }
      }
  
      if (selectedFilters.amount.selected) {
        const amountMatches = searchTerms.some(term =>
          requiredFund.toLowerCase().includes(term) ||
          remainsRequiredFund.toLowerCase().includes(term)
        );
        if (!amountMatches) {
          return false;
        }
      }
  
      return true;
    });
  
    console.log(filteredData);
    setFilteredData(filteredData);
    setTotalEntries(filteredData.length);
    setCurrentPage(1);
    setIsPopupOpen(false);
  };
  return (
    <>
      <div className=" space-y-5">
        <div className="card">
          <div className="card-body px-6 ">
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
                    <div
                      className="flex"
                      style={{
                        width: "88px",
                        height: "40px",
                        border: "1px solid #EC6E46",
                        borderRadius: "6px",
                        justifyContent: "space-between",
                        padding: "10px",
                        cursor:'pointer'
                      }}
                      onClick={() => setIsPopupOpen(!isPopupOpen)}
                    >
                      <img
                        src={filter}
                        alt="filter"
                        style={{ width: "20px", height: "20px" }}
                      />
                      <p style={{ fontSize: "12px" }}>Filter</p>
                    </div>
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
                        placeholder="Search..."
                      />
                    </div>
                    <div>
                  {isPopupOpen && (
                      <div className="popup-overlay">
                        <div className="popup-content">
                          <div className="grid grid-cols-12 gap-6 mt-1">
                            <div className="2xl:col-span-9 lg:col-span-12 col-span-12">
                              <div
                                className="bg-white rounded-md p-6 "
                                style={{
                                  width: "auto",
                                  height: "auto",
                                  borderRadius: "5px",
                                  // padding: "15px",
                                  position: "relative",
                                }}
                              >
                                <img
                                  src={close}
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    top: "10px",
                                    right: "10px",
                                    cursor: "pointer",
                                    position: "absolute",
                                  }}
                                  alt="close"
                                  onClick={() => setIsPopupOpen(false)}
                                />
                                <div className="p-4 card ">
                                  <div className=" space-y-5">
                                    <div className="card">
                                      <div className=" px-6 pb-6">
                                        <div className="overflow-x-auto -mx-6 dashcode-data-table">
                                          <span className=" col-span-8  "></span>
                                          <span className="  col-span-4 "></span>
                                          <div className="inline-block min-w-full justify-center m-auto">
                                            <div>
                                              <div className="relative">
                                                <input
                                                style={{marginLeft:'0px'}}
                                                  className="form-control"
                                                  type="text"
                                                  placeholder="Search..."
                                                  value={searchValue}
                                                  onChange={(e) =>
                                                    setSearchValue(e.target.value)
                                                  }
                                                />
                                              </div>
                                              <div style={{ margin: "10px" }}>
                                                <label className="checkbox ">
                                                  <input
                                                    type="checkbox"
                                                    checked={
                                                      selectedFilters.name
                                                        .selected
                                                    }
                                                    onChange={(e) =>
                                                      setSelectedFilters({
                                                        ...selectedFilters,
                                                        name: {
                                                          selected:
                                                            e.target.checked,
                                                          subOptions:
                                                            selectedFilters.name
                                                              .subOptions,
                                                        },
                                                      })
                                                    }
                                                  />
                                                  Name
                                                </label>
                                                <label className="checkbox ">
                                                  <input
                                                    style={{
                                                      marginLeft: "25px",
                                                    }}
                                                    type="checkbox"
                                                    checked={
                                                      selectedFilters.name
                                                        .subOptions.firstname
                                                    }
                                                    onChange={(e) =>
                                                      setSelectedFilters({
                                                        ...selectedFilters,
                                                        name: {
                                                          selected:
                                                            selectedFilters.name
                                                              .selected,
                                                          subOptions: {
                                                            ...selectedFilters
                                                              .name.subOptions,
                                                            firstname:
                                                              e.target.checked,
                                                          },
                                                        },
                                                      })
                                                    }
                                                  />
                                                  <span className="checkbox-text">
                                                    First Name
                                                  </span>
                                                </label>
                                                <label className="checkbox">
                                                  <input
                                                    style={{
                                                      marginLeft: "25px",
                                                    }}
                                                    type="checkbox"
                                                    checked={
                                                      selectedFilters.name
                                                        .subOptions.lastname
                                                    }
                                                    onChange={(e) =>
                                                      setSelectedFilters({
                                                        ...selectedFilters,
                                                        name: {
                                                          selected:
                                                            selectedFilters.name
                                                              .selected,
                                                          subOptions: {
                                                            ...selectedFilters
                                                              .name.subOptions,
                                                            lastname:
                                                              e.target.checked,
                                                          },
                                                        },
                                                      })
                                                    }
                                                  />
                                                  <span className="checkbox-text">
                                                    Last Name
                                                  </span>
                                                </label>
                                              </div>
                                              <div style={{ margin: "10px" }}>
                                                <label className="checkbox ">
                                                  <input
                                                    type="checkbox"
                                                    checked={
                                                      selectedFilters.gender
                                                        .selected
                                                    }
                                                    onChange={(e) =>
                                                      setSelectedFilters({
                                                        ...selectedFilters,
                                                        gender: {
                                                          selected:
                                                            e.target.checked,
                                                          subOptions:
                                                            selectedFilters
                                                              .gender
                                                              .subOptions,
                                                        },
                                                      })
                                                    }
                                                  />
                                                  Gender
                                                </label>
                                                <label className="checkbox">
                                                  <input
                                                    style={{
                                                      marginLeft: "25px",
                                                    }}
                                                    type="checkbox"
                                                    checked={
                                                      selectedFilters.gender
                                                        .subOptions.male
                                                    }
                                                    onChange={(e) =>
                                                      setSelectedFilters({
                                                        ...selectedFilters,
                                                        gender: {
                                                          selected:
                                                            selectedFilters
                                                              .gender.selected,
                                                          subOptions: {
                                                            ...selectedFilters
                                                              .gender
                                                              .subOptions,
                                                            male: e.target
                                                              .checked,
                                                          },
                                                        },
                                                      })
                                                    }
                                                  />
                                                  <span className="checkbox-text">
                                                    Male
                                                  </span>
                                                </label>

                                                <label className="checkbox">
                                                  <input
                                                    style={{
                                                      marginLeft: "25px",
                                                    }}
                                                    type="checkbox"
                                                    checked={
                                                      selectedFilters.gender
                                                        .subOptions.female
                                                    }
                                                    onChange={(e) =>
                                                      setSelectedFilters({
                                                        ...selectedFilters,
                                                        gender: {
                                                          selected:
                                                            selectedFilters
                                                              .gender.selected,
                                                          subOptions: {
                                                            ...selectedFilters
                                                              .gender
                                                              .subOptions,
                                                            female:
                                                              e.target.checked,
                                                          },
                                                        },
                                                      })
                                                    }
                                                  />
                                                  <span className="checkbox-text">
                                                    Female
                                                  </span>
                                                </label>
                                              </div>
                                              <div style={{ margin: "10px" }}>
                                                <label className="checkbox">
                                                  <input
                                                    type="checkbox"
                                                    checked={
                                                      selectedFilters.location
                                                        .selected
                                                    }
                                                    onChange={(e) =>
                                                      setSelectedFilters({
                                                        ...selectedFilters,
                                                        location: {
                                                          selected:
                                                            e.target.checked,
                                                          subOptions:
                                                            selectedFilters
                                                              .location
                                                              .subOptions,
                                                        },
                                                      })
                                                    }
                                                  />
                                                  Location
                                                </label>
                                                <label className="checkbox">
                                                  <input
                                                    style={{
                                                      marginLeft: "25px",
                                                    }}
                                                    type="checkbox"
                                                    checked={
                                                      selectedFilters.location
                                                        .subOptions.nationality
                                                    }
                                                    onChange={(e) =>
                                                      setSelectedFilters({
                                                        ...selectedFilters,
                                                        location: {
                                                          selected:
                                                            selectedFilters
                                                              .location
                                                              .selected,
                                                          subOptions: {
                                                            ...selectedFilters
                                                              .location
                                                              .subOptions,
                                                            nationality:
                                                              e.target.checked,
                                                          },
                                                        },
                                                      })
                                                    }
                                                  />
                                                  <span className="checkbox-text">
                                                    Nationality
                                                  </span>
                                                </label>
                                                <label className="checkbox">
                                                  <input
                                                    style={{
                                                      marginLeft: "25px",
                                                    }}
                                                    type="checkbox"
                                                    checked={
                                                      selectedFilters.location
                                                        .subOptions.district
                                                    }
                                                    onChange={(e) =>
                                                      setSelectedFilters({
                                                        ...selectedFilters,
                                                        location: {
                                                          selected:
                                                            selectedFilters
                                                              .location
                                                              .selected,
                                                          subOptions: {
                                                            ...selectedFilters
                                                              .location
                                                              .subOptions,
                                                            district:
                                                              e.target.checked,
                                                          },
                                                        },
                                                      })
                                                    }
                                                  />
                                                  <span className="checkbox-text">
                                                    District
                                                  </span>
                                                </label>
                                                <label className="checkbox">
                                                  <input
                                                    style={{
                                                      marginLeft: "25px",
                                                    }}
                                                    type="checkbox"
                                                    checked={
                                                      selectedFilters.location
                                                        .subOptions
                                                        .currentAddress
                                                    }
                                                    onChange={(e) =>
                                                      setSelectedFilters({
                                                        ...selectedFilters,
                                                        location: {
                                                          selected:
                                                            selectedFilters
                                                              .location
                                                              .selected,
                                                          subOptions: {
                                                            ...selectedFilters
                                                              .location
                                                              .subOptions,
                                                            currentAddress:
                                                              e.target.checked,
                                                          },
                                                        },
                                                      })
                                                    }
                                                  />
                                                  <span className="checkbox-text">
                                                    Current Address
                                                  </span>
                                                </label>
                                              </div>
                                              <div style={{ margin: "10px" }}>
                                                <label className="checkbox">
                                                  <input
                                                    type="checkbox"
                                                    checked={
                                                      selectedFilters.amount
                                                        .selected
                                                    }
                                                    onChange={(e) =>
                                                      setSelectedFilters({
                                                        ...selectedFilters,
                                                        amount: {
                                                          selected:
                                                            e.target.checked,
                                                          subOptions:
                                                            selectedFilters
                                                              .amount
                                                              .subOptions,
                                                        },
                                                      })
                                                    }
                                                  />
                                                  Amount
                                                </label>
                                                <label className="checkbox">
                                                  <input
                                                    style={{
                                                      marginLeft: "25px",
                                                    }}
                                                    type="checkbox"
                                                    checked={
                                                      selectedFilters.amount
                                                        .subOptions
                                                        .yourRequirements
                                                    }
                                                    onChange={(e) =>
                                                      setSelectedFilters({
                                                        ...selectedFilters,
                                                        amount: {
                                                          selected:
                                                            selectedFilters
                                                              .amount.selected,
                                                          subOptions: {
                                                            ...selectedFilters
                                                              .amount
                                                              .subOptions,
                                                            yourRequirements:
                                                              e.target.checked,
                                                          },
                                                        },
                                                      })
                                                    }
                                                  />
                                                  <span className="checkbox-text">
                                                    Required Fund
                                                  </span>
                                                </label>

                                                <label className="checkbox">
                                                  <input
                                                    style={{
                                                      marginLeft: "25px",
                                                    }}
                                                    type="checkbox"
                                                    checked={
                                                      selectedFilters.amount
                                                        .subOptions
                                                        .remainRequireFundForDonar
                                                    }
                                                    onChange={(e) =>
                                                      setSelectedFilters({
                                                        ...selectedFilters,
                                                        amount: {
                                                          selected:
                                                            selectedFilters
                                                              .amount.selected,
                                                          subOptions: {
                                                            ...selectedFilters
                                                              .amount
                                                              .subOptions,
                                                            remainRequireFundForDonar:
                                                              e.target.checked,
                                                          },
                                                        },
                                                      })
                                                    }
                                                  />
                                                  <span className="checkbox-text">
                                                    Remains Required Fund
                                                  </span>
                                                </label>
                                              </div>
                                              <div style={{ margin: "10px" }}>
                                                <label className="checkbox">
                                                  <input
                                                    type="checkbox"
                                                    checked={
                                                      selectedFilters.age
                                                        .selected
                                                    }
                                                    onChange={(e) =>
                                                      setSelectedFilters({
                                                        ...selectedFilters,
                                                        age: {
                                                          selected:
                                                            e.target.checked,
                                                          subOptions:
                                                            selectedFilters.age
                                                              .subOptions,
                                                        },
                                                      })
                                                    }
                                                  />
                                                  Age
                                                </label>
                                              </div>
                                              {selectedFilters.age.selected && (
                                                <div style={{ margin: "10px" }}>
                                                  <label>Start Age</label>
                                                  <input
                                                    className="form-control"
                                                    type="number"
                                                    value={
                                                      selectedFilters.age
                                                        .subOptions.start
                                                    }
                                                    onChange={(e) =>
                                                      setSelectedFilters({
                                                        ...selectedFilters,
                                                        age: {
                                                          selected: true,
                                                          subOptions: {
                                                            ...selectedFilters
                                                              .age.subOptions,
                                                            start: parseInt(
                                                              e.target.value
                                                            ),
                                                          },
                                                        },
                                                      })
                                                    }
                                                  />
                                                  <label>End Age</label>
                                                  <input
                                                    className="form-control"
                                                    type="number"
                                                    value={
                                                      selectedFilters.age
                                                        .subOptions.end
                                                    }
                                                    onChange={(e) =>
                                                      setSelectedFilters({
                                                        ...selectedFilters,
                                                        age: {
                                                          selected: true,
                                                          subOptions: {
                                                            ...selectedFilters
                                                              .age.subOptions,
                                                            end: parseInt(
                                                              e.target.value
                                                            ),
                                                          },
                                                        },
                                                      })
                                                    }
                                                  />
                                                </div>
                                              )}
                                              <button
                                                className="btn inline-flex justify-center btn-dark"
                                               
                                                type="button"
                                                onClick={applyFilter}
                                              >
                                                Apply
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* <!-- END: Group Chart2 --> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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
                              <span className="h-4 w-4 border flex-none border-slate-100 dark:border-slate-800 rounded inline-flex ltr:mr-3 rtl:ml-3 relative transition-all duration-150 bg-slate-100 dark:bg-slate-900">
                                {/* <img
                                src={icon}
                                alt=""
                                className="h-[10px] w-[10px] block m-auto opacity-0"
                              /> */}
                              </span>
                            </label>
                          </div>
                        </th>

                        <th scope="col" className=" table-th ">
                          Name
                        </th>

                        <th scope="col" className=" table-th ">
                          Location
                        </th>

                        <th scope="col" className=" table-th ">
                          Required Fund
                        </th>
                        <th scope="col" className=" table-th ">
                         Remain Required Fund
                        </th>

                        <th scope="col" className=" table-th ">
                          View Profile
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
                                  <span className="h-4 w-4 border flex-none border-slate-100 dark:border-slate-800 rounded inline-flex ltr:mr-3 rtl:ml-3 relative transition-all duration-150 bg-slate-100 dark:bg-slate-900">
                                    {/* <img
                                src={icon}
                                alt=""
                                className="h-[10px] w-[10px] block m-auto opacity-0"
                              />  */}
                                  </span>
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
                                {data.studentName}
                              </span>
                            </td>
                            <td className="table-td">
                              <div
                                style={{
                                  marginLeft: "20px",
                                  fontSize: "12px",
                                  color: "#6E6893",
                                }}
                              >
                                {data.studentProfile?.currentAddress}
                              </div>
                            </td>
                            <td className="table-td ">
                              <div>
                                ₹ {data.yourRequirements}
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
                              <div>
                                ₹ {data.remainRequireFundForDonar}
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
                            <td className="table-td">
                            <Link to={`${data.studentUID}`}
                                onClick={() => setSelectedId(id)}
                              >
                                <span style={{ color: "#EC6E46" }}>
                                  Profile
                                </span>
                              </Link>
                            </td>
                            <td className="table-td">
                              <div>
                                <div
                                  className="inline-block px-3 min-w-[100px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-success-500 bg-success-500 cursor-pointer"
                                  onClick={() => handleApproval(id)}
                                >
                                  Approve
                                </div>
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

export default Decline;
