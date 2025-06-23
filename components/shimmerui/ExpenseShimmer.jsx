import React from "react";

const ExpenseShimmer = ({ view = "list" }) => {
  const shimmerItem = (
    <div className="bg-card border border-border rounded-lg p-6 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-3 bg-gray-300 rounded w-1/2" />
          </div>
        </div>
        <div className="h-6 w-16 bg-gray-300 rounded" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-gray-300 rounded w-full" />
        <div className="h-3 bg-gray-300 rounded w-1/2" />
      </div>
    </div>
  );

  return (
    <div
      className={
        view === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          : "space-y-4"
      }
    >
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx}>{shimmerItem}</div>
      ))}
    </div>
  );
};

export default ExpenseShimmer;
