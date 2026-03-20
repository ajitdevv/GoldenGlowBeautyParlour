import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../componentpreant/Sidebar";
import Topbar from "../componentpreant/Topbar";

const AdminLayout = () => {
  let [manuopen, setManuopen] = useState(true);
  return (
    <>
      <Topbar setManuopen={setManuopen} manuopen={manuopen}/>
    <div className="flex h-screen overflow-hidden gap-5">
      <div className=" fixed z-100 shrink-0">
      
        <Sidebar manuopen={manuopen}/>
      </div>
      <div className="flex-1 md:ml-[22.5%] bg-background overflow-y-auto  min-h-screen ">
        <Outlet />
      </div>
    </div></>
  );
};

export default AdminLayout;
