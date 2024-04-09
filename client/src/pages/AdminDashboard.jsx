import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const AdminDashboard = () => {
  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-400">
        <div className="max-w-xl w-full bg-gray-400 rounded-md p-8 border-[2px] border-solid border-indigo-700">
          <h2 className="text-3xl font-bold mb-4 font-inter text-indigo-500 text-center">
            Admin Dashboard
          </h2>
          <p className="text-white mb-6 font-inter">
            Welcome to the admin dashboard! Here you can manage various aspects
            of the application.
          </p>
          <div className="space-y-6 flex flex-col">
            <Link to="/clubmoderation" className="no-underline">
              <div className="bg-gray-400 rounded-xl overflow-hidden">
                <div className="bg-indigo-700 py-4 px-6">
                  <h3 className="text-lg font-semibold text-white mb-2 font-inter">
                    Clubs
                  </h3>
                  <p className="text-sm text-white font-inter">
                    View and moderate user posts.
                  </p>
                </div>
              </div>
            </Link>
            <div className="bg-gray-400 rounded-xl overflow-hidden">
              <div className="bg-indigo-700 py-4 px-6">
                <h3 className="text-lg font-semibold text-white mb-2 font-inter">
                  Users
                </h3>
                <p className="text-sm text-white font-inter">
                  Manage user accounts and permissions.
                </p>
              </div>
            </div>
            <Link to="/analytics" className="no-underline">
              <div className="bg-gray-400 rounded-xl overflow-hidden">
                <div className="bg-indigo-700 py-4 px-6">
                  <h3 className="text-lg font-semibold text-white mb-2 font-inter">
                    Generate Report
                  </h3>
                  <p className="text-sm text-white font-inter">
                    Analyze application usage and statistics.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
