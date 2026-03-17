import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { MdPeopleOutline, MdClose, MdVisibility, MdQrCodeScanner } from "react-icons/md";
import type { Table } from "../types";

interface TablesPageProps {
  onNavigate?: (page: string) => void;
}

const TablesPage: React.FC<TablesPageProps> = ({ onNavigate }) => {
  const { tables: tablesList, setTables: setTablesList } = useAppContext();
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const freeTables = tablesList.filter((t) => t.status === "Free").length;
  const occupiedTables = tablesList.filter((t) => t.status === "Occupied").length;
  const reservedTables = tablesList.filter((t) => t.status === "Reserved").length;

  const handleStatusChange = (newStatus: "Free" | "Occupied" | "Reserved") => {
    if (!selectedTable) return;
    const updatedTable = { ...selectedTable, status: newStatus };
    setTablesList(tablesList.map(t => t.id === selectedTable.id ? updatedTable : t));
    setSelectedTable(updatedTable);
  };

  const handleViewOrder = () => {
    setSelectedTable(null);
    if (onNavigate) {
      onNavigate("billing");
    }
  };

  return (
    <div className="p-5 lg:p-8 space-y-6 h-full overflow-y-auto w-full relative">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Free Tables</p>
              <p className="text-3xl font-bold text-green-600">{freeTables}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500">
              <MdPeopleOutline size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Occupied</p>
              <p className="text-3xl font-bold text-orange-600">{occupiedTables}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
              <MdPeopleOutline size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Reserved</p>
              <p className="text-3xl font-bold text-blue-600">{reservedTables}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <MdPeopleOutline size={24} />
            </div>
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 pt-4">
          {tablesList.map((table) => {
            let statusColor = "";
            let bgColor = "";
            let shadowHover = "";

            if (table.status === "Free") {
              statusColor = "text-green-600";
              bgColor = "bg-green-50";
              shadowHover = "hover:shadow-green-100/50 hover:border-green-200";
            } else if (table.status === "Occupied") {
              statusColor = "text-orange-600";
              bgColor = "bg-orange-50";
              shadowHover = "hover:shadow-orange-100/50 hover:border-orange-200";
            } else if (table.status === "Reserved") {
              statusColor = "text-blue-600";
              bgColor = "bg-blue-50";
              shadowHover = "hover:shadow-blue-100/50 hover:border-blue-200";
            }

            return (
              <button
                key={table.id}
                onClick={() => setSelectedTable(table)}
                className={`bg-white rounded-3xl border border-gray-100 p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${shadowHover}`}
              >
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mb-4 shadow-inner">
                  <MdPeopleOutline size={32} />
                </div>
                <h3 className="text-gray-900 font-bold mb-1">Table {table.number}</h3>
                <p className="text-xs text-gray-400 mb-4">{table.seats} seats</p>
                
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${statusColor} ${bgColor}`}>
                  {table.status}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Table Details Modal */}
      {selectedTable && !isQrModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[500px] overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 pb-4 relative">
              <button 
                onClick={() => setSelectedTable(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <MdClose size={20} />
              </button>
              <h2 className="text-xl font-bold text-gray-900">Table {selectedTable.number} Details</h2>
              <p className="text-sm text-gray-500 mt-1">Manage table status and view information</p>
            </div>

            <div className="px-6 space-y-6 pb-6">
              {/* Info Row */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Capacity</p>
                  <p className="text-base font-bold text-gray-900">{selectedTable.seats} seats</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500 mb-1">Current Status</p>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold inline-block
                    ${selectedTable.status === 'Free' ? 'bg-green-50 text-green-600' : 
                      selectedTable.status === 'Occupied' ? 'bg-orange-50 text-orange-600' : 
                      'bg-blue-50 text-blue-600'}`
                  }>
                    {selectedTable.status}
                  </span>
                </div>
              </div>

              {/* Current Order Box */}
              <div className="bg-orange-50/50 rounded-2xl p-5 border border-orange-100/50">
                <p className="text-sm font-medium text-gray-500 mb-1">Current Order</p>
                <p className="text-base font-bold text-gray-900 mb-4">ORD-001</p>
                <button 
                  onClick={handleViewOrder}
                  className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors shadow-sm w-fit"
                >
                  <MdVisibility size={18} />
                  View Order
                </button>
              </div>

              {/* Change Status */}
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-3">Change Status</p>
                <div className="flex bg-white border border-gray-100 rounded-xl p-1 shadow-sm">
                  {['Free', 'Occupied', 'Reserved'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status as any)}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                        selectedTable.status === status 
                          ? 'bg-orange-500 text-white shadow-sm shadow-orange-200' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <button 
                onClick={() => setIsQrModalOpen(true)}
                className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm mt-4"
              >
                <MdQrCodeScanner size={20} />
                Generate QR Code
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal Overlay */}
      {isQrModalOpen && selectedTable && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[420px] overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200 text-center">
            {/* Header */}
            <div className="p-6 pb-2 relative text-left">
              <button 
                onClick={() => setIsQrModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <MdClose size={20} />
              </button>
              <h2 className="text-xl font-bold text-gray-900">Table {selectedTable.number} QR Code</h2>
              <p className="text-sm text-gray-500 mt-1">Customers can scan this to order directly</p>
            </div>

            {/* QR Mock Body */}
            <div className="p-8 flex flex-col items-center">
              <div className="w-56 h-56 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                {/* SVG mock of a QR Code */}
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" className="text-gray-500" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3 3H9V9H3V3ZM5 5H7V7H5V5Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M15 3H21V9H15V3ZM17 5H19V7H17V5Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M3 15H9V21H3V15ZM5 17H7V19H5V17Z" fill="currentColor"/>
                  <rect x="15" y="15" width="2" height="2" fill="currentColor"/>
                  <rect x="19" y="15" width="2" height="2" fill="currentColor"/>
                  <rect x="15" y="19" width="2" height="2" fill="currentColor"/>
                  <rect x="19" y="19" width="2" height="2" fill="currentColor"/>
                  <rect x="11" y="3" width="2" height="2" fill="currentColor"/>
                  <rect x="11" y="7" width="2" height="2" fill="currentColor"/>
                  <rect x="11" y="11" width="2" height="2" fill="currentColor"/>
                  <rect x="15" y="11" width="2" height="2" fill="currentColor"/>
                  <rect x="3" y="11" width="2" height="2" fill="currentColor"/>
                  <rect x="7" y="11" width="2" height="2" fill="currentColor"/>
                  <rect x="11" y="15" width="2" height="2" fill="currentColor"/>
                  <rect x="11" y="19" width="2" height="2" fill="currentColor"/>
                  <rect x="19" y="11" width="2" height="2" fill="currentColor"/>
                </svg>
              </div>
              
              <p className="text-gray-500 text-sm font-medium">Scan to access: /customer/{selectedTable.number}</p>
            </div>

            {/* Footer Action */}
            <div className="px-6 py-5 w-full">
              <button 
                onClick={() => setIsQrModalOpen(false)}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-sm transition-colors shadow-sm shadow-orange-200"
              >
                Print QR Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablesPage;
