import React from "react";
import { FaTruck } from "react-icons/fa";
import { FiCalendar, FiMap, FiUser } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import Table from "../components/Table";
import { orderDetails, orderDetailsColumns } from "../data/OrderDetails";
import { orders } from "../data/orders";

const SingleOrder = () => {
  const { id } = useParams();
  const order = orders.find((order) => order.id === parseInt(id));
  const { customer_name, order_date, status } = order;

  return (
    <div className="pt-20 pb-5 px-4">
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
        
        {/* Order Information */}
        <div className="flex justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <FiCalendar />
              <h3 className="text-lg">{order_date}</h3>
            </div>
            <p className="text-sm text-gray-600">Order ID #{order.id}</p>
          </div>
          <span className={`px-3 py-1 rounded bg-blue-100 text-blue-500 ${status}`}>
            {status}
          </span>
        </div>
        
        <hr className="mb-4" />
        
        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Customer Info */}
          <div className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="p-2 bg-blue-100 rounded-full text-blue-500">
                <FiUser />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Customer</h4>
              <p className="text-sm mb-2">Name: <span className="text-gray-600">{customer_name}</span></p>
              <p className="text-sm mb-2">Email: <span className="text-gray-600">example@gmail.com</span></p>
              <p className="text-sm mb-2">Phone: <span className="text-gray-600">+256 775 358738</span></p>
              <Link to="#" className="px-3 py-1 bg-blue-100 text-blue-500 rounded">View Profile</Link>
            </div>
          </div>

          {/* Order Info */}
          <div className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="p-2 bg-blue-100 rounded-full text-blue-500">
                <FaTruck />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Order Info</h4>
              <p className="text-sm mb-2">Shipping: <span className="text-gray-600">Forgo express</span></p>
              <p className="text-sm mb-2">Payment Method: <span className="text-gray-600">Card</span></p>
              <p className="text-sm mb-2">Status: <span className="text-gray-600">New</span></p>
              <Link to="#" className="px-3 py-1 bg-blue-100 text-blue-500 rounded">View all</Link>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="p-2 bg-blue-100 rounded-full text-blue-500">
                <FiMap />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p className="text-sm mb-2">City: <span className="text-gray-600">Kampala, Uganda</span></p>
              <p className="text-sm mb-2 text-gray-600">Block F, House 528, Floor 6</p>
              <p className="text-sm mb-2 text-gray-600">P.O Box 893</p>
              <Link to="#" className="px-3 py-1 bg-blue-100 text-blue-500 rounded">View on Map</Link>
            </div>
          </div>
        </div>

        {/* Products Details Table */}
        <h4 className="text-lg font-semibold mb-4">Products Details</h4>
        <Table
          data={orderDetails}
          fields={orderDetailsColumns}
          numberOfRows={orderDetails.length}
          enableTopToolBar={false}
          enableBottomToolBar={false}
          enablePagination={false}
          enableRowSelection={false}
          enableColumnFilters={false}
          enableEditing={false}
          enableColumnDragging={false}
        />

        {/* Order Summary */}
        <div className="flex justify-end mt-4">
          <div className="space-y-2">
            <div className="flex justify-between w-48">
              <p className="text-sm">Subtotal</p>
              <p className="text-sm text-gray-600">$7,523</p>
            </div>
            <div className="flex justify-between w-48">
              <p className="text-sm">Tax (20%)</p>
              <p className="text-sm text-gray-600">$245</p>
            </div>
            <div className="flex justify-between w-48">
              <p className="text-sm">Discount (10%)</p>
              <p className="text-sm text-gray-600">$123</p>
            </div>
            <div className="flex justify-between w-48">
              <p className="text-lg font-semibold">Total</p>
              <p className="text-lg font-semibold text-gray-600">$8,532</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
