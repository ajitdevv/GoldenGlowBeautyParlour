import { ListMinus, X } from "lucide-react";
import React from "react";
import logo from "../assets/logoAj.png";

const Topbar = React.memo(({ manuopen, setManuopen }) => {
  return (
    <div className="md:hidden sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/85 backdrop-blur-xl px-4 py-3">
      <button
        onClick={() => setManuopen((prev) => !prev)}
        className="size-10 rounded-xl bg-card-soft border border-border flex items-center justify-center text-foreground active:scale-95 transition"
      >
        {manuopen ? (
          <X size={20} className="animate-slideOut" />
        ) : (
          <ListMinus size={20} className="animate-slideIn" />
        )}
      </button>

      <div className="flex items-center gap-2">
        <div className="size-8 rounded-lg bg-primary/15 ring-1 ring-primary/30 flex items-center justify-center overflow-hidden">
          <img src={logo} alt="logo" className="size-6 object-contain" />
        </div>
        <h1 className="text-base font-semibold tracking-tight">DashBoard</h1>
      </div>
    </div>
  );
});

export default Topbar;
