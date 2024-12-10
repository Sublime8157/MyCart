import React, { useState, useTransition } from "react";
import SuccessDisplay from "../components/successDisplay";
import { useNavigate } from "react-router-dom"; 
const login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isError, setIsError] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState([]);
  const [isVisibleSuccess, setIsVisibleSuccess] = useState(false); 
  const [revealPassword, setRevealPassword] = useState(false); 
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/login/process`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),        
      });

      const result = await response.json();
      if (result.status === "success") {
        setIsLoading(false);
        setSuccess(result.message);
        navigate("/dashboard")
      } else if (result.status === "emailError") {
        setIsVisibleSuccess(true);
        setIsError(result.status);
        setErrors(result.message);
      } else {
        setIsError(result.status);
        setErrors(result.message);
      }
    } catch (e) {
      if (e.errors) {
        setIsError(result.status);
        setErrors(e.errors);
      } else {
        setIsError(result.status);
        setErrors([{ message: "An unexpected error occured." }]);
      }
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = (e) => {
    revealPassword ? setRevealPassword(false) : setRevealPassword(true) 
  }

  return (
    <div className="relative w-screen h-screen flex items-center justify-center relative">
      <div
        className={`absolute bg-white shadow-md border border-gray-300 p-8 rounded transition-transform duration-500 transform ${
          isVisibleSuccess
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}>
        <SuccessDisplay
          success="Your account has not been verified yet, lets verify it!"
          link="/verifyEmail"
          button="Continue"
          message="Verification" 
        />
      </div>
      <div className="p-5 justify-between items-center rounded shadow-sm flex flex-row">
        <div className="border-r mx-10">
          <img src="/images/loginImage.png" width={350} />
        </div>
        <form className="flex flex-col gap-2 w-96" onSubmit={handleSubmit}>
          {/* display errors */}
          <div className={`w-full bg-red-200 py-2 ps-2 text-sm rounded border text-gray-700 border-red-500 ${
              isError === "error" ? "" : "hidden"
            }`}> 
            <div>{errors}</div>
          </div>
          <h2 className="text-gray-800 text-xl">Login</h2>
          <div>
            <label htmlFor="username" className="text-sm">
              Username:
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              id="username"
              value={formData.username}
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
              type={revealPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="text-sm border-2 border-gray-200 p-2 rounded w-full"
              required
            />
            <span className="absolute right-3 bottom-1 cursor-pointer" onClick={togglePassword}><ion-icon name={revealPassword ? "eye-outline" : "eye-off-outline"}></ion-icon></span> 
          </div>
          <a href="/register" className="text-xs text-blue-600 underline ">Don't have an account yet?</a>
          <div>
            <button
              type="submit"
              className="w-full bg-orange-400 text-white rounded py-1 hover:opacity-70"
            >
              Login
            </button>
          </div>
          <div className="flex justify-center flex-row items-center mt-2">
            <hr className="w-20" />
            <span className="italic text-gray-600 text-sm"> Or </span>
            <hr className="w-20" />
          </div>
          <div className="gap-2 flex justify-center mt-2 flex-row items-center">
            <img
              src="/images/fbIcon.png"
              width={20}
              className="rounded-full  cursor-pointer hover:opacity-60"
            />
            <img
              src="/images/google.png"
              width={20}
              className="rounded-full  cursor-pointer hover:opacity-60"
            />
            <img
              src="/images/xTwitter.png"
              width={20}
              className="rounded-full  cursor-pointer hover:opacity-60"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default login;
