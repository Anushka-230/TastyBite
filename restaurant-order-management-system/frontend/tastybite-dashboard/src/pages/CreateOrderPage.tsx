import React, { useState, useMemo, useRef, useEffect } from "react";
import { MdSearch, MdShoppingCart, MdKeyboardArrowDown, MdCheck, MdDeleteOutline, MdAdd, MdRemove } from "react-icons/md";
import { useAppContext } from "../context/AppContext";
import { MenuItem, Table, KitchenOrder, HistoricalOrder } from "../types";

const categories = ["All", "Pizza", "Main Course", "Salads", "Pasta", "Burgers", "Desserts", "Beverages", "Appetizers"];

interface CartItem extends MenuItem {
  quantity: number;
}

const CreateOrderPage: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [isTableDropdownOpen, setIsTableDropdownOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);

  const { menuItems, tables: allTables, setTables, kitchenOrders, setKitchenOrders, historicalOrders, setHistoricalOrders } = useAppContext();

  const tableDropdownRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tableDropdownRef.current && !tableDropdownRef.current.contains(event.target as Node)) {
        setIsTableDropdownOpen(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const freeTables = useMemo(() => allTables.filter(t => t.status === "Free"), [allTables]);

  const filteredMenu = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleAddToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) {
        return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(c => {
      if (c.id === id) {
        const newQuantity = c.quantity + delta;
        return { ...c, quantity: Math.max(1, newQuantity) };
      }
      return c;
    }));
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(c => c.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmitOrder = () => {
    if (!selectedTable) {
      alert("Please select a table to submit the order.");
      return;
    }
    if (cart.length === 0) {
      alert("Please add items to the cart.");
      return;
    }

    const orderId = `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    const now = new Date();

    // 1. Update Table Status
    setTables(allTables.map(t => t.id === selectedTable.id ? { ...t, status: "Occupied" } : t));

    // 2. Add to Kitchen Orders
    const newKitchenOrder: KitchenOrder = {
      id: orderId.replace('ORD-', ''),
      table: selectedTable.number,
      status: "Preparing",
      waitTime: "0 min",
      items: cart.map(item => ({
        quantity: item.quantity,
        name: item.name,
        dietary: item.dietary,
      }))
    };
    setKitchenOrders([...kitchenOrders, newKitchenOrder]);

    // 3. Add to Historical Orders
    const newHistoricalOrder: HistoricalOrder = {
      id: orderId,
      table: `Table ${selectedTable.number}`,
      waiter: "System",
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      items: totalItems,
      status: "Preparing",
      amount: total,
    };
    setHistoricalOrders([newHistoricalOrder, ...historicalOrders]);

    // Cleanup
    alert(`Order ${orderId} submitted successfully!`);
    setCart([]);
    setSelectedTable(null);
  };

  return (
    <div className="p-5 lg:p-8 flex flex-col xl:flex-row gap-6 h-full overflow-hidden">
      {/* Main Area */}
      <div className="flex-1 flex flex-col space-y-6 overflow-y-auto">
        {/* Controls */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col gap-4 shadow-sm">
          <div ref={tableDropdownRef} className="relative">
            <label className="block text-sm font-medium text-gray-900 mb-1">Select Table</label>
            <button 
              onClick={() => setIsTableDropdownOpen(!isTableDropdownOpen)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm text-gray-500 flex justify-between items-center focus:ring-2 focus:ring-orange-500 outline-none"
            >
              <span className={selectedTable ? "text-gray-900" : ""}>
                {selectedTable ? `Table ${selectedTable.number} (${selectedTable.seats} seats)` : "Choose a table"}
              </span>
              <MdKeyboardArrowDown size={20} className={`transition-transform text-gray-400 ${isTableDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isTableDropdownOpen && (
              <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-30 py-1">
                {freeTables.map(table => (
                  <button
                    key={table.id}
                    onClick={() => { setSelectedTable(table); setIsTableDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-orange-50 transition-colors flex justify-between items-center ${selectedTable?.id === table.id ? 'text-orange-600 bg-orange-50/50' : 'text-gray-700'}`}
                  >
                    Table {table.number} ({table.seats} seats)
                    {selectedTable?.id === table.id && <MdCheck size={18} />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm"
              />
            </div>
            
            {/* Category Dropdown */}
            <div ref={categoryDropdownRef} className="relative w-full xl:w-48">
              <button 
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm font-medium text-gray-900 flex justify-between items-center focus:ring-2 focus:ring-orange-500 outline-none"
              >
                {selectedCategory}
                <MdKeyboardArrowDown size={20} className={`text-gray-400 transition-transform ${isCategoryDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              
              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-1 max-h-60 overflow-y-auto">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); setIsCategoryDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-orange-50 transition-colors flex justify-between items-center ${selectedCategory === cat ? 'text-orange-600 bg-orange-50/50' : 'text-gray-700'}`}
                    >
                      {cat}
                      {selectedCategory === cat && <MdCheck size={18} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
          {filteredMenu.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col">
              <div className="relative h-40 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <span className={`absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm ${item.dietary === 'Veg' ? 'bg-white text-gray-700' : 'bg-red-500 text-white'}`}>
                  {item.dietary === 'Veg' && <span className="text-gray-500 text-[9px]">🌿</span>}
                  {item.dietary}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-md font-bold text-gray-900 mb-1 leading-tight line-clamp-1">{item.name}</h3>
                <p className="text-xs text-gray-500 mb-3 flex-1 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center mt-auto shrink-0">
                  <p className="text-lg font-bold text-orange-500">${item.price.toFixed(2)}</p>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-orange-200 shrink-0"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredMenu.length === 0 && (
             <div className="col-span-full py-12 text-center text-gray-400">
               No menu items found.
             </div>
          )}
        </div>
      </div>

      {/* Cart Panel */}
      <div className="w-full xl:w-[380px] shrink-0 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col h-full min-h-[400px]">
        <h2 className="text-lg font-bold text-gray-900 flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <MdShoppingCart size={22} className="text-gray-800" /> 
            Order Summary
          </div>
          {totalItems > 0 && (
            <span className="bg-orange-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
              {totalItems} items
            </span>
          )}
        </h2>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <MdShoppingCart size={48} className="text-gray-200 mb-4" />
            <p className="text-sm font-medium">Cart is empty</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="relative p-4 border border-gray-50 bg-orange-50/30 rounded-2xl">
                  {/* Remove Button */}
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-500 transition-colors"
                  >
                    <MdDeleteOutline size={20} />
                  </button>

                  <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1 pr-8">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">${item.price.toFixed(2)} &times; {item.quantity}</p>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, -1)} 
                      className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      <MdRemove size={16} />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, 1)} 
                      className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      <MdAdd size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Totals Section */}
            <div className="mt-4 pt-6 border-t border-gray-100 space-y-3 shrink-0">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax (10%)</span>
                <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-100">
                <span className="font-bold text-gray-900 text-lg">Total</span>
                <span className="font-bold text-orange-500 text-xl">${total.toFixed(2)}</span>
              </div>
              
              <button 
                onClick={handleSubmitOrder}
                className="w-full bg-[#fbc5a1] hover:bg-orange-400 text-white py-3 rounded-xl font-bold transition-colors shadow-sm mt-4 text-sm"
              >
                Submit Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateOrderPage;
