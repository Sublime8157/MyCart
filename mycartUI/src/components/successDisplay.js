import React from "react";

const SuccessDisplay = ({ success, message, link, button }) => { 
  if (!success) return null;

  return (
    <div className="relative flex flex-col gap-4 items-center justify-center h-40 w-60">
      <div>
        <p className="text-green-500 text-2xl font-bold">{message}</p>
      </div>
      <div className="text-sm text-center">{success}</div>
      <a href={link} className="py-1 w-full text-center shadow-sm hover:opacity-70 cursor-pointer bg-green-500 text-white rounded">{button}</a>
    </div>
  );
};

export default SuccessDisplay;
