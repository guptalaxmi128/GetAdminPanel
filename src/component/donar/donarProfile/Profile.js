import React, { useState, useEffect } from "react";
import { useGetDonarQuery } from "../../../services/SignUpApi";


const Profile = (props) => {
  const ID = props.ID;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber,setMobileNumber]=useState('');

    const { data, isSuccess } = useGetDonarQuery(ID)

    useEffect(() => {
      if (data && isSuccess && data.data) {
        setName(data.data.name);
        setAddress(data.data.address);
        setEmail(data.data.email);
        setMobileNumber(data.data.mobileNumber);
      }
    }, [data, isSuccess]);

  return (
    <div className="card-body" style={{ padding: "0.5rem" }}>
      <div className="grid md:grid-cols-2 gap-6">
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
            Phone :
          </div>
          &nbsp;
          <div
            className="text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px" }}
          >
            {mobileNumber}
          </div>
        </div>

        <div className="flex mb-2">
          <div
            className=" text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px", color: "#000" }}
          >
            Location :
          </div>
          &nbsp;
          <div
            className="text-xs text-slate-500 dark:text-slate-300 "
            style={{ fontSize: "14px" }}
          >
           {address}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
