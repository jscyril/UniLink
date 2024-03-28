import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4">Unauthorized Access</h2>
        <p className="text-gray-700 mb-6">
          Oops! It looks like you dont have permission to access this page.
        </p>
        <Link
          to="/signin"
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
