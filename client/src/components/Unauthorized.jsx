import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const goBack = () => {
    if (auth) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-400">
      <div className="max-w-md w-full bg-gray-300 shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4 font-inter text-mediumslateblue text-center">
          Unauthorized Access
        </h2>
        <p className=" mb-6 font-kanit text-white text-center">
          Oops! It looks like you dont have permission to access this page.
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

export default UnauthorizedPage;
