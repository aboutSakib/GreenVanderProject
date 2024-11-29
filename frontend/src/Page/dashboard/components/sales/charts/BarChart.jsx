import React from "react";
import Chart from "react-apexcharts";
import {
  dailyVisitsBarChartData,
  dailyVisitsBarChartOptions,
} from "../../../data/chartData";

const BarChart = () => {
  return (
    <div className="p-4 rounded-lg border border-gray-200 shadow-sm h-full">
      <h2 className="text-lg font-semibold mb-4">Daily Visits Insights</h2>
      <Chart
        options={dailyVisitsBarChartOptions}
        series={dailyVisitsBarChartData}
        type="bar"
        width="100%"
        height="90%"
      />
    </div>
  );
};

export default BarChart;
