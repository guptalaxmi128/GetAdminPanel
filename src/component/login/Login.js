import React, { useState } from "react";
import backgroundImg from "../../assets/page-bg.png";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/SignUpApi";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const [login] = useLoginMutation();

  const clearTextInput = () => {
    setEmail("");
    setPassword("");
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const passwordRegex =
  //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  //   const isValidPassword = passwordRegex.test(password);
  //   setLoading(true);
  //   if (!email) {
  //     setEmailError("Email is required");
  //   } else if (!/\S+@\S+\.\S+/.test(email)) {
  //     setEmailError("Invalid email address");
  //   } else {
  //     setEmailError("");
  //   }
  //   if (!password) {
  //     setPasswordError("Please enter password");
  //   }
  //   else if (password.length !== 8) {
  //     setPasswordError("Password should have 8 character");
  //   }
  //   else {
  //     setPasswordError("");
  //   }
  //   if (
  //    email &&
  //     password
  //   ) {
  //     const formData = { email, password };
  //     console.log(formData);
  //     const res = await login(formData);
  //     console.log(res);
  //     localStorage.setItem("authToken", res.data.authToken);
  //     console.log(localStorage);
  //     clearTextInput();
  //     navigate('/home');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const isValidPassword = passwordRegex.test(password);

    // Initialize loading state
    setLoading(true);

    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("Please enter password");
    } else if (password.length !== 8) {
      setPasswordError("Password should have 8 characters");
    } else {
      setPasswordError("");
    }

    if (email && password) {
      const formData = { email, password };
      console.log(formData);

      try {
        const res = await login(formData);
        console.log(res);
        localStorage.setItem("authToken", res.data.authToken);
        console.log(localStorage);
        clearTextInput();
        navigate("/home");
      } catch (error) {
        console.error("Login error:", error);
      }
    }

    setLoading(false);
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
              <div className="text-center 2xl:mb-10 mb-5">
                <h4 className="font-medium">Sign In</h4>
                <div className="text-slate-500 dark:text-slate-400 text-base">
                  Sign in to your account to start using GET
                </div>
              </div>
              {/* <!-- BEGIN: Login Form --> */}
              <form className="space-y-4">
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
                    password
                  </label>
                  <div className="relative ">
                    <input
                      type="password"
                      name="password"
                      className="  form-control py-2"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                {loading && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      zIndex: 9999,
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}

                <button
                  className="btn btn-dark block w-full text-center py-2"
                  onClick={(e) => handleSubmit(e)}
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Login;
