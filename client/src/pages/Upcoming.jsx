import React from "react";
import { useNavigate } from "react-router-dom";

const FeatureNotImplementedPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-400">
      <div className="max-w-md w-full bg-gray-300 shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4 font-inter text-mediumslateblue text-center">
          Feature Yet to be Implemented
        </h2>
        <p className=" mb-6 font-kanit text-white text-center">
          Sorry, this feature is not yet available. We are working on it!
        </p>
        <button
          className="inline-block bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300 no-underline font-inter relative left-[190px]"
          onClick={goBack}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default FeatureNotImplementedPage;
