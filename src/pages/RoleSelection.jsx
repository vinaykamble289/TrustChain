import React, { useState } from 'react';
import { User, ShieldCheck, School, BadgeCheck } from 'lucide-react'; // optional icons

const roles = [
  {
    label: 'Student',
    value: 'student',
    icon: <User className="w-5 h-5 text-blue-600" />,
    description: 'Can upload and manage certificates.',
  },
 
  {
    label: 'Verifier',
    value: 'verifier',
    icon: <BadgeCheck className="w-5 h-5 text-green-500" />,
    description: 'Can verify academic credentials.',
  },
  {
    label: 'College',
    value: 'college',
    icon: <School className="w-5 h-5 text-purple-500" />,
    description: 'Issues and manages student certificates.',
  },
];

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRole) return alert('Please select a role.');
    console.log('Selected Role:', selectedRole);
    // navigate or handle role logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Choose Your Role</h2>
        <p className="text-center text-gray-500 mb-4">Please select your role to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {roles.map((role) => (
              <div
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`cursor-pointer border rounded-xl p-4 transition duration-200 shadow-sm ${
                  selectedRole === role.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {role.icon}
                  <h3 className="text-lg font-semibold text-gray-700">{role.label}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-600">{role.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition duration-200"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleSelection;
