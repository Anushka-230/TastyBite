import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { WeeklySalesData } from "../../types";

interface WeeklySalesChartProps {
  data: WeeklySalesData[];
}

interface TooltipPayload {
  value: number;
  name: string;
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
        <p className="text-sm font-bold text-orange-500">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const WeeklySalesChart: React.FC<WeeklySalesChartProps> = ({ data }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300">
    <div className="mb-5">
      <h3 className="text-base font-bold text-gray-900">Weekly Sales</h3>
      <p className="text-sm text-gray-400 mt-0.5">Revenue and order trends for the past 7 days</p>
    </div>
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
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
          tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#f97316"
          strokeWidth={2.5}
          dot={{ r: 4, fill: "#f97316", strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 6, fill: "#f97316" }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default WeeklySalesChart;
