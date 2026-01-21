import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaShoppingBag, FaMoneyBillWave, FaUsers, FaStar, 
  FaArrowUp, FaArrowDown, FaCalendarAlt, FaChartBar 
} from 'react-icons/fa';

const AdminDashboard = ({ darkMode }) => {
  const stats = [
    { 
      title: 'Total Products', 
      value: '31', 
      icon: <FaShoppingBag />, 
      color: 'bg-blue-500',
      change: '+5',
      trend: 'up'
    },
    { 
      title: 'Total Revenue', 
      value: 'Rs 145,000', 
      icon: <FaMoneyBillWave />, 
      color: 'bg-green-500',
      change: '+12%',
      trend: 'up'
    },
    { 
      title: 'Total Customers', 
      value: '42', 
      icon: <FaUsers />, 
      color: 'bg-purple-500',
      change: '+8',
      trend: 'up'
    },
    { 
      title: 'Avg Rating', 
      value: '4.8', 
      icon: <FaStar />, 
      color: 'bg-yellow-500',
      change: '+0.2',
      trend: 'up'
    },
  ];

  const recentOrders = [
    { id: '#001', customer: 'Ali Khan', amount: 'Rs 4,999', status: 'Delivered', date: '2024-01-15' },
    { id: '#002', customer: 'Sara Ahmed', amount: 'Rs 5,499', status: 'Processing', date: '2024-01-14' },
    { id: '#003', customer: 'Usman Butt', amount: 'Rs 9,999', status: 'Shipped', date: '2024-01-13' },
    { id: '#004', customer: 'Fatima Malik', amount: 'Rs 7,999', status: 'Pending', date: '2024-01-12' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
          Dashboard Overview
        </h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Welcome to JavaScript Hoodies Admin Panel
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                {stat.icon}
              </div>
              <div className={`flex items-center ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                <span className="ml-1 text-sm">{stat.change}</span>
              </div>
            </div>
            <h3 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>
              {stat.value}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {stat.title}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
            Recent Orders
          </h2>
          <button className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
            <FaCalendarAlt />
            Last 7 days
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Order ID</th>
                <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Customer</th>
                <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Amount</th>
                <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</th>
                <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-200 hover:bg-gray-100'}`}>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {order.id}
                    </span>
                  </td>
                  <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {order.customer}
                  </td>
                  <td className={`py-3 px-4 font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
                    {order.amount}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-900/30 text-green-400' :
                      order.status === 'Processing' ? 'bg-yellow-900/30 text-yellow-400' :
                      order.status === 'Shipped' ? 'bg-blue-900/30 text-blue-400' :
                      'bg-gray-900/30 text-gray-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className={`py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;