import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import DashboardPage from "./pages/DashboardPage";
import MenuPage from "./pages/MenuPage";
import TablesPage from "./pages/TablesPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import KitchenPage from "./pages/KitchenPage";
import BillingPage from "./pages/BillingPage";
import InventoryPage from "./pages/InventoryPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import EmployeesPage from "./pages/EmployeesPage";
import AuthPage from "./pages/auth/AuthPage";
import { useSidebar } from "./hooks/useSidebar";
import { AppProvider } from "./context/AppContext";

const App: React.FC = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { isOpen, toggle, close } = useSidebar();
  const [activePage, setActivePage] = useState<string>("dashboard");

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <AuthPage />;
  }

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;
      case "menu":
        return <MenuPage />;
      case "tables":
        return <TablesPage onNavigate={setActivePage} />;
      case "create-order":
        return <CreateOrderPage />;
      case "kitchen":
        return <KitchenPage />;
      case "billing":
        return <BillingPage />;
      case "inventory":
        return <InventoryPage />;
      case "order-history":
        return <OrderHistoryPage />;
      case "employees":
        return <EmployeesPage />;
      default:
        return (
          <div className="p-8 text-center text-gray-500">
            Page under construction
          </div>
        );
    }
  };

  const pageTitleMap: Record<string, string> = {
    dashboard: "Dashboard",
    menu: "Menu",
    tables: "Tables",
    "create-order": "Create Order",
    kitchen: "Kitchen",
    billing: "Billing",
    inventory: "Inventory",
    "order-history": "Order History",
    employees: "Employees",
  };

  return (
    <AppProvider>
      <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isOpen={isOpen}
          onClose={close}
          activePage={activePage}
          onNavigate={setActivePage}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <Navbar
            onMenuToggle={toggle}
            isSidebarOpen={isOpen}
            title={pageTitleMap[activePage] || "Dashboard"}
          />
          <main className="flex-1 overflow-y-auto">{renderPage()}</main>
        </div>
      </div>
    </AppProvider>
  );
};

export default App;
