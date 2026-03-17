import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  menuItems as initialMenuItems, 
  tables as initialTables, 
  inventoryItems as initialInventory, 
  kitchenOrders as initialKitchen,
  historicalOrders as initialHistorical
} from '../data/dashboardData';
import { MenuItem, Table, KitchenOrder, HistoricalOrder } from '../types';

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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from LocalStorage or fallback to initial data
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('tastybite_menu');
    return saved ? JSON.parse(saved) : initialMenuItems;
  });

  const [tables, setTables] = useState<Table[]>(() => {
    const saved = localStorage.getItem('tastybite_tables');
    return saved ? JSON.parse(saved) : initialTables;
  });

  const [inventoryItems, setInventoryItems] = useState<any[]>(() => {
    const saved = localStorage.getItem('tastybite_inventory');
    return saved ? JSON.parse(saved) : initialInventory;
  });

  const [kitchenOrders, setKitchenOrders] = useState<KitchenOrder[]>(() => {
    const saved = localStorage.getItem('tastybite_kitchen');
    return saved ? JSON.parse(saved) : initialKitchen;
  });

  const [historicalOrders, setHistoricalOrders] = useState<HistoricalOrder[]>(() => {
    const saved = localStorage.getItem('tastybite_historical');
    return saved ? JSON.parse(saved) : initialHistorical;
  });

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('tastybite_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('tastybite_tables', JSON.stringify(tables));
  }, [tables]);

  useEffect(() => {
    localStorage.setItem('tastybite_inventory', JSON.stringify(inventoryItems));
  }, [inventoryItems]);

  useEffect(() => {
    localStorage.setItem('tastybite_kitchen', JSON.stringify(kitchenOrders));
  }, [kitchenOrders]);

  useEffect(() => {
    localStorage.setItem('tastybite_historical', JSON.stringify(historicalOrders));
  }, [historicalOrders]);

  return (
    <AppContext.Provider 
      value={{ 
        menuItems, setMenuItems, 
        tables, setTables, 
        inventoryItems, setInventoryItems,
        kitchenOrders, setKitchenOrders,
        historicalOrders, setHistoricalOrders
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
