import React from "react";
import type { TopDishRowProps } from "../../types";

const TopDishRow: React.FC<TopDishRowProps> = ({ dish }) => (
  <div className="flex items-center gap-4 py-3.5 border-b border-gray-50 last:border-0 hover:bg-orange-50/30 rounded-xl px-2 -mx-2 transition-colors duration-200">
    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
      <span className="text-sm font-bold text-orange-500">{dish.rank}</span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-800 truncate">{dish.name}</p>
      <p className="text-xs text-gray-400 mt-0.5">{dish.orders} orders</p>
    </div>
    <p className="text-sm font-bold text-gray-800 flex-shrink-0">
      ${dish.revenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
    </p>
  </div>
);

export default TopDishRow;
