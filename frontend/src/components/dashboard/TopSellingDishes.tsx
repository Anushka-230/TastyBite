import React from "react";
import type { TopDish } from "../../types";
import TopDishRow from "./TopDishRow";

interface TopSellingDishesProps {
  dishes: TopDish[];
}

const TopSellingDishes: React.FC<TopSellingDishesProps> = ({ dishes }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-base font-bold text-gray-900">Top Selling Dishes</h3>
      <p className="text-sm text-gray-400 mt-0.5">Most popular items this week</p>
    </div>
    <div>
      {dishes.map((dish) => (
        <TopDishRow key={dish.rank} dish={dish} />
      ))}
    </div>
  </div>
);

export default TopSellingDishes;
