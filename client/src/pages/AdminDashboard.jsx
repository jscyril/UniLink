const AdminDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
        <p className="text-gray-700 mb-6">
          Welcome to the admin dashboard! Here you can manage various aspects of
          the application.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-500 text-white py-4 px-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Users</h3>
            <p className="text-sm">Manage user accounts and permissions.</p>
          </div>
          <div className="bg-green-500 text-white py-4 px-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Posts</h3>
            <p className="text-sm">View and moderate user posts.</p>
          </div>
          <div className="bg-yellow-500 text-white py-4 px-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Analytics</h3>
            <p className="text-sm">Analyze application usage and statistics.</p>
          </div>
          <div className="bg-purple-500 text-white py-4 px-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Settings</h3>
            <p className="text-sm">Configure application settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
