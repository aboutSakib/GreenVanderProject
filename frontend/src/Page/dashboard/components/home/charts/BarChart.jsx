import React from "react";
import Chart from "react-apexcharts";
import { barChartData, barChartOptions } from "../../../data/chartData";

const BarChart = () => {
  return (
    <div className="p-4 rounded-lg shadow-sm border border-gray-200 h-full">
      <h2 className="text-lg font-semibold mb-4">Sales Statistics</h2>
      <Chart
        options={barChartOptions}
        series={barChartData}
        type="bar"
        width="100%"
        height="90%"
      />
    </div>
  );
};

export default BarChart;
