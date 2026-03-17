import React from "react";
import { MdAccessTime, MdCheckCircle, MdErrorOutline } from "react-icons/md";
import { useAppContext } from "../context/AppContext";

const KitchenPage: React.FC = () => {
  const { kitchenOrders, setKitchenOrders } = useAppContext();

  const handleStatusToggle = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "Ready" ? "Preparing" : "Ready";
    setKitchenOrders(kitchenOrders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };
  return (
    <div className="p-5 lg:p-8 space-y-6 overflow-y-auto">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Preparing</p>
            <p className="text-3xl font-bold text-orange-600">
              {kitchenOrders.filter(o => o.status === "Preparing" || o.status === "Delayed").length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
            <MdAccessTime size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Ready</p>
            <p className="text-3xl font-bold text-green-600">
              {kitchenOrders.filter(o => o.status === "Ready").length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500">
            <MdCheckCircle size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Delayed</p>
            <p className="text-3xl font-bold text-red-600">
              {kitchenOrders.filter(o => o.status === "Delayed").length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
            <MdErrorOutline size={24} />
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {kitchenOrders.map((order) => {
          let borderColor = "";
          let statusBg = "";
          let statusText = "";
          let actionLabel = "Mark Ready";
          let actionColor = "bg-green-600 hover:bg-green-700 text-white";

          if (order.status === "Delayed") {
            borderColor = "border-red-100 shadow-sm shadow-red-50 -translate-y-1";
            statusBg = "bg-red-600";
            statusText = "text-white";
          } else if (order.status === "Ready") {
            borderColor = "border-green-200 shadow-sm shadow-green-50 opacity-80";
            statusBg = "bg-green-600";
            statusText = "text-white";
            actionLabel = "Move to Preparing";
            actionColor = "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50";
          } else {
            borderColor = "border-orange-200 shadow-sm shadow-orange-50 -translate-y-1";
            statusBg = "bg-orange-600";
            statusText = "text-white";
          }

          return (
            <div key={order.id} className={`bg-white rounded-3xl border-2 ${borderColor} p-6 flex flex-col transition-transform duration-300`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 leading-none mb-1">#{order.id}</h3>
                  <p className="text-sm text-gray-500 font-medium">Table {order.table}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${statusBg} ${statusText}`}>
                  {order.status === "Delayed" ? "Preparing" : order.status}
                </span>
              </div>

              {order.status === "Delayed" && (
                <div className="flex justify-between items-center bg-red-50 text-red-700 px-4 py-2.5 rounded-xl mb-6">
                  <div className="flex items-center gap-2 font-medium text-sm">
                    <MdAccessTime size={18} /> {order.waitTime}
                  </div>
                  <span className="px-2 py-0.5 bg-red-600 text-white rounded-full text-[10px] font-bold">Delayed</span>
                </div>
              )}
              {order.status !== "Delayed" && (
                <div className="flex justify-between items-center bg-gray-50 text-gray-600 px-4 py-2.5 rounded-xl mb-6">
                  <div className="flex items-center gap-2 font-medium text-sm">
                    <MdAccessTime size={18} /> {order.waitTime}
                  </div>
                </div>
              )}

              <div className="flex-1 space-y-4 mb-6">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="flex items-start gap-3">
                      <span className="text-orange-500 font-bold w-6">{item.quantity}×</span>
                      <div className="flex-1">
                        <span className="text-gray-900 font-semibold">{item.name}</span>
                        {item.dietary === "Veg" && <span className="ml-2 text-[10px] border border-green-500 text-green-600 px-1 rounded">🌱</span>}
                      </div>
                    </div>
                    {item.note && (
                      <p className="text-orange-600 text-xs ml-9 mt-1 font-medium">Note: {item.note}</p>
                    )}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleStatusToggle(order.id, order.status)}
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors duration-200 mt-auto ${actionColor}`}
              >
                {order.status !== "Ready" && <MdCheckCircle size={20} />}
                {actionLabel}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KitchenPage;
