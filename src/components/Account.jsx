import { ChevronDown, LogOutIcon, Settings, UserIcon } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Account = React.memo(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleUserInfo = useCallback(() => {
    setOpen(false);
    navigation("/admin/admin+info");
  }, [navigation]);

  const handleSettings = () => {
    setOpen(false);
    navigation("/admin/setting");
  };

  const handelogout = () => {
    setOpen(false);
    navigation("/login");
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    const onPointerDown = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const initial = (user?.username || "U").charAt(0).toUpperCase();

  return (
    <div ref={wrapperRef} className="relative group flex items-center">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-xl border border-border bg-card-soft/70 hover:bg-card-soft px-2 py-1.5 transition cursor-pointer"
      >
        <span className="size-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
          {initial}
        </span>
        <span className="hidden sm:block text-sm font-medium max-w-30 truncate">
          {user?.username || "Account"}
        </span>
        <ChevronDown
          size={14}
          className={`text-muted transition-transform duration-300 lg:group-hover:rotate-180 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute top-full right-0 mt-2 w-60 origin-top-right transition-all duration-200 z-50 lg:group-hover:opacity-100 lg:group-hover:visible lg:group-hover:scale-100 ${
          open ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"
        }`}
      >
        <div className="rounded-2xl border border-border bg-card shadow-(--shadow) p-3">
          <div className="flex items-center gap-3 px-2 py-2">
            <span className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-base font-semibold">
              {initial}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{user?.username || "Guest"}</p>
              <p className="text-xs text-muted truncate">{user?.email || "no email"}</p>
            </div>
          </div>

          <div className="my-2 h-px bg-border" />

          <button
            onClick={handleUserInfo}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-foreground hover:bg-card-soft transition"
          >
            <UserIcon size={15} className="text-muted" /> Profile
          </button>
          <button
            onClick={handleSettings}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-foreground hover:bg-card-soft transition"
          >
            <Settings size={15} className="text-muted" /> Settings
          </button>

          <div className="my-2 h-px bg-border" />

          <button
            onClick={handelogout}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-danger hover:bg-danger/10 transition"
          >
            <LogOutIcon size={15} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
});

export default Account;
