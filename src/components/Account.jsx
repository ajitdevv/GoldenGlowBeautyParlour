import { ChevronDown, CircleUser, LogOutIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DesablePopUp from "./DesablePopUp";

const Account = () => {
  let [popup, setPopUp] = useState(false);
  let user = JSON.parse(localStorage.getItem("user"));
  let navigation = useNavigate();
  const handleUserInfo = () => {
    navigation("/admin/admin+info");
  };

  let handellogout = () => {
    setPopUp(true);
    setTimeout(() => {
      navigation("/login");
      setPopUp(false);
    }, 2000);
  };
  return (
    <div className="relative group flex flex-col z-99 items-end p-5">
      <div
        onClick={handleUserInfo}
        className="flex gap-1 items-center cursor-pointer"
      >
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
      <div className="absolute top-12 right-0 opacity-0 invisible  group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-background border px-4 py-4 border-foreground rounded-2xl shadow-lg min-w-45">
        <div className="flex flex-col items-start">
          <h1 className="text-foreground text-lg">{user?.username}</h1>
          <h2 className="text-muted text-sm">{user?.email}</h2>
        </div>

        <DesablePopUp popup={popup}>Logout successfully ✅</DesablePopUp>
        <hr className="border w-full border-muted my-4" />

        <button
          onClick={() => handellogout()}
          className="text-sm text-muted hover:text-red-500 flex gap-1 items-center"
        >
          <LogOutIcon size={13} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
