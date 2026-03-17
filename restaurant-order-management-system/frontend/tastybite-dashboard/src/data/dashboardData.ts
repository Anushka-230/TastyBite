import type {
  NavItem,
  StatCard,
  WeeklySalesData,
  TopDish,
  OrderDistribution,
  MenuItem,
  Table,
  KitchenOrder,
} from "../types";

export const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard", href: "/" },
  { id: "menu", label: "Menu", icon: "menu", href: "/menu" },
  { id: "tables", label: "Tables", icon: "tables", href: "/tables" },
  { id: "create-order", label: "Create Order", icon: "order", href: "/create-order" },
  { id: "kitchen", label: "Kitchen", icon: "kitchen", href: "/kitchen" },
  { id: "billing", label: "Billing", icon: "billing", href: "/billing" },
  { id: "inventory", label: "Inventory", icon: "inventory", href: "/inventory" },
  { id: "order-history", label: "Order History", icon: "history", href: "/order-history" },
];

export const statCards: StatCard[] = [
  {
    id: "revenue",
    title: "Today's Revenue",
    value: "$4,120.50",
    change: "+12.5% from yesterday",
    changeType: "positive",
    icon: "dollar",
  },
  {
    id: "orders",
    title: "Total Orders",
    value: "78",
    change: "+8 from yesterday",
    changeType: "positive",
    icon: "cart",
  },
  {
    id: "tables",
    title: "Active Tables",
    value: "4/12",
    change: "Currently occupied",
    changeType: "neutral",
    icon: "users",
  },
  {
    id: "avg-order",
    title: "Avg. Order Value",
    value: "$52.83",
    change: "+5.2% from last week",
    changeType: "positive",
    icon: "trending",
  },
];

export const weeklySalesData: WeeklySalesData[] = [
  { date: "Feb 19", revenue: 2600, orders: 44 },
  { date: "Feb 20", revenue: 2950, orders: 52 },
  { date: "Feb 21", revenue: 3100, orders: 58 },
  { date: "Feb 22", revenue: 2820, orders: 48 },
  { date: "Feb 23", revenue: 3300, orders: 63 },
  { date: "Feb 24", revenue: 3550, orders: 72 },
  { date: "Feb 25", revenue: 4120, orders: 80 },
];

export const topDishes: TopDish[] = [
  { rank: 1, name: "Margherita Pizza", orders: 156, revenue: 2026.44 },
  { rank: 2, name: "Chicken Tikka Masala", orders: 142, revenue: 2270.58 },
  { rank: 3, name: "Grilled Salmon", orders: 98, revenue: 2251.02 },
  { rank: 4, name: "Mutton Biryani", orders: 87, revenue: 1217.13 },
  { rank: 5, name: "Vegetable Pasta", orders: 76, revenue: 911.24 },
];

export const orderDistribution: OrderDistribution[] = [
  { name: "Margherita", value: 28, color: "#f97316" },
  { name: "Chicken", value: 25, color: "#22c55e" },
  { name: "Salmon", value: 18, color: "#3b82f6" },
  { name: "Mutton", value: 16, color: "#eab308" },
  { name: "Vegetable", value: 14, color: "#ef4444" },
];

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Classic pizza with tomato, mozzarella, and basil",
    price: 12.99,
    prepTime: "15 min",
    category: "Pizza",
    dietary: "Veg",
    available: true,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2338&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Chicken Tikka Masala",
    description: "Tender chicken in rich tomato and cream sauce",
    price: 15.99,
    prepTime: "20 min",
    category: "Main Course",
    dietary: "Non-Veg",
    available: true,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2271&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with parmesan and croutons",
    price: 8.99,
    prepTime: "10 min",
    category: "Salads",
    dietary: "Veg",
    available: true,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=2340&auto=format&fit=crop",
  },
];

export const tables: Table[] = [
  { id: "1", number: 1, seats: 2, status: "Occupied" },
  { id: "2", number: 2, seats: 4, status: "Free" },
  { id: "3", number: 3, seats: 4, status: "Reserved" },
  { id: "4", number: 4, seats: 6, status: "Occupied" },
  { id: "5", number: 5, seats: 2, status: "Free" },
  { id: "6", number: 6, seats: 4, status: "Free" },
  { id: "7", number: 7, seats: 8, status: "Occupied" },
  { id: "8", number: 8, seats: 2, status: "Free" },
  { id: "9", number: 9, seats: 4, status: "Free" },
  { id: "10", number: 10, seats: 6, status: "Free" },
  { id: "11", number: 11, seats: 4, status: "Free" },
  { id: "12", number: 12, seats: 2, status: "Free" },
];

export const kitchenOrders: KitchenOrder[] = [
  {
    id: "001",
    table: 1,
    status: "Delayed",
    waitTime: "441 min",
    items: [
      { quantity: 2, name: "Margherita Pizza", dietary: "Veg", note: "Extra cheese" },
      { quantity: 2, name: "Fresh Orange Juice", dietary: "Veg" },
    ],
  },
  {
    id: "002",
    table: 4,
    status: "Delayed",
    waitTime: "451 min",
    items: [
      { quantity: 3, name: "Chicken Tikka Masala", dietary: "Non-Veg" },
      { quantity: 1, name: "Vegetable Pasta", dietary: "Veg" },
    ],
  },
  {
    id: "003",
    table: 7,
    status: "Ready",
    waitTime: "461 min",
    items: [
      { quantity: 4, name: "Grilled Salmon", dietary: "Non-Veg" },
    ],
  },
];

export const currentInvoice: {
  restaurantName: string;
  address: string;
  gst: string;
  invoiceId: string;
  tableNumber: number;
  waiter: string;
  date: string;
  time: string;
  items: { name: string; note?: string; qty: number; price: number; total: number }[];
  subtotal: number;
  gstAmount: number;
  totalAmount: number;
} = {
  restaurantName: "TastyBite Restaurant",
  address: "123 Food Street, City",
  gst: "12ABCDE3456F7G8",
  invoiceId: "#ORD-001",
  tableNumber: 1,
  waiter: "John Smith",
  date: "3/17/2026",
  time: "11:07:06 AM",
  items: [
    { name: "Margherita Pizza", note: "Extra cheese", qty: 2, price: 12.99, total: 25.98 },
    { name: "Fresh Orange Juice", qty: 2, price: 4.99, total: 9.98 },
  ],
  subtotal: 35.96,
  gstAmount: 6.47,
  totalAmount: 42.43
};

export const inventoryItems = [
  { id: "1", name: "Tomatoes", category: "Vegetables", quantity: 25, unit: "kg", minQty: 10, status: "Good" },
  { id: "2", name: "Chicken Breast", category: "Meat", quantity: 8, unit: "kg", minQty: 15, status: "Low" },
  { id: "3", name: "Mozzarella Cheese", category: "Dairy", quantity: 12, unit: "kg", minQty: 8, status: "Good" },
  { id: "4", name: "Salmon Fillet", category: "Seafood", quantity: 5, unit: "kg", minQty: 8, status: "Low" },
  { id: "5", name: "Pasta", category: "Grains", quantity: 30, unit: "kg", minQty: 10, status: "Good" },
  { id: "6", name: "Olive Oil", category: "Oils", quantity: 15, unit: "L", minQty: 5, status: "Good" },
  { id: "7", name: "Lettuce", category: "Vegetables", quantity: 6, unit: "kg", minQty: 8, status: "Low" },
  { id: "8", name: "Beef Patty", category: "Meat", quantity: 3, unit: "kg", minQty: 10, status: "Critical" },
];

export const historicalOrders: import("../types").HistoricalOrder[] = [
  { id: "ORD-001", table: "Table 1", waiter: "John Smith", date: "3/17/2026", time: "6:36:29 PM", items: 2, status: "Preparing", amount: 35.96 },
  { id: "ORD-002", table: "Table 4", waiter: "Sarah Johnson", date: "3/17/2026", time: "6:26:29 PM", items: 2, status: "Preparing", amount: 59.96 },
  { id: "ORD-003", table: "Table 7", waiter: "Mike Davis", date: "3/17/2026", time: "6:21:29 PM", items: 2, status: "Ready", amount: 109.94 },
  { id: "ORD-004", table: "Table 11", waiter: "Emily Chen", date: "3/15/2026", time: "8:20:42 PM", items: 2, status: "Completed", amount: 45.50 },
  { id: "ORD-005", table: "Table 3", waiter: "John Smith", date: "3/14/2026", time: "8:20:42 PM", items: 2, status: "Completed", amount: 78.20 },
  { id: "ORD-006", table: "Table 7", waiter: "Sarah Johnson", date: "3/13/2026", time: "8:20:42 PM", items: 2, status: "Completed", amount: 125.80 },
];

