import React, { useState, useRef, useEffect } from "react";
import { MdMenu, MdDarkMode, MdLightMode, MdNotifications, MdCheckCircle, MdLogout } from "react-icons/md";
import { useClerk } from "@clerk/clerk-react";
import type { NavbarProps } from "../../types";

const Navbar: React.FC<NavbarProps & { title?: string }> = ({
  onMenuToggle,
  title = "Dashboard",
}) => {
  const { signOut } = useClerk();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Initialize dark mode based on class
  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-5 lg:px-8 sticky top-0 z-10">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <MdMenu size={22} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          <p className="text-xs text-gray-400 hidden sm:block">{today}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors duration-200"
        >
          {isDarkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
        </button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-xl transition-colors duration-200 ${showNotifications ? 'bg-orange-50 text-orange-600' : 'hover:bg-gray-100 text-gray-500'}`}
          >
            <MdNotifications size={20} />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50">
              <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Notifications</h3>
                <span className="text-xs text-orange-500 font-semibold cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {[
                  { id: 1, title: 'Low Stock Alert', desc: 'Tomatoes are running low (2kg remaining)', time: '5m ago', color: 'text-red-500', bg: 'bg-red-50' },
                  { id: 2, title: 'New Order #1024', desc: 'Table 4 just placed a new order.', time: '12m ago', color: 'text-blue-500', bg: 'bg-blue-50' },
                  { id: 3, title: 'Table 8 Cleared', desc: 'Table 8 payment completed and cleared.', time: '1h ago', color: 'text-green-500', bg: 'bg-green-50' },
                ].map(notif => (
                  <div key={notif.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex gap-3 cursor-pointer">
                    <div className={`w-8 h-8 rounded-full ${notif.bg} ${notif.color} flex items-center justify-center shrink-0 mt-1`}>
                      <MdNotifications size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">{notif.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.desc}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center border-t border-gray-50">
                <button className="text-xs font-bold text-orange-500 hover:text-orange-600">View All</button>
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-2 ml-1 pl-2 border-l border-gray-100">
          <button 
            onClick={handleLogout}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors duration-200"
            title="Logout"
          >
            <MdLogout size={20} />
          </button>
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">AU</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800 leading-tight">Admin User</p>
            <p className="text-[11px] text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
