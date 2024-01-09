import React from "react";
import backgroundImg from "../../assets/page-bg.png";

const GetOtp = () => {
  return (
    <>
      <div className=" bg-cover bg-no-repeat bg-center" style={{position:'relative'}}>
        <img src={backgroundImg} alt="backgroundImg" style={{height:'100vh',width:'100vw'}} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
        {/* <div className="lg-inner-column"> */}
          <div className="lg:w-1/2 w-full flex flex-col items-center justify-center">
        <div className="auth-box-3" style={{paddingTop:'2.5rem',paddingBottom:'2.5rem'}}>
          {/* <div className="mobile-logo text-center mb-6 lg:hidden block">
            <a heref="#">
          
              <img src={logo} alt="" className="mb-10 white_logo" />
            </a>
          </div> */}
          
          <div className="text-center 2xl:mb-10 mb-5">
            <h4 className="font-medium">Sign In</h4>
            <div className="text-slate-500 dark:text-slate-400 text-base">
              Sign in to your account to start using GET
            </div>
          </div>
          {/* <!-- BEGIN: Login Form --> */}
          <form
            className="space-y-4"
            // action="https://dashcode-html.codeshaper.tech/index.html"
          >
            <div className="fromGroup">
              <label className="block capitalize form-label">email OTP</label>
              <div className="relative ">
                <input
                  type="number"
                  name="emailotp"
                  className="form-control py-2"
                  placeholder="Enter Email OTP"
                />
              </div>
            </div>
            <div className="fromGroup">
              <label className="block capitalize form-label">mobile number OTP</label>
              <div className="relative ">
                <input
                  type="number"
                  name="mobilenumberotp"
                  className="  form-control py-2"
                  placeholder="Mobile Number OTP"
                />
              </div>
            </div>
           
            <button className="btn btn-dark block w-full text-center">
              Submit
            </button>
          </form>
          {/* <!-- END: Login Form --> */}
          {/* <div className="max-w-[242px] mx-auto mt-8 w-full"></div>
          <div className="mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-6 uppercase text-sm text-center">
            Already registered? &nbsp;
            <a
              href="signup-one.html"
              className="text-slate-900 dark:text-white font-medium hover:underline"
            >
              Sign Up
            </a>
          </div> */}
        </div>
      </div>
     {/* </div> */}
     </div>
     </div>
    </>
  );
};

export default GetOtp;
