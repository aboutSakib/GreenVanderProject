import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
