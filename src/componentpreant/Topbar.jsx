import { HdmiPortIcon, ListMinus, X } from "lucide-react";
import React from "react";
import logo from "../assets/logoAj.png";
const Topbar = ({ manuopen, setManuopen }) => {
  return (
    <div className="bg-background sticky flex justify-between z-100 shadow-(--shadow) top-0 right-0 p-3 md:-top-40 md:fixed w-full text-4xl">
      <div className=" w-fit" onClick={() => setManuopen((prev) => !prev)}>
        {manuopen ? (
          <div className="animate-slideOut">
            <X size={30} />
          </div>
        ) : (
          <div className="animate-slideIn">
            <ListMinus size={30} />
          </div>
        )}
      </div>
      <div className="flex gap-2 items-center">
        <img src={logo} alt="logo" className="w-6 h-7" />
        <h1 className="font-bold text-base">DeshBoard</h1>
      </div>
    </div>
  );
};

export default Topbar;
