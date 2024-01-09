import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewInvoice = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [amount, setAmount] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [paymentType, setPaymentType] = useState("default");

  const handlePaymentType = (event) => {
    setPaymentType(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      mobileNumber,
      email,
      panNumber,
      companyName,
      amount,
      paymentType,
      address,
      pinCode,
    };

    console.log(formData);

    let showToast = true;

    // Additional validation logic for other fields
    if (!name || !mobileNumber || !email || !address || !pinCode || !amount) {
      showToast = false;
      toast.error("Please fill all required fields");
    }

    if (amount === 50000 && !panNumber) {
      showToast = false;
      toast.error("Please fill PanNumber for amount 50000");
    }

    if (paymentType === "default") {
      showToast = false;
      toast.error("Please select payment type");
    }

    if (showToast) {
      // const res = await addAdminCourse(formData);
      //   console.log(res);
      //   if (res.data.success) {
      //     toast.success(res.data.message);
      //     clearTextInput();
      //   }
    }
  };

  return (
    <>
      <div className="card-text h-full">
        <form className="space-y-4" id="multipleValidation">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="input-area">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <div className="relative">
                <input
                  style={{ fontSize: "12px" }}
                  id="name"
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="input-area">
              <label htmlFor="companyName" className="form-label">
                Company Name (Optional)
              </label>
              <div className="relative">
                <input
                  style={{ fontSize: "12px" }}
                  id="companyName"
                  type="text"
                  name="companyName"
                  className="form-control"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            </div>
            <div className="input-area">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="relative">
                <input
                  style={{ fontSize: "12px" }}
                  id="email"
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="input-area">
              <label htmlFor="mobileNumber" className="form-label">
                Mobile Number
              </label>
              <div className="relative">
                <input
                  style={{ fontSize: "12px" }}
                  id="mobileNumber"
                  type="number"
                  name="mobileNumber"
                  className="form-control"
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="input-area">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <div className="relative">
                <input
                  style={{ fontSize: "12px" }}
                  id="address"
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="input-area">
              <label htmlFor="pincode" className="form-label">
                Pin Code
              </label>
              <div className="relative">
                <input
                  style={{ fontSize: "12px" }}
                  id="pincode"
                  type="number"
                  name="pincode"
                  className="form-control"
                  placeholder="Pin Code"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </div>
            </div>

            <div className="input-area">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <div className="relative">
                <input
                  style={{ fontSize: "12px" }}
                  id="amount"
                  type="number"
                  name="amount"
                  className="form-control"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="input-area">
              <label htmlFor="paymenttype" className="form-label">
                Payment Type
              </label>
              <select
                id="paymenttype"
                className="form-control"
                value={paymentType}
                onChange={handlePaymentType}
                style={{ fontSize: "12px" }}
              >
                <option value="default" className="dark:bg-slate-700" selected>
                  Select Payment Type
                </option>
                <option value="Student" className="dark:bg-slate-700">
                  Student
                </option>
                <option value="Donar" className="dark:bg-slate-700">
                  Donar
                </option>
              </select>
            </div>
            {Number(amount) > 49999 && (
              <div className="input-area">
                <label htmlFor="PanNumber" className="form-label">
                  Pan Number
                </label>
                <div className="relative">
                  <input
                    style={{ fontSize: "12px" }}
                    id="panNumber"
                    type="text"
                    name="panNumber"
                    className="form-control"
                    placeholder="Pan Number"
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value)}
                  />
                </div>
              </div>
            )}
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

export default NewInvoice;
