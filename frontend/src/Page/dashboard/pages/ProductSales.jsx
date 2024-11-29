import React from "react";
import DonutChart from "../components/DonutChart";
import Table from "../components/Table";
import {
  productSalesDognutChartData,
  productSalesDognutChartOptions,
} from "../data/chartData";
import { productSales, productSalesColumns } from "../data/productSales";

const ProductSales = () => {
  return (
    <div className="pt-20 pb-5 px-4">
      {/* Header */}
      <h2 className="text-xl font-semibold mb-4">Product Sales</h2>

      {/* Donut Chart Section */}
      <div className="mt-2 mb-2 p-4 bg-white rounded-lg shadow border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Product Sales per Category</h3>
        <DonutChart
          chartOptions={productSalesDognutChartOptions}
          chartData={productSalesDognutChartData}
        />
      </div>

      {/* Table Section */}
      <div className="mt-2 mb-2">
        <Table
          data={productSales}
          fields={productSalesColumns}
          numberOfRows={productSales.length}
          enableTopToolBar={true}
          enableBottomToolBar={true}
          enablePagination={true}
          enableRowSelection={true}
          enableColumnFilters={true}
          enableEditing={true}
          enableColumnDragging={true}
        />
      </div>
    </div>
  );
};

export default ProductSales;
