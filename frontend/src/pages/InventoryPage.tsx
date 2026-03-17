import React, { useState } from "react";
import { MdInventory, MdTrendingDown, MdErrorOutline, MdSearch, MdAdd, MdClose, MdKeyboardArrowDown } from "react-icons/md";
import { useAppContext } from "../context/AppContext";

const InventoryPage: React.FC = () => {
  const { inventoryItems: items, setInventoryItems: setItems } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: "Select",
    minQty: "",
    category: "Select category"
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);

  const categories = ["All", "Vegetables", "Meat", "Dairy", "Seafood", "Grains", "Oils"];

  const lowStockItems = items.filter(item => item.status === "Low" || item.status === "Critical");
  const totalItems = items.length;
  const lowStockCount = items.filter(item => item.status === "Low").length;
  const criticalCount = items.filter(item => item.status === "Critical").length;

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this inventory item?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.name || formData.quantity === "" || formData.unit === "Select" || formData.minQty === "" || formData.category === "Select category") {
      alert("Please fill in all fields.");
      return;
    }

    const qty = parseInt(formData.quantity);
    const min = parseInt(formData.minQty);
    let status: "Good" | "Low" | "Critical" = "Good";
    
    if (qty <= min / 2) status = "Critical";
    else if (qty <= min) status = "Low";

    const newItem = {
      id: editingId || Date.now().toString(),
      name: formData.name,
      category: formData.category,
      quantity: qty,
      unit: formData.unit,
      minQty: min,
      status: status
    };

    if (editingId) {
      setItems(items.map(item => item.id === editingId ? newItem : item));
    } else {
      setItems([...items, newItem]);
    }

    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      name: "",
      quantity: "",
      unit: "Select",
      minQty: "",
      category: "Select category"
    });
  };

  const handleEdit = (item: any) => {
    setFormData({
      name: item.name,
      quantity: item.quantity.toString(),
      unit: item.unit,
      minQty: item.minQty.toString(),
      category: item.category
    });
    setEditingId(item.id);
    setIsModalOpen(true);
  };

  const handleOpenNewModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      quantity: "",
      unit: "Select",
      minQty: "",
      category: "Select category"
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-5 lg:p-8 space-y-6 h-full overflow-y-auto w-full max-w-7xl mx-auto relative">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Total Items</p>
            <p className="text-3xl font-bold text-gray-900">{totalItems}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
            <MdInventory size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Low Stock</p>
            <p className="text-3xl font-bold text-orange-600">{lowStockCount}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
            <MdTrendingDown size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Critical</p>
            <p className="text-3xl font-bold text-red-600">{criticalCount}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
            <MdErrorOutline size={24} />
          </div>
        </div>
      </div>

      {/* Low Stock Alerts Banner */}
      <div className="bg-[#FFF8F3] border border-orange-100 p-6 rounded-2xl flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-2 text-[#C0562D] font-bold text-lg min-w-max">
          <MdErrorOutline size={22} className="text-[#C0562D]" />
          Low Stock Alerts
        </div>
        <div className="flex flex-wrap gap-2">
          {lowStockItems.map((item, idx) => (
            <span key={idx} className="bg-[#C92942] text-white rounded-lg px-3 py-1 text-sm font-semibold shadow-sm">
              {item.name}: {item.quantity}{item.unit}
            </span>
          ))}
        </div>
      </div>

      {/* Constraints wrapper for lower half */}
      <div className="flex flex-col gap-6">
        {/* Search & Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between relative z-10">
          <div className="relative flex-1 max-w-2xl bg-gray-50 rounded-xl overflow-hidden flex shadow-sm border border-transparent focus-within:border-gray-200">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search inventory..."
              className="w-full pl-12 pr-4 py-3 bg-transparent border-none outline-none text-sm"
            />
          </div>
          <div className="flex gap-4">
            {/* Custom Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer w-40 shadow-sm font-medium text-gray-700 flex items-center justify-between"
              >
                {selectedCategory}
                <MdKeyboardArrowDown size={18} className="text-gray-400" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-20">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`w-full text-left px-5 py-2.5 text-sm transition-colors ${selectedCategory === cat ? 'bg-orange-50 text-orange-700' : 'hover:bg-gray-50 text-gray-700'}`}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={handleOpenNewModal}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm shadow-orange-200 whitespace-nowrap"
            >
              <MdAdd size={20} />
              Add Item
            </button>
          </div>
        </div>

        {/* Inventory Table Container */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden pb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-100 text-sm font-bold text-gray-900 bg-white">
                  <th className="py-5 px-6">Item Name</th>
                  <th className="py-5 px-6 w-48">Category</th>
                  <th className="py-5 px-6 w-32">Quantity</th>
                  <th className="py-5 px-6 w-32">Min. Qty</th>
                  <th className="py-5 px-6 w-32">Status</th>
                  <th className="py-5 px-6 w-32 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-gray-900">
                {items
                  .filter(item => selectedCategory === "All" || item.category === selectedCategory)
                  .map((item, idx) => (
                  <tr 
                    key={item.id} 
                    className={`${idx === 1 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-50 last:border-none hover:bg-gray-50 transition-colors`}
                  >
                    <td className="py-4 px-6">{item.name}</td>
                    <td className="py-4 px-6">
                      <span className="border border-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs font-semibold bg-white shadow-sm">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">{item.quantity} {item.unit}</td>
                    <td className="py-4 px-6">{item.minQty} {item.unit}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-md text-xs font-bold text-white shadow-sm ${
                        item.status === 'Good' ? 'bg-[#189B48]' :
                        item.status === 'Low' ? 'bg-[#E3541A]' : 'bg-red-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right flex justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                      >
                        Update
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="border border-red-100 text-[#C92942] bg-white hover:bg-red-50 px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Item Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 pb-4 relative">
              <button 
                onClick={() => { setIsModalOpen(false); setEditingId(null); }}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <MdClose size={20} />
              </button>
              <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Update Inventory Item' : 'Add Inventory Item'}</h2>
              <p className="text-sm text-gray-500 mt-1">{editingId ? 'Edit ingredient details' : 'Add a new ingredient to inventory'}</p>
            </div>

            {/* Form Body */}
            <div className="p-6 pt-2 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Item Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Tomatoes" 
                  className="w-full border-2 border-orange-400 rounded-xl px-4 py-2.5 outline-none focus:ring-4 focus:ring-orange-100 transition-all text-gray-900 text-sm placeholder:text-gray-400 shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Quantity</label>
                  <input 
                    type="number" 
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    placeholder="0" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 text-sm placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Unit</label>
                  <div className="relative">
                    <select 
                      value={formData.unit}
                      onChange={(e) => setFormData({...formData, unit: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-500 text-sm appearance-none cursor-pointer"
                    >
                      <option>Select</option>
                      <option>kg</option>
                      <option>L</option>
                      <option>pcs</option>
                    </select>
                    <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Minimum Quantity</label>
                <input 
                  type="number" 
                  value={formData.minQty}
                  onChange={(e) => setFormData({...formData, minQty: e.target.value})}
                  placeholder="0" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 text-sm placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                <div className="relative">
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-500 text-sm appearance-none cursor-pointer"
                  >
                    <option>Select category</option>
                    {categories.slice(1).map(cat => <option key={cat}>{cat}</option>)}
                  </select>
                  <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-5 flex justify-end gap-3 rounded-b-2xl">
              <button 
                onClick={() => { setIsModalOpen(false); setEditingId(null); }}
                className="px-5 py-2 hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm shadow-orange-200"
              >
                {editingId ? 'Update Item' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
