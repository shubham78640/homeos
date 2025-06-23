import React from "react";

const ChatShimmer = () => {
  return (
    <div className="space-y-6 px-4 py-6">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-start space-x-3 animate-pulse">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <div className="flex flex-col space-y-2 max-w-xs sm:max-w-md">
            <div className="w-40 h-4 bg-gray-300 rounded" />
            <div className="w-28 h-4 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatShimmer;
