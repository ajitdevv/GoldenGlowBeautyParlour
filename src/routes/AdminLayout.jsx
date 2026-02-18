import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../componentpreant/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex gap-5">
      <div className="w-[21.3%]">
      
        <Sidebar />
      </div>
      <div className="flex-1 p-6 bg-background min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
