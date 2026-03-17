import React, { useState, useMemo } from "react";
import { MdSearch, MdAdd, MdEdit, MdDelete, MdClose, MdKeyboardArrowDown } from "react-icons/md";
import { useAppContext } from "../context/AppContext";

const MenuPage: React.FC = () => {
  const { menuItems: items, setMenuItems: setItems } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // For Editing
  const [editingItem, setEditingItem] = useState<any>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Select category",
    prepTime: "",
    dietary: "Non-Veg",
  });

  const categories = ["All", "Pizza", "Main Course", "Salads", "Pasta", "Burgers", "Desserts", "Beverages", "Appetizers"];

  // Filtering Logic
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  // Actions
  const handleToggleAvailable = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      prepTime: item.prepTime.replace(/\D/g, ''), // Extract just the number
      dietary: item.dietary,
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "Select category",
      prepTime: "",
      dietary: "Non-Veg",
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || formData.category === "Select category" || !formData.price || !formData.prepTime) {
      alert("Please fill in all required fields.");
      return;
    }

    const itemPayload = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      prepTime: `${formData.prepTime} min`,
      dietary: formData.dietary as "Veg" | "Non-Veg",
      available: editingItem ? editingItem.available : true,
      image: editingItem ? editingItem.image : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2000&auto=format&fit=crop", 
    };

    if (editingItem) {
      setItems(items.map(item => item.id === editingItem.id ? { ...itemPayload, id: item.id } as any : item));
    } else {
      setItems([...items, { ...itemPayload, id: Date.now().toString() } as any]);
    }
    
    setIsModalOpen(false);
  };

  return (
    <div className="p-5 lg:p-8 h-full overflow-y-auto w-full relative">
      <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center relative z-10">
        <div className="relative w-full sm:w-[400px]">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm transition-shadow"
          />
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
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
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden flex flex-col z-50">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`text-left px-5 py-2.5 text-sm transition-colors ${selectedCategory === cat ? 'bg-orange-50 text-orange-700' : 'hover:bg-gray-50 text-gray-700'}`}
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
            onClick={handleAddNew}
            className="bg-orange-500 hover:bg-orange-600 shadow-sm shadow-orange-200 text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
          >
            <MdAdd size={20} />
            Add Item
          </button>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-0">
        {filteredItems.map((item) => (
          <div key={item.id} className={`bg-white rounded-2xl border ${!item.available ? 'border-gray-200 opacity-60' : 'border-gray-100 hover:shadow-lg'} overflow-hidden transition-all duration-200 flex flex-col`}>
            {/* Image & Tags */}
            <div className={`relative h-48 shrink-0 ${!item.available ? 'grayscale-[0.5]' : ''}`}>
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm flex items-center gap-1 ${item.dietary === 'Veg' ? 'bg-white text-gray-700' : 'bg-[#C92942] text-white'}`}>
                  {item.dietary === 'Veg' && <span className="text-[#189B48] text-[10px]">🌿</span>}
                  {item.dietary}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm ${item.available ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-4 flex-1 line-clamp-2">{item.description}</p>
              
              <div className="flex justify-between items-end mb-4 shrink-0">
                <div>
                  <p className="text-xl font-bold text-orange-500">${item.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-400 mt-1">{item.prepTime}</p>
                </div>
                <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-[11px] font-medium border border-gray-200 shadow-sm">
                  {item.category}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-100 shrink-0">
                <button 
                  onClick={() => handleToggleAvailable(item.id)}
                  className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm"
                >
                  {item.available ? 'Mark Unavailable' : 'Mark Available'}
                </button>
                <button 
                  onClick={() => handleEdit(item)}
                  className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl transition-colors shadow-sm"
                >
                  <MdEdit size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 border border-red-100 hover:bg-red-50 text-[#C92942] rounded-xl transition-colors shadow-sm"
                >
                  <MdDelete size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            No menu items found matching your filters.
          </div>
        )}
      </div>
      </div>

      {/* Add/Edit Menu Item Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[520px] overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 pb-4 relative">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <MdClose size={20} />
              </button>
              <h2 className="text-xl font-bold text-gray-900">{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
              <p className="text-sm text-gray-500 mt-1">{editingItem ? 'Update details for this dish' : 'Add a new dish to your restaurant menu'}</p>
            </div>

            {/* Form Body */}
            <div className="p-6 pt-2 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Item Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Margherita Pizza" 
                  className="w-full border-2 border-orange-400 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-orange-100 transition-all text-gray-900 text-sm placeholder:text-gray-400 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the dish..." 
                  rows={3}
                  className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 outline-none focus:border-gray-200 transition-all text-gray-900 text-sm placeholder:text-gray-400 resize-none hover:bg-gray-100"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="0.00" 
                    className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 outline-none focus:border-gray-200 transition-all text-gray-900 text-sm placeholder:text-gray-400 hover:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                  <div className="relative">
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 outline-none focus:border-gray-200 transition-all text-gray-500 text-sm appearance-none cursor-pointer hover:bg-gray-100"
                    >
                      <option>Select category</option>
                      {categories.slice(1).map(cat => <option key={cat}>{cat}</option>)}
                    </select>
                    <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-end">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Prep Time (min)</label>
                  <input 
                    type="number" 
                    value={formData.prepTime}
                    onChange={(e) => setFormData({...formData, prepTime: e.target.value})}
                    placeholder="15" 
                    className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 outline-none focus:border-gray-200 transition-all text-gray-900 text-sm placeholder:text-gray-400 hover:bg-gray-100"
                  />
                </div>
                <div className="flex items-center h-[46px] gap-3 px-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={formData.dietary === "Veg"}
                      onChange={(e) => setFormData({...formData, dietary: e.target.checked ? "Veg" : "Non-Veg"})}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                  <span className="text-sm font-semibold text-gray-900">Vegetarian</span>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-5 flex justify-end gap-3 rounded-b-2xl">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm shadow-orange-200"
              >
                {editingItem ? 'Save Changes' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
