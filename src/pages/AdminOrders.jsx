import React from 'react';

const AdminOrders = ({ darkMode }) => {
  return (
    <div>
      <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
        Orders Management
      </h1>
      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
        Order management page will be implemented soon.
      </p>
    </div>
  );
};

export default AdminOrders; // ← MUST HAVE THIS LINE