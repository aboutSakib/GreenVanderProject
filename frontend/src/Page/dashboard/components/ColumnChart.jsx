import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ColumnChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: false,
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
      labels: {
        show: true,
        style: {
          colors: "gray",
          fontSize: "14px",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      theme: "dark",
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: "Total Sales",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: "Net Profit",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
  ]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ColumnChart;
