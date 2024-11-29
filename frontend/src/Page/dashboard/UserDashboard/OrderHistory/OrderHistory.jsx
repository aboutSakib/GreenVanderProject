import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Loader from "../../../../Components/Ui/Loader";
import useOrder from "../../../../hook/UseOrder";
import Container from "../../../../shared/Container";

const OrderHistory = () => {
  const { orders, loading,error } = useOrder();


  if (loading || error) {
    return <Loader  isBorder={true}  error={error} extraErrorMessage="Couldnt load order history." isLoading={loading} loadingText={"Order history loading!"} />;
  }

  // Check if orders is defined and has length
  if (!orders || orders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <div>
      <Container>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
          <table className="w-full bg-gray-50 rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">Order ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {!error && orders?.map((orderItem) => (
                <tr key={orderItem._id} className="border-b">
                  <td className="p-3">{orderItem._id}</td>
                  <td className="p-3">
                    {new Date(orderItem.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-green-600">{orderItem.status}</td>
                  <td className="p-3 flex items-center">
                    <FaBangladeshiTakaSign />
                    {orderItem.totalAmount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default OrderHistory;
