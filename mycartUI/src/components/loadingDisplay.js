import React from "react";
const ShowLoading = (isLoading) => {
  if (!isLoading) return null;
  return (
    <div className={`bg-gray-50 opacity-70 absolute z-40 h-screen w-screen flex items-center justify-center ${isLoading === true ? "" : "hidden"}`}>
      <div className="loader"></div>
    </div>
  );
};
export default ShowLoading;
