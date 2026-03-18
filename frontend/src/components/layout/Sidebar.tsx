import React from "react";
import {
  MdDashboard,
  MdRestaurantMenu,
  MdTableBar,
  MdAddShoppingCart,
  MdOutdoorGrill,
  MdReceipt,
  MdInventory,
  MdHistory,
  MdClose,
  MdPeople,
} from "react-icons/md";
import { LuChefHat } from "react-icons/lu";
import type { SidebarProps, NavItem } from "../../types";
import { navItems } from "../../data/dashboardData";

const iconMap: Record<string, React.ReactElement> = {
  dashboard: <MdDashboard size={20} />,
  menu: <MdRestaurantMenu size={20} />,
  tables: <MdTableBar size={20} />,
  order: <MdAddShoppingCart size={20} />,
  kitchen: <MdOutdoorGrill size={20} />,
  billing: <MdReceipt size={20} />,
  inventory: <MdInventory size={20} />,
  employees: <MdPeople size={20} />,
  history: <MdHistory size={20} />,
};

interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, isActive, onClick }) => (
  <li>
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
        isActive
          ? "bg-orange-500 text-white shadow-md shadow-orange-200"
          : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
      }`}
    >
      <span className={isActive ? "text-white" : "text-gray-400"}>
        {iconMap[item.icon]}
      </span>
      <span>{item.label}</span>
    </button>
  </li>
);

const Sidebar: React.FC<SidebarProps & { activePage: string; onNavigate: (id: string) => void }> = ({
  isOpen,
  onClose,
  activePage,
  onNavigate,
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 z-30 
          flex flex-col transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-orange-200">
              <LuChefHat size={22} className="text-white" />
            </div>
            <div>
              <p className="text-[15px] font-bold text-gray-900 leading-tight">TastyBite</p>
              <p className="text-xs text-gray-400">Restaurant</p>
            </div>
          </div>
          <button
            className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors"
            onClick={onClose}
          >
            <MdClose size={22} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                item={item}
                isActive={activePage === item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
              />
            ))}
          </ul>
        </nav>

        
      </aside>
    </>
  );
};

export default Sidebar;
