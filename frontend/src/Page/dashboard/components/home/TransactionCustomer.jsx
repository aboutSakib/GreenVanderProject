import React from "react";
import { FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";
import { customers } from "../../data/customers";
import { transactions, transactionsColumns } from "../../data/transactions";
import Table from "../Table";

const TransactionCustomer = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Customer List Section */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">New Customer List</h2>
          <FaEllipsisH />
        </div>
        <hr className="my-2" />
        <div className="space-y-4">
          {customers.slice(0, 4).map(({ customer_id, customer_name, email, img }) => (
            <div
              className="flex items-center justify-between"
              key={customer_id}
            >
              <div className="flex items-center gap-4">
                <img loading="lazy" src={img} alt={customer_name} className="w-8 h-8 rounded-full" />
                <div>
                  <h3 className="text-base font-medium">{customer_name}</h3>
                  <p className="text-sm text-gray-500">{email}</p>
                </div>
              </div>
              <FaEllipsisH />
            </div>
          ))}
        </div>
        <hr className="my-2" />
        <div className="text-center mt-2">
          <Link to="/customers" className="text-blue-500 hover:underline">
            View more
          </Link>
        </div>
      </div>

      {/* Transaction List Section */}
      <div className="col-span-1 md:col-span-1 lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Transaction List</h2>
          <FaEllipsisH />
        </div>
        <div className="mt-4">
          <Table
            data={transactions}
            fields={transactionsColumns}
            numberOfRows={3}
            enableTopToolBar={false}
            enableBottomToolBar={false}
            enablePagination={false}
            enableRowSelection={false}
            enableColumnFilters={false}
            enableEditing={false}
            enableColumnDragging={false}
          />
        </div>
        <div className="text-center mt-4">
          <Link to="/transactions" className="text-blue-500 hover:underline">
            View all transactions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TransactionCustomer;
