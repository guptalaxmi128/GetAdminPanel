import React, { useState, useEffect } from "react";
import { useGetStudentProfileByIdQuery } from "../../../services/SignUpApi";

const Profile = (props) => {
  const UID = props.UID;
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [religion, setReligion] = useState("");
  const [nationality, setNationality] = useState("");
  const [district, setDistrict] = useState("");
  const [email, setEmail] = useState("");
  const [qualification,setQualification]=useState('');

  const { data, isSuccess } = useGetStudentProfileByIdQuery(UID);

  useEffect(() => {
    if (data && isSuccess) {
      setName(data.name);
      setFatherName(data.fatherName);
      setMotherName(data.motherName);
      setAddress(data.currentAddress);
      setReligion(data.religion);
      setDistrict(data.district);
      setEmail(data.email);
      setDateOfBirth(data.dateOfBirth);
      setNationality(data.nationality);
      setQualification(data.Qualification)
    }
  }, [data, isSuccess]);

  return (
    <div className="card-body" style={{padding:'0.5rem'}}>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="flex mb-2">
          <div
            className="text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px", color: "#000" }}
          >
            Name :
          </div>{" "}
          &nbsp;
          <div
            className="text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px" }}
          >
            {name}
          </div>
        </div>

        <div className="flex mb-2">
          <div
            className=" text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px", color: "#000" }}
          >
            Father's Name :
          </div>
          &nbsp;
          <div
            className="text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px" }}
          >
            {fatherName}
          </div>
        </div>

        <div className="flex mb-2">
          <div
            className=" text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px", color: "#000" }}
          >
            Mother's Name :
          </div>
          &nbsp;
          <div
            className="text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px" }}
          >
            {motherName}
          </div>
        </div>

        <div className="flex mb-2">
          <div
            className=" text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px", color: "#000" }}
          >
            Date Of Birth :
          </div>
          &nbsp;
          <div
            className="text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px" }}
          >
            {dateOfBirth}
          </div>
        </div>

        <div className="flex  mb-2">
          <div
            className=" text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px", color: "#000" }}
          >
            Email :
          </div>
          &nbsp;
          <div
            className="text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px" }}
          >
            {email}
          </div>
        </div>

        <div className="flex  mb-2">
          <div
            className=" text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px", color: "#000" }}
          >
            Current Address :
          </div>
          &nbsp;
          <div
            className="text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px" }}
          >
            {address}
          </div>
        </div>

        <div className="flex mb-2">
          <div
            className=" text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px", color: "#000" }}
          >
            District :
          </div>
          &nbsp;
          <div
            className="text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px" }}
          >
            {district}
          </div>
        </div>

        <div className="flex mb-2">
          <div
            className=" text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px", color: "#000" }}
          >
            Nationality :
          </div>
          &nbsp;
          <div
            className="text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px" }}
          >
            {nationality}
          </div>
        </div>

        <div className="flex mb-2">
          <div
            className=" text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px", color: "#000" }}
          >
            Religion :
          </div>
          &nbsp;
          <div
            className="text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px" }}
          >
            {religion}
          </div>
        </div>

        <div className="flex mb-2">
          <div
            className=" text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px", color: "#000" }}
          >
            Qualification :
          </div>
          &nbsp;
          <div
            className="text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px" }}
          >
            {qualification}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
