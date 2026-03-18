import React, { useState, useMemo } from "react";
import { MdPrint, MdKeyboardArrowDown } from "react-icons/md";
import { useAppContext } from "../context/AppContext";
import { api } from "../utils/api";

const BillingPage: React.FC = () => {
  const { kitchenOrders, tables, refreshData } = useAppContext();
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);

  // Convert 'any' runtime data attached to kitchenOrders (which retains all API fields)
  // to a usable invoice format
  const activeInvoices = useMemo(() => {
    return kitchenOrders.map((order: any) => {
      return {
        id: order.id,
        restaurantName: "TastyBite Restaurant",
        address: "123 Culinary Avenue, Food City",
        gst: "GSTIN9876543210",
        tableNumber: order.table,
        waiter: order.waiter || "System",
        date: order.date || new Date().toLocaleDateString(),
        time: order.time || new Date().toLocaleTimeString(),
        items: (order.itemsDetail || []).map((item: any) => ({
          name: item.name,
          note: item.note,
          qty: item.quantity,
          price: item.price,
          total: item.price * item.quantity
        })),
        subtotal: order.subtotal || 0,
        gstAmount: order.tax || 0,
        totalAmount: order.amount || 0,
      };
    });
  }, [kitchenOrders]);

  const currentInvoice = useMemo(() => {
    const inv = activeInvoices.find(inv => inv.id === selectedOrderId) || activeInvoices[0] || null;
    if (!inv) return null;
    const discountAmount = inv.subtotal * (discount / 100);
    return {
      ...inv,
      discountAmount,
      totalAmount: Math.max(0, inv.totalAmount - discountAmount)
    };
  }, [activeInvoices, selectedOrderId, discount]);

  const handleCheckout = async () => {
    if (!currentInvoice) return;

    try {
      // 1. Mark order as completed
      await api.put('/orders/update.php', { id: currentInvoice.id, status: 'Completed' });

      // 2. Clear the table
      // Extract number from "Table X" or "X"
      const tableNumberStr = currentInvoice.tableNumber.toString().replace('Table ', '');
      const tableObj = tables.find(t => t.number.toString() === tableNumberStr);
      
      if (tableObj) {
        await api.put('/tables/update.php', { ...tableObj, status: 'Free' });
      }

      await refreshData();
      alert(`Payment completed for ${currentInvoice.id}!`);
      
    } catch (err) {
      alert("Failed to process checkout");
    }
  };

  if (!currentInvoice && activeInvoices.length === 0) {
    return (
      <div className="p-5 lg:p-8 flex items-center justify-center h-full">
        <p className="text-gray-500 font-medium text-lg">No active orders to bill.</p>
      </div>
    );
  }

  return (
    <div className="p-5 lg:p-8 flex flex-col xl:flex-row gap-6 h-full overflow-hidden">
      {/* Left Column: Invoice */}
      <div className="flex-1 bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm flex flex-col h-[calc(100vh-100px)] xl:h-full shrink-0">
        {/* Invoice Header */}
        <div className="bg-orange-500 text-white p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1">{currentInvoice ? currentInvoice.restaurantName : "Loading..."}</h2>
            <p className="text-orange-100 text-sm">{currentInvoice?.address}</p>
            <p className="text-orange-100 text-sm">GST: {currentInvoice?.gst}</p>
          </div>
          <div className="mt-4 sm:mt-0 text-left sm:text-right">
            <p className="text-orange-100 text-sm">Invoice / Order #</p>
            <div className="relative inline-block mt-1">
              <select 
                value={currentInvoice?.id || ""} 
                onChange={(e) => setSelectedOrderId(e.target.value)}
                className="appearance-none bg-orange-400 text-white font-bold text-2xl px-4 py-1 pr-10 rounded-lg outline-none cursor-pointer hover:bg-orange-600 transition-colors"
              >
                {activeInvoices.map((inv) => (
                  <option key={inv.id} value={inv.id} className="text-gray-900 bg-white text-base">
                    {inv.id} ({inv.tableNumber})
                  </option>
                ))}
              </select>
              <MdKeyboardArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white" size={24} />
            </div>
          </div>
        </div>

        {currentInvoice && (
          <div className="p-8 flex-1 overflow-y-auto">
            {/* Invoice Metadata */}
            <div className="grid grid-cols-2 gap-y-6 mb-8 border-b border-gray-100 pb-8">
              <div>
                <p className="text-sm text-gray-500 mb-1">Table</p>
                <p className="font-semibold text-gray-900">{currentInvoice.tableNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Waiter</p>
                <p className="font-semibold text-gray-900">{currentInvoice.waiter}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Date</p>
                <p className="font-semibold text-gray-900">{currentInvoice.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Time</p>
                <p className="font-semibold text-gray-900">{currentInvoice.time}</p>
              </div>
            </div>

            {/* Order Items */}
            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Items</h3>
            <div className="w-full">
              <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm text-gray-500 font-medium mb-4">
                <div className="col-span-6">Item</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              <div className="space-y-5 pb-6 border-b border-gray-200">
                {currentInvoice.items.map((item: any, idx: number) => (
                  <div key={idx} className="grid grid-cols-12 gap-4 text-sm text-gray-900 font-medium">
                    <div className="col-span-6">
                      <p className="font-semibold">{item.name}</p>
                      {item.note && <p className="text-xs text-gray-400 mt-1 font-normal">{item.note}</p>}
                    </div>
                    <div className="col-span-2 text-center">{item.qty}</div>
                    <div className="col-span-2 text-right">${item.price.toFixed(2)}</div>
                    <div className="col-span-2 text-right">${item.total.toFixed(2)}</div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="w-full pt-6 space-y-4">
                <div className="flex justify-between text-base">
                  <p className="text-gray-500">Subtotal</p>
                  <p className="font-semibold text-gray-900">${currentInvoice.subtotal.toFixed(2)}</p>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-base">
                    <p className="text-orange-500">Discount ({discount}%)</p>
                    <p className="font-semibold text-orange-500">-${currentInvoice.discountAmount.toFixed(2)}</p>
                  </div>
                )}
                <div className="flex justify-between text-base pb-6 border-b border-gray-200">
                  <p className="text-gray-500">Tax</p>
                  <p className="font-semibold text-gray-900">${currentInvoice.gstAmount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <p className="text-xl font-bold text-gray-900">Total Amount</p>
                  <p className="text-xl font-bold text-orange-500">${currentInvoice.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Controls */}
      <div className="w-full xl:w-96 flex flex-col gap-6 shrink-0">
        {/* Discount Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4">Discount</h3>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">Discount (%)</label>
            <input 
              type="number" 
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-2 text-sm focus:border-orange-500 focus:bg-white outline-none transition-colors"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => setDiscount(5)} className={`py-2 border rounded-xl text-sm font-medium transition-colors ${discount === 5 ? 'bg-orange-50 text-orange-600 border-orange-200' : 'border-gray-200 hover:bg-gray-50 text-gray-700'}`}>5%</button>
            <button onClick={() => setDiscount(10)} className={`py-2 border rounded-xl text-sm font-medium transition-colors ${discount === 10 ? 'bg-orange-50 text-orange-600 border-orange-200' : 'border-gray-200 hover:bg-gray-50 text-gray-700'}`}>10%</button>
            <button onClick={() => setDiscount(15)} className={`py-2 border rounded-xl text-sm font-medium transition-colors ${discount === 15 ? 'bg-orange-50 text-orange-600 border-orange-200' : 'border-gray-200 hover:bg-gray-50 text-gray-700'}`}>15%</button>
          </div>
        </div>

        {/* Payment Method Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex-1 flex flex-col">
          <h3 className="text-base font-bold text-gray-900 mb-4">Payment Method</h3>
          <select className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm focus:border-orange-500 focus:bg-white outline-none transition-colors mb-auto">
            <option>Cash</option>
            <option>Credit Card</option>
            <option>Digital Wallet</option>
          </select>

          <div className="flex flex-col gap-3 mt-6">
            <button 
              onClick={handleCheckout}
              disabled={!currentInvoice}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors shadow-sm shadow-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Complete Payment
            </button>
            <button 
              onClick={() => window.print()}
              disabled={!currentInvoice}
              className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MdPrint size={18} /> Print Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
