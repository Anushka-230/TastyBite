import React, { useState } from "react";
import { MdOutlineDateRange, MdFileDownload, MdVisibility } from "react-icons/md";
import { useAppContext } from "../context/AppContext";

const OrderHistoryPage: React.FC = () => {
  const { historicalOrders } = useAppContext();
  const [startDate, setStartDate] = useState("2026-02-19");
  const [endDate, setEndDate] = useState("2026-02-25");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Preparing":
        return "bg-orange-500 text-white";
      case "Ready":
        return "bg-red-500 text-white"; // Using red for Ready as per mockup
      case "Completed":
        return "bg-green-500 text-white";
      case "Cancelled":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-5 lg:p-8 flex flex-col gap-6 h-full overflow-y-auto">
      
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-gray-500 mb-2">Total Revenue</p>
          <h3 className="text-2xl font-bold text-orange-500 mb-1">$249.50</h3>
          <p className="text-xs text-gray-400">From 3 completed orders</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-gray-500 mb-2">Total Orders</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">6</h3>
          <p className="text-xs text-gray-400">Last 7 days</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <p className="text-sm font-medium text-gray-500 mb-2">Avg. Order Value</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">$83.17</h3>
          <p className="text-xs text-gray-400">Per completed order</p>
        </div>
      </div>

      {/* Date Filter & Export */}
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-900">Start Date</label>
          <div className="relative">
            <MdOutlineDateRange className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-900">End Date</label>
          <div className="relative">
            <MdOutlineDateRange className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors w-full md:w-auto h-[42px]">
          <MdFileDownload size={18} /> Export CSV
        </button>
      </div>

      {/* Daily Revenue Chart Area */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Daily Revenue</h2>
        <div className="space-y-4">
          {[
            { date: "Feb 19", val: 2450, w: "55%" },
            { date: "Feb 20", val: 2890, w: "65%" },
            { date: "Feb 21", val: 3120, w: "72%" },
            { date: "Feb 22", val: 2750, w: "62%" },
            { date: "Feb 23", val: 3450, w: "80%" },
            { date: "Feb 24", val: 3890, w: "90%" },
            { date: "Feb 25", val: 4120, w: "100%" },
          ].map((bar, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-sm text-gray-500 w-12 shrink-0">{bar.date}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: bar.w }}
                />
              </div>
              <span className="text-sm font-bold text-gray-900 w-12 text-right shrink-0">${bar.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Order History Table */}
      <div className="bg-white border border-gray-100 rounded-2xl p-0 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Order History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900 w-[15%]">Order ID</th>
                <th className="px-6 py-4 font-medium text-gray-900 w-[15%]">Table</th>
                <th className="px-6 py-4 font-medium text-gray-900 w-[15%]">Waiter</th>
                <th className="px-6 py-4 font-medium text-gray-900 w-[15%]">Date & Time</th>
                <th className="px-6 py-4 font-medium text-gray-900 w-[10%]">Items</th>
                <th className="px-6 py-4 font-medium text-gray-900 w-[10%]">Status</th>
                <th className="px-6 py-4 font-medium text-gray-900 w-[10%]">Amount</th>
                <th className="px-6 py-4 font-medium text-gray-900 w-[10%] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {historicalOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-gray-600">{order.table}</td>
                  <td className="px-6 py-4 text-gray-600">{order.waiter}</td>
                  <td className="px-6 py-4 text-gray-500 space-y-1">
                    <p>{order.date}</p>
                    <p className="text-xs text-gray-400">{order.time}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{order.items} items</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-lg ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">${order.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-gray-400 hover:text-gray-900 transition-colors p-1.5 focus:outline-none">
                      <MdVisibility size={18} />
                    </button>
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

export default OrderHistoryPage;
