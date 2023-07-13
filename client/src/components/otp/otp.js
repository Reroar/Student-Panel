import React, { useState } from "react";
import avatar from "../../assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../../helper/validate";
import convertToBase64 from "../../helper/convert";
import useFetch from "../../hooks/fetch.hook";
import { updateUser } from "../../helper/helper";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import logo from "../../img/logo.png";
import email from "../../img/email.jpg";
import calender from "../../img/calender.jpg";
import event from "../../img/event.jpg";
import logout from "../../img/logout.png";
import update from "../../img/update.png";

export default function Profile() {
  const [file, setFile] = useState();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        profile: file || apiData?.profile || "",
      });
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>,
      });
    },
  });

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  // logout handler function
  function userLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="container justify-content-center align-items-center">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="logo">
        {/* <img src={logo} alt="easyclass" /> */}
        <h4 className="topic">Student Portal</h4>
      </div>

      <>
        <div className="row">
          <div className="col text-center">
            <h2>Welcome to the channel!!!</h2>
            <p>Enter the OTP sent to you to verify your identity</p>
          </div>
        </div>
      </>

      <form onSubmit={formik.handleSubmit}>
        <div className="main">
          <div class="d-flex justify-content-center align-items-center ">
            <div class="card py-5 px-3">
              <h5 className="justify-content-center align-items-center">
                OTP Verification
              </h5>
              <span class="mobile-text">
                Mark Your Attendance <b class="text-color"></b>
              </span>
              <div class="d-flex flex-row mt-5">
                {otp.map((data, index) => {
                  return (
                    <input
                      className="form-control"
                      type="text"
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                    />
                  );
                })}
              </div>
              <div class="text-center mt-5">
                <p>OTP Entered - {otp.join("")}</p>
                <span class="d-block mobile-text" id="countdown">
                  <p>
                    <button
                      className="btn btn-secondary mr-2"
                      onClick={(e) => setOtp([...otp.map((v) => "")])}
                    >
                      Clear
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => alert("Entered OTP is " + otp.join(""))}
                    >
                      Verify OTP
                    </button>
                  </p>
                </span>
                <span class="d-block mobile-text" id="resend"></span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
