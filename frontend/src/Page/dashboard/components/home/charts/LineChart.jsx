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
    <div className="p-4 rounded-lg shadow-sm border border-gray-200 h-full w-full">
      <ReactApexChart
        options={options}
        series={data}
        type="line"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default LineChart;
