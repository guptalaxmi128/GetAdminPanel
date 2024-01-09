import React, { useState } from "react";
import backgroundImg from "../../assets/page-bg.png";
import { useRegisterMutation } from "../../services/SignUpApi";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordChange = (event) => {
    const enteredPassword = event.target.value;
    setPassword(enteredPassword);
  };

  const [register] = useRegisterMutation();

  const clearTextInput = () => {
    setName("");
    setMobileNumber("");
    setEmail("");
    setPassword('');
  };
  const handleSubmit = async () => {
    const pattern = /^[a-zA-Z\s]+$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const isValidPassword = passwordRegex.test(password);
    const valid = pattern.test(name);
    if (!name) {
      setNameError("Please enter your name");
    } else if (!valid) {
      setNameError("Invalid name. Only characters are allowed.");
    } else if (name.length < 3) {
      setNameError("Name should have at least 3 characters");
    } else {
      setNameError("");
    }

    if (!mobileNumber) {
      setMobileNumberError("Please enter your mobile number");
    } else if (mobileNumber.length !== 10) {
      setMobileNumberError("Mobile number should have 10 digits");
    } else {
      setMobileNumberError("");
    }
    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("Please enter password");
    } 
      else if (!isValidPassword) {
      setPasswordError(
        "Password should be at least 8 characters long and contain at least one special character and one digit."
      );
    }
    // else if (password.length === 8) {
    //   setPasswordError("Password should have 8 character");
    // } 
    else {
      setPasswordError("");
    }
    if (
      name &&
      name.length >= 3 &&
      mobileNumber &&
      mobileNumber.length === 10 &&
      password
    ) {
      const formData = { name, mobileNumber, email, password };
      console.log(formData);
      const res = await register(formData);
      console.log(res);
      localStorage.setItem("authToken", res.data.authToken);
      console.log(localStorage);
      clearTextInput();
      navigate('/home');
    }
  };

  return (
    <>
      <div
        className=" bg-cover bg-no-repeat bg-center"
        style={{ position: "relative" }}
      >
        <img
          src={backgroundImg}
          alt="backgroundImg"
          style={{ height: "100vh", width: "100vw" }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          {/* <div className="lg-inner-column"> */}
          <div className="lg:w-1/2 w-full flex flex-col items-center justify-center">
            <div className="auth-box-3">
              {/* <div className="mobile-logo text-center mb-6 lg:hidden block">
            <a heref="#">
          
              <img src={logo} alt="" className="mb-10 white_logo" />
            </a>
          </div> */}

              <div className="text-center 2xl:mb-10 mb-5">
                <h4 className="font-medium">Sign Up</h4>
                <div className="text-slate-500 dark:text-slate-400 text-base">
                  Sign up to your account to start using GET
                </div>
              </div>
              {/* <!-- BEGIN: Login Form --> */}
              <form className="space-y-4">
                <div className="fromGroup">
                  <label className="block capitalize form-label">name</label>
                  <div className="relative ">
                    <input
                      type="text"
                      name="name"
                      className="form-control py-2"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {nameError ? (
                      <span
                        style={{
                          color: "red",
                          marginLeft: 8,
                          fontSize: "14px",
                        }}
                      >
                        {nameError}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="fromGroup">
                  <label className="block capitalize form-label">email</label>
                  <div className="relative ">
                    <input
                      type="email"
                      name="email"
                      className="form-control py-2"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError ? (
                      <span
                        style={{
                          color: "red",
                          marginLeft: 8,
                          fontSize: "14px",
                        }}
                      >
                        {emailError}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="fromGroup">
                  <label className="block capitalize form-label">
                    mobile number
                  </label>
                  <div className="relative ">
                    <input
                      type="number"
                      name="mobilenumber"
                      className="  form-control py-2"
                      placeholder="Mobile Number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                    {mobileNumberError ? (
                      <span
                        style={{
                          color: "red",
                          marginLeft: 8,
                          fontSize: "14px",
                        }}
                      >
                        {mobileNumberError}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="fromGroup">
                  <label className="block capitalize form-label">
                    password
                  </label>
                  <div className="relative ">
                    <input
                      type="password"
                      name="passwordr"
                      className="  form-control py-2"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    {passwordError ? (
                      <span
                        style={{
                          color: "red",
                          marginLeft: 8,
                          fontSize: "14px",
                        }}
                      >
                        {passwordError}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="checkbox-area">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="hidden"
                        name="checkbox"
                      />
                      <span className="h-4 w-4 border flex-none border-slate-100 dark:border-slate-800 rounded inline-flex ltr:mr-3 rtl:ml-3 relative transition-all duration-150 bg-slate-100 dark:bg-slate-900">
                        <img
                          src="assets/images/icon/ck-white.svg"
                          alt=""
                          className="h-[10px] w-[10px] block m-auto opacity-0"
                        />
                      </span>{" "}
                      &nbsp;
                      <span className="text-slate-500 dark:text-slate-400 text-sm leading-6">
                        You accept our Terms and Conditions and Privacy Policy
                      </span>
                    </label>
                  </div>
                </div>
                <button
                  className="btn btn-dark block w-full text-center"
                  type="button"
                  onClick={(e) => handleSubmit(e)}
                >
                  Create An Account
                </button>
              </form>
              {/* <!-- END: Login Form --> */}
              <div className="max-w-[242px] mx-auto mt-8 w-full"></div>
              <div className="mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-6 uppercase text-sm text-center">
                Already registered? &nbsp;
                <a
                  href="/login"
                  className="text-slate-900 dark:text-white font-medium hover:underline"
                >
                  Sign In
                </a>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default SignUp;
