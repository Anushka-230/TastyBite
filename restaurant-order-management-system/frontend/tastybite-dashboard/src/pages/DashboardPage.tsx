import React, { useMemo } from "react";
import StatCard from "../components/dashboard/StatCard";
import TopSellingDishes from "../components/dashboard/TopSellingDishes";
import WeeklySalesChart from "../components/charts/WeeklySalesChart";
import OrderVolumeChart from "../components/charts/OrderVolumeChart";
import OrderDistributionChart from "../components/charts/OrderDistributionChart";
import { useAppContext } from "../context/AppContext";
import {
  weeklySalesData,
  topDishes,
  orderDistribution,
} from "../data/dashboardData";

const DashboardPage: React.FC = () => {
  const { historicalOrders, tables } = useAppContext();

  const dynamicStats = useMemo(() => {
    const totalOrders = historicalOrders.length;
    const todayRevenue = historicalOrders.reduce((sum, ord) => sum + ord.amount, 0);
    const avgOrderValue = totalOrders > 0 ? (todayRevenue / totalOrders) : 0;
    
    const activeTables = tables.filter(t => t.status !== "Free").length;

    return [
      {
        id: "revenue",
        title: "Total Revenue",
        value: `$${todayRevenue.toFixed(2)}`,
        change: "+12.5% from yesterday",
        changeType: "positive" as const,
        icon: "dollar" as const,
      },
      {
        id: "orders",
        title: "Total Orders",
        value: totalOrders.toString(),
        change: "+8 from yesterday",
        changeType: "positive" as const,
        icon: "cart" as const,
      },
      {
        id: "tables",
        title: "Active Tables",
        value: `${activeTables}/${tables.length}`,
        change: "Currently occupied",
        changeType: "neutral" as const,
        icon: "users" as const,
      },
      {
        id: "avg-order",
        title: "Avg. Order Value",
        value: `$${avgOrderValue.toFixed(2)}`,
        change: "+5.2% from last week",
        changeType: "positive" as const,
        icon: "trending" as const,
      },
    ];
  }, [historicalOrders, tables]);

  return (
  <div className="p-5 lg:p-8 space-y-6 overflow-y-auto">
    {/* Stat Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {dynamicStats.map((card) => (
        <StatCard key={card.id} card={card} />
      ))}
    </div>

    {/* Charts Row 1 */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <WeeklySalesChart data={weeklySalesData} />
      <OrderVolumeChart data={weeklySalesData} />
    </div>

    {/* Charts Row 2 */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <TopSellingDishes dishes={topDishes} />
      <OrderDistributionChart data={orderDistribution} />
    </div>
  </div>
  );
};

export default DashboardPage;
