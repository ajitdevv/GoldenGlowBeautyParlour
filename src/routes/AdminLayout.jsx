import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../componentpreant/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden gap-5">
      <div className="w-[21.3%] fixed z-100 shrink-0">
      
        <Sidebar />
      </div>
      <div className="flex-1 ml-[22.5%] bg-background overflow-y-auto  min-h-screen ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
