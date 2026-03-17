export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
}

export interface StatCard {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: "dollar" | "cart" | "users" | "trending";
}

export interface WeeklySalesData {
  date: string;
  revenue: number;
  orders: number;
}

export interface TopDish {
  rank: number;
  name: string;
  orders: number;
  revenue: number;
}

export interface OrderDistribution {
  name: string;
  value: number;
  color: string;
}

export interface TableRow {
  id: string;
  orderNumber: string;
  customer: string;
  items: string[];
  total: number;
  status: OrderStatus;
  time: string;
  table: number;
}

export type OrderStatus = "pending" | "preparing" | "ready" | "served" | "cancelled" | "delayed";

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  prepTime: string;
  description: string;
  dietary: "Veg" | "Non-Veg";
  available: boolean;
  image: string;
}

export interface Table {
  id: string;
  number: number;
  seats: number;
  status: "Free" | "Occupied" | "Reserved";
}

export interface KitchenOrder {
  id: string;
  table: number;
  status: "Preparing" | "Ready" | "Delayed";
  waitTime: string;
  items: {
    quantity: number;
    name: string;
    dietary?: "Veg" | "Non-Veg";
    note?: string;
  }[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface InvoiceItem {
  name: string;
  note?: string;
  qty: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  restaurantName: string;
  address: string;
  gst: string;
  tableNumber: string;
  waiter: string;
  date: string;
  time: string;
  items: InvoiceItem[];
  subtotal: number;
  gstAmount: number;
  totalAmount: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minQty: number;
  status: "Good" | "Low" | "Critical";
}

export interface HistoricalOrder {
  id: string;
  table: string;
  waiter: string;
  date: string;
  time: string;
  items: number;
  status: "Preparing" | "Ready" | "Completed" | "Cancelled";
  amount: number;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activePage?: string;
  onNavigate?: (id: string) => void;
}

export interface NavbarProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
  title?: string;
}

export interface StatCardProps {
  card: StatCard;
}

export interface TopDishRowProps {
  dish: TopDish;
}
