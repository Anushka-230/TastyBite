import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import type { WeeklySalesData } from "../../types";

interface OrderVolumeChartProps {
  data: WeeklySalesData[];
}

interface TooltipPayload {
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-xl rounded-xl px-4 py-3">
        <p className="text-xs text-gray-400 font-medium mb-1">{label}</p>
        <p className="text-sm font-bold text-orange-500">{payload[0].value} orders</p>
      </div>
    );
  }
  return null;
};

const OrderVolumeChart: React.FC<OrderVolumeChartProps> = ({ data }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300">
    <div className="mb-5">
      <h3 className="text-base font-bold text-gray-900">Order Volume</h3>
      <p className="text-sm text-gray-400 mt-0.5">Daily orders for the past week</p>
    </div>
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#fff7ed" }} />
        <Bar dataKey="orders" radius={[6, 6, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === data.length - 1 ? "#ea580c" : "#f97316"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default OrderVolumeChart;
