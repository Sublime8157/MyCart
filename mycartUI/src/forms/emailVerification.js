import React, { useState } from "react";
import  Loading from "../components/loadingDisplay.js"; 
import ErrorDisplay from "../components/errorDisplay.js";
import Success from "../components/successDisplay.js";
const EmailVerification = () => {  
    const [email, setEmail] = useState([]); 
    const [errors, setErrors] = useState([]);  
    const [isLoading, setIsLoading] = useState(false);   
    const [success, setSuccess] = useState(""); 
    const [isVisibleSuccess, setIsVisibleSuccess] = useState(false);
    const handleChange = (e) => {
        setEmail({ ...email, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setErrors([]); 
        setIsLoading(true);
        try {
            const emailAddress = JSON.stringify(email);
            const response = await fetch(`http://localhost:5000/verify/email?email=${encodeURIComponent(emailAddress)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const result = await response.json();  
            if (!response.ok){
                throw result;
            } else if(result.status === "success"){
                setSuccess(result.message); 
                setIsVisibleSuccess(true)
             }
        } catch (e) {
            setIsLoading(false)
            if(e.status === "error"){
                setErrors([e]);
            } else {
                setErrors([ "An unexpected error occurred" ])
            }
        }
    }
    return (
        <div className="flex relative h-screen w-screen justify-start mt-4 flex-col items-center">
             <div className={`absolute bg-white shadow-md border border-gray-300 p-8 rounded transition-transform duration-500 transform ${
                isVisibleSuccess ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
            <Success message="Sent Successfully" success={success} link="/" button="Continue" />
      </div>

            <Loading isLoading={isLoading} />
            <div className="self-start ps-4"><a href="/">Back icon</a></div>
            <h1 className="text-lg mb-4">Please input your email used in your account</h1> 
            <ErrorDisplay errors={errors} />
            <form className="w-4/12 flex flex-col items-center" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col gap-2">
                    <label for="email" className="">Email</label>
                    <div className="">
                        <input type="email" placeholder="Email address" name="email" className="w-full text-sm border-2 border-gray-200 p-2 rounded w-full" onChange={handleChange}/>
                        <p className="my-1 text-xs">Cant remember? <a href="" className="underline text-blue-600">Find account</a></p>
                    </div>
                </div>
                <div className="w-full">
                    <button type="submit" className="w-full rounded py-2 text-white bg-orange-400 hover:opacity-70">Verify</button>
                </div>
            </form>
        </div>
    );
};

export default EmailVerification;
