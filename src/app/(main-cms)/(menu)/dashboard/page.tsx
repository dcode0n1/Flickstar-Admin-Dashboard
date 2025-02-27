"use client";

import Card from "@/components/DataCard";
import { dashboardCardData } from "@/constants/dashboard-card-routes";

export default function Dashboard(): JSX.Element {
  return (
    <div className="flex flex-1 max-w-full h-full flex-col gap-4 p-4 bg-gray-100">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between md:items-center p-4 rounded-lg">
        <span className="text-lg md:text-2xl text-gray-800">
          Welcome back, <span className="text-blue-500 font-semibold">Admin</span>
        </span>
        <div className="flex items-center md:mt-0 space-x-2">
          <span className="text-sm">Last Cron Job:</span>
          <span className="text-xs py-0.5 px-3 bg-green-100 rounded-sm">Thu, 14 Nov 2019 00:55:16 GMT</span>
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap gap-4 flex-col sm:flex-row">
        {dashboardCardData.map((card, index) => (
          <div className="flex-1 min-w-[280px] sm:min-w-[calc(50%-1rem)] lg:min-w-[calc(25%-1rem)] " key={index}>
            <Card  {...card} />
          </div>
        ))}
      </div>
    </div>
  );
}
