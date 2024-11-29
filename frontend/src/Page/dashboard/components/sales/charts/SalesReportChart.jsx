import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const SalesReportChart = ({ chartData, chartOptions }) => {
  const [options, setOptions] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    setOptions(chartOptions);
    setData(chartData);
  }, [chartData, chartOptions]);

  return (
    <div className="p-4 rounded-lg border border-gray-200 shadow-sm h-full">
      <ReactApexChart
        options={options}
        series={data}
        type="pie"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default SalesReportChart;
