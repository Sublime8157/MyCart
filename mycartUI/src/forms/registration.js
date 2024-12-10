import React, { useEffect, useState, useRef } from "react";
import ErrorDisplay from "../components/errorDisplay";
import SuccessDisplay from "../components/successDisplay";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    birthDate: "",
    mobileNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false); 
  
  const [success, setSuccess] = useState("");
  const [isVisibleSuccess, setIsVisibleSuccess] = useState(false);
  
  const [isRemoved, setIsRemoved] = useState(true);
  const [errors, setErrors] = useState([]);
  const [isVisibleError, setIsVisibleError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    try {
      // send a request to the our server using POST method
      const response = await fetch("http://localhost:5000/register/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // give the forms
        body: JSON.stringify(formData),
      });
      //get the response use the await
      const result = await response.json();
      // if somethings wrong throw an error to the catch handler
      if (!response.ok) {
        setIsLoading(false);
        throw result;
      } else if (result.status === "success") {
        // set the its message to successs state
        setIsLoading(false);
        setSuccess(result.message);
      }
    } catch (error) {
      // if there is an error
      if (error.errors) {
        // if the errors is from validation handle assign to state setErrors
        setErrors(error.errors);
      }
      // if it is not from the validation
      else {
        setErrors([{ msg: "An unexpected error occurred." }]);
      }
    }
  };
  // for showing errors
  useEffect(() => {
    // Show the sliding error box when errors are set
    if (errors.length > 0) {
      setIsVisibleError(true);
    }
  }, [errors]);

  useEffect(() => {
    //shiw the success message
    if (success) {
      setIsVisibleSuccess(true);
    }
  });

  useEffect(() => {
    if (!isVisibleError) {
      const timer = setTimeout(() => {
        setIsRemoved(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisibleError]);

  const [revealPassword, setRevealPassword] = useState({
    password: false,
    confirmPassword: false,
  });  
  const togglePassword = (field) => {
    setRevealPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field], 
    }))
  }
  return ( 
    <div className="h-screen flex items-center justify-center bg-gray-100">  
    <div className={`absolute z-40 h-screen w-screen flex items-center justify-center ${isLoading ? "" : "hidden"}`}>
      <div className="loader">

      </div>
    </div>
      <div className={`relative bg-white rounded py-4 px-4 shadow flex flex-row items-center justify-evenly ${isLoading ? "opacity-40" : ""}`}>
        <div className="h-full">
          <h2 className="text-start font-bold text-lg">Registration</h2>
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 flex-col mt-2 px-2"
          >
            <div>
              <label htmlFor="username" className="text-sm">
                Username:
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                id="username"
                className="text-sm border-2 border-gray-200 p-2 rounded w-full"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm">
                Email:
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="text-sm border-2 border-gray-200 p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="birthDate" className="text-sm">
                Birth Date:
              </label>
              <input
                type="date"
                name="birthDate"
                id="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="text-sm border-2 border-gray-200 p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="mobileNumber" className="text-sm">
                Mobile Number:
              </label>
              <input
                type="tel"
                name="mobileNumber"
                placeholder="Mobile Number"
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="text-sm border-2 border-gray-200 p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="text-sm">
                Local Address:
              </label>
              <textarea
                name="address"
                id="address"
                placeholder="Local Address"
                value={formData.address}
                onChange={handleChange}
                className="text-sm border-2 border-gray-200 p-2 rounded w-full"
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="text-sm">
                Password:
              </label>
              <input
                type={revealPassword.confirmPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="text-sm border-2 border-gray-200 p-2 rounded w-full"
                required />
              <span className="absolute right-3 bottom-1 cursor-pointer" onClick={() => togglePassword("confirmPassword")}><ion-icon name={revealPassword.confirmPassword ? "eye-outline" : "eye-off-outline"}></ion-icon></span> 
            </div>
            <div className="relative">
              <label htmlFor="confirmPassword" className="text-sm">
                Confirm Password:
              </label>
              <input
                type={revealPassword.password ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="text-sm border-2 border-gray-200 p-2 rounded w-full"
                required
              />
            <span className="absolute right-3 bottom-1 cursor-pointer" onClick={() => togglePassword("password")}><ion-icon name={revealPassword.password ? "eye-outline" : "eye-off-outline"}></ion-icon></span> 
            </div>
            <a href="/" className="text-xs underline text-blue-600 ">Already have an account?</a>
            <div>
              <button
                type="submit"
                className={`w-full text-white p-2 rounded  hover:opacity-70 ${ isLoading ? "bg-orange-200" : "bg-orange-400"}`} disabled={isLoading}>
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="w-px h-96 bg-gray-200 mx-10"></div>
        <div className="gap-4  w-96 flex flex-col  items-center">
          <div className="me-10">
            <img src="/images/logo.png" alt="My Cart Logo" width="120" className=""/>
          </div>
          <div>
            <p className="indent-5 text-sm text-gray-600 ">
              Before you register with mycart, please ensure that all the
              information you provide is accurate and true. This will help us
              create your account smoothly and ensure a great experience. After
              submitting, check your email for a confirmation message. If you
              have questions, our support team is here to assist!
            </p>
          </div>
          <div className="m-5">
            <p className="text-gray-400 text-sm flex flex-row items-center">
              <hr className="w-20" />
              <span className="italic"> or login using </span>
              <hr className="w-20" />
            </p>
          </div>

          <div className="w-full flex flex-col gap-2">
            <div className="justify-center flex cursor-pointer gap-2 flex-row py-1 items-center rounded-full border w-full ">
              <img src="/images/fbIcon.png" alt="Facebook Logo" width="20" />
              <span className="text-sm text-gray-700">Facebook</span>
            </div>
            <div className="hover:shadow-sm bg-white cursor-pointer justify-center flex flex-row  gap-4 bg-blue-500 py-1 items-center rounded-full border w-full ">
              <img src="/images/google.png" alt="Google Logo" width="20" />
              <span className="text-sm text-gray-700">Google</span>
            </div>
            <div className="hover:shadow-sm cursor-pointer justify-center flex flex-row gap-4 py-1 items-center rounded-full border border w-full ">
              <img
                src="/images/xtwitter.png"
                alt="Google Logo"
                width="20"
                className="bg-white rounded-full"
              />
              <span className="text-sm text-gray-700">Twitter</span>
            </div>
            <a href="https://9d64-180-191-32-15.ngrok-free.app/auth/github" className="hover:shadow-sm cursor-pointer justify-center flex flex-row gap-4 py-1 items-center rounded-full border border w-full ">
              <img
                src="/images/github.png"
                alt="Google Logo"
                width="20"
                className="bg-white rounded-full"
              />
              <span className="text-sm text-gray-700">Github</span>
            </a>
          </div>
        </div>
        <div className="absolute p-2 bottom-0 right-0">
          <p className="text-gray-300 text-xs text-center">
            © 2024 MyCart. All rights reserved.
          </p>
        </div>
      </div>
      <div className={`absolute bg-white shadow-md border border-gray-300 p-8 rounded transition-transform duration-500 transform ${
          isVisibleSuccess
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <SuccessDisplay message="Success!" success={success} link="/" button="Continue"/>
      </div>
      <div
        className={`absolute top-0 m-5 right-0 z-40 transition-transform duration-500 transform ${
          isVisibleError
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <ErrorDisplay errors={errors} />
      </div>
    </div>
  );
};

export default RegistrationForm;
