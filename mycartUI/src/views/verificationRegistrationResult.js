import React, { useState, useEffect } from "react";

const VerificationResult = () => {
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      try {
        const response = await fetch(`/verify?token=${token}`);

        const data = await response.json();
        if (data.success) {
          setIsSuccess(true);
          setMessage(data.message);
        } else {
          setIsSuccess(false);
          setMessage(data.message);
        }
      } catch (error) {
        setIsSuccess(false);
        setMessage("Failed to verify your account. Please try again.");
      }
    };
    verifyUser();
  }, []);
  return (
    <div className="relative h-screen w-screen flex items-center justify-center">
      {isSuccess === null && (
        <div>
          <div className="absolute z-40 h-screen w-screen flex items-center justify-center">
            <div className="loader" />
          </div>
        </div>
      )}
      {isSuccess !== null && (
        <div className="flex flex-col gap-4 items-center ">
          {isSuccess ? (
            <div>
              <img src="./images/checkIcon.png" width={150} />
            </div>
          ) : (
            <div>
              <img src="./images/failIcon.png" width={150} />
            </div>
          )}
          <p className="w-80 text-center text-lg text-gray-800 italic">{message}</p>
        </div>
      )}
    </div>
  );
};

export default VerificationResult;
