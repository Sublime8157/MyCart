import React from "react"; 

const ErrorDisplay = ({ errors }) => {
    if (!errors.length) return null;
    return (
      <div> 
        <ul className="flex flex-col gap-2">
          {errors.map((error, index) => (
            <li key={index} className="rounded-sm text-xs p-6 hover:shadow-lg cursor-pointer text-red-600 bg-red-200 border border-red-700">
              {error.msg} 
            </li>
          ))}
        </ul>
      </div>
    )
}

export default ErrorDisplay;
