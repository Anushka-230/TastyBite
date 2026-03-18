import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, Table, KitchenOrder, HistoricalOrder } from '../types';
import { api } from '../utils/api';

interface AppContextType {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  tables: Table[];
  setTables: React.Dispatch<React.SetStateAction<Table[]>>;
  inventoryItems: any[];
  setInventoryItems: React.Dispatch<React.SetStateAction<any[]>>;
  kitchenOrders: KitchenOrder[];
  setKitchenOrders: React.Dispatch<React.SetStateAction<KitchenOrder[]>>;
  historicalOrders: HistoricalOrder[];
  setHistoricalOrders: React.Dispatch<React.SetStateAction<HistoricalOrder[]>>;
  refreshData: () => Promise<void>;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [inventoryItems, setInventoryItems] = useState<any[]>([]);
  const [kitchenOrders, setKitchenOrders] = useState<KitchenOrder[]>([]);
  const [historicalOrders, setHistoricalOrders] = useState<HistoricalOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const [menuRes, tablesRes, inventoryRes, ordersRes] = await Promise.all([
        api.get<MenuItem[]>('/menu/read.php').catch(() => []),
        api.get<Table[]>('/tables/read.php').catch(() => []),
        api.get<any[]>('/inventory/read.php').catch(() => []),
        api.get<any[]>('/orders/read.php').catch(() => []),
      ]);

      setMenuItems(menuRes || []);
      setTables(tablesRes || []);
      setInventoryItems(inventoryRes || []);

      // Parse Orders into Kitchen and Historical
      const activeOrders = ordersRes.filter((o: any) => o.status !== 'Completed' && o.status !== 'Cancelled');
      const histOrders = ordersRes; // Order history shows all orders
      
      setKitchenOrders(activeOrders as KitchenOrder[]);
      setHistoricalOrders(histOrders as HistoricalOrder[]);
    } catch (err) {
      console.error("Failed to refresh data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <AppContext.Provider 
      value={{ 
        menuItems, setMenuItems, 
        tables, setTables, 
        inventoryItems, setInventoryItems,
        kitchenOrders, setKitchenOrders,
        historicalOrders, setHistoricalOrders,
        refreshData,
        isLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
