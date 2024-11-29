import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ chartData, chartOptions }) => {
  const [options, setOptions] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    setOptions(chartOptions);
    setData(chartData);
  }, [chartData, chartOptions]);

  return (
    <div className="p-4 rounded-lg border border-gray-200 shadow-sm h-full">
      <h2 className="text-lg font-semibold mb-4">Sales Statistics</h2>
      <ReactApexChart
        options={options}
        series={data}
        type="line"
        width="100%"
        height="90%"
      />
    </div>
  );
};

export default LineChart;
