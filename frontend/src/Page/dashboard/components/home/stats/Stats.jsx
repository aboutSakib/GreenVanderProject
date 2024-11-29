import React from "react";
import { lineChartData, lineChartOptions } from "../../../data/chartData";
import { stats } from "../../../data/stats";
import LineChart from "../charts/LineChart";

const Stats = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map(({ id, title, amount, icon, iconBg, iconColor, isMoney }, i) => (
        <div
          key={id}
          className={`p-4 rounded-lg border border-gray-200 flex flex-col justify-between`}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`p-2 rounded-full`}
              style={{ backgroundColor: iconBg, color: iconColor }}
            >
              {icon}
            </div>
            <div className="text-2xl font-semibold my-2">
              {isMoney ? `$${amount}` : amount}
            </div>
          </div>
          <div className="text-gray-600 mb-4">{title}</div>
          <div className="flex-1">
            <LineChart chartOptions={lineChartOptions} chartData={lineChartData} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
