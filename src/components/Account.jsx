import { ChevronDown, CircleUser, LogOutIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let nagation = useNavigate();
  const handleUserInfo =()=>{
    nagation("/admin/admin+info")
  }
  return (
    <div className="relative group flex flex-col z-99 items-end p-5">
      <div onClick={handleUserInfo} className="flex gap-1 items-center cursor-pointer">
        <CircleUser
          className="transition-all duration-300 group-hover:text-muted"
          size={20}
        />
        <h1 className="text-sm transition-all duration-300 group-hover:text-muted">
          Account
        </h1>
        <ChevronDown
          className="transition-transform duration-300 group-hover:-rotate-180 group-hover:text-muted"
          size={18}
          
        />
      </div>
      <div
        className="absolute top-12 right-0 opacity-0 invisible  group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-background border px-4 py-4 border-foreground rounded-2xl shadow-lg min-w-45"
      >
        <div className="flex flex-col items-start">
          <h1 className="text-foreground text-lg">{user?.username}</h1>
          <h2 className="text-muted text-sm">{user?.email}</h2>
        </div>

        <hr className="border w-full border-muted my-4" />

        <button
          onClick={() => {
            localStorage.removeItem("token");
            nagation("/login");
          }}
          className="text-sm text-muted hover:text-red-500 flex gap-1 items-center"
        >
          <LogOutIcon size={13} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
