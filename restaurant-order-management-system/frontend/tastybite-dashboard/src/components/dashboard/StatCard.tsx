import React from "react";
import {
  MdAttachMoney,
  MdShoppingCart,
  MdPeople,
  MdTrendingUp,
} from "react-icons/md";
import type { StatCardProps } from "../../types";

const iconMap = {
  dollar: <MdAttachMoney size={22} className="text-gray-400" />,
  cart: <MdShoppingCart size={22} className="text-gray-400" />,
  users: <MdPeople size={22} className="text-gray-400" />,
  trending: <MdTrendingUp size={22} className="text-gray-400" />,
};

const StatCard: React.FC<StatCardProps> = ({ card }) => {
  const changeColorClass =
    card.changeType === "positive"
      ? "text-green-500"
      : card.changeType === "negative"
      ? "text-red-500"
      : "text-gray-400";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 hover:-translate-y-0.5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <p className="text-sm text-gray-500 font-medium">{card.title}</p>
        <span>{iconMap[card.icon]}</span>
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900 tracking-tight">{card.value}</p>
        <p className={`text-sm mt-1 font-medium ${changeColorClass}`}>{card.change}</p>
      </div>
    </div>
  );
};

export default StatCard;
