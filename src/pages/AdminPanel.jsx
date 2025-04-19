// // src/pages/AdminPanel.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminPanel = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Admin Dashboard</h2>

//         <div className="space-y-4">
//           <button
//             onClick={() => navigate('/verify')}
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
//           >
//             Register Verifier
//           </button>

//           <button
//             onClick={() => navigate('/register')}
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
//           >
//             Register College
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;
import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-[#0f051d] text-white py-12 px-4 sm:px-6 lg:px-8 mt-18">
      <div className="max-w-7xl mx-auto">
        {/* Admin Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-indigo-400">Admin</span> Dashboard
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Manage institutions, verifiers, and system configurations
          </p>
        </div>

        {/* Admin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Register Institution */}
          <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
                <span className="text-2xl">🏫</span>
              </div>
              <h3 className="text-xl font-semibold">Institutions</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              Approve new educational institutions and manage existing ones
            </p>
            <div className="space-y-3">
              <Link
                to="/admin/register-institution"
                className="block text-center bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Add New Institution
              </Link>
              <Link
                to="/admin/manage-institutions"
                className="block text-center bg-[#0f051d] hover:bg-[#1c0a35] border border-indigo-500/30 px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Manage Institutions
              </Link>
            </div>
          </div>

          {/* Register Verifier */}
          <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold">Verifiers</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              Authorize organizations to verify certificates on the blockchain
            </p>
            <div className="space-y-3">
              <Link
                to="/admin/register-verifier"
                className="block text-center bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Add New Verifier
              </Link>
              <Link
                to="/admin/manage-verifiers"
                className="block text-center bg-[#0f051d] hover:bg-[#1c0a35] border border-indigo-500/30 px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Manage Verifiers
              </Link>
            </div>
          </div>

          {/* System Management */}
          <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl font-semibold">System</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              Configure platform settings and access logs
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/admin/settings"
                className="text-center bg-[#0f051d] hover:bg-[#1c0a35] border border-indigo-500/30 px-3 py-2 rounded-md text-xs font-medium transition"
              >
                Settings
              </Link>
              <Link
                to="/admin/activity-logs"
                className="text-center bg-[#0f051d] hover:bg-[#1c0a35] border border-indigo-500/30 px-3 py-2 rounded-md text-xs font-medium transition"
              >
                Activity Logs
              </Link>
              <Link
                to="/admin/backup"
                className="text-center bg-[#0f051d] hover:bg-[#1c0a35] border border-indigo-500/30 px-3 py-2 rounded-md text-xs font-medium transition"
              >
                Backup
              </Link>
              <Link
                to="/admin/analytics"
                className="text-center bg-[#0f051d] hover:bg-[#1c0a35] border border-indigo-500/30 px-3 py-2 rounded-md text-xs font-medium transition"
              >
                Analytics
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#1c0a35]/80 p-8 rounded-xl border border-indigo-500/20 mb-10">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <span className="text-indigo-400 mr-2">📋</span>
            Recent Activity
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-indigo-500/20">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Action</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Details</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-500/20">
                {[
                  { action: "New Institution", user: "Stanford University", details: "0x7f...3a4b", time: "2 hours ago" },
                  { action: "Certificate Issued", user: "MIT", details: "BSc Computer Science", time: "5 hours ago" },
                  { action: "New Verifier", user: "Google LLC", details: "0x9e...7c2d", time: "1 day ago" },
                  { action: "System Update", user: "Admin", details: "v1.2.0 deployed", time: "2 days ago" },
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{item.action}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{item.user}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{item.details}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;