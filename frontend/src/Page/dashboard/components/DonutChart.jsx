import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = ({ chartData, chartOptions }) => {
  const [options, setOptions] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    setOptions(chartOptions);
    setData(chartData);
  }, [chartData, chartOptions]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full h-full">
      <ReactApexChart
        options={options}
        series={data}
        type="donut"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default DonutChart;
