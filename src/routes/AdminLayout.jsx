import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../componentpreant/Sidebar";
import Topbar from "../componentpreant/Topbar";
import Footer from "../Pages/Footer";

const AdminLayout = () => {
  const [manuopen, setManuopen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Topbar setManuopen={setManuopen} manuopen={manuopen} />

      {manuopen && (
        <div
          onClick={() => setManuopen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] md:hidden"
        />
      )}

      <div className="flex items-start">
        <Sidebar manuopen={manuopen} setManuopen={setManuopen} />

        <main className="flex-1 min-w-0 min-h-screen flex flex-col">
          <div className="flex-1 px-3 sm:px-5 lg:px-8 pb-8">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
