import axios from "axios";
import { Eye, EyeClosed, Lock, LogIn, User } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import weblogo from "../assets/logoAj.png";
import toast from "react-hot-toast";

export const Login = () => {
  const [show, setshow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigate();

  const handelSubmit = (e) => {
    e?.preventDefault?.();
    if (!username.trim() || !password.trim()) return;

    setLoading(true);
    const payload = { username, password };
    axios
      .post("https://admin-apis.vercel.app/login", payload, { withCredentials: true })
      .then((res) => {
        const data = res.data;
        localStorage.setItem(
          "user",
          JSON.stringify({ username: data.username, email: data.email })
        );
        toast.success("Welcome back!");
        navigation("/admin/dashboard");
      })
      .catch((err) => {
        console.log("Status:", err.response?.status);
        console.log("Data:", err.response?.data);
        toast.error("Sign in failed");
      })
      .finally(() => setLoading(false));
  };

  const disabled = !username.trim() || !password.trim() || loading;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-10">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 size-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 size-96 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <form
        onSubmit={handelSubmit}
        className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-(--shadow) animate-fadeUp"
      >
        <div className="flex flex-col items-center text-center">
          <div className="size-12 rounded-2xl bg-primary/15 ring-1 ring-primary/30 flex items-center justify-center overflow-hidden">
            <img src={weblogo} alt="logo" className="size-8 object-contain" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-muted">
            Sign in to your DashBoard account
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted">Username</label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                placeholder="Enter your username"
                className="w-full rounded-xl border border-border bg-card-soft pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-muted">Password</label>
              <button
                type="button"
                className="text-xs font-medium text-accent hover:underline"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
              />
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-card-soft pl-9 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition"
              />
              <button
                type="button"
                onClick={() => setshow(!show)}
                className="absolute right-2 top-1/2 -translate-y-1/2 size-7 rounded-md hover:bg-card flex items-center justify-center text-muted hover:text-foreground transition"
              >
                {show ? <EyeClosed size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs text-muted cursor-pointer select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="size-4 accent-primary cursor-pointer"
            />
            Remember me on this device
          </label>
        </div>

        <button
          type="submit"
          disabled={disabled}
          className={`mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition
            ${disabled
              ? "bg-card-soft text-muted cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-accent-soft active:scale-[0.98] cursor-pointer shadow-(--shadow)"}`}
        >
          {loading ? (
            <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <LogIn size={15} />
          )}
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="mt-5 text-center text-xs text-muted">
          Protected by Golden Glow · v1.0
        </p>
      </form>
    </div>
  );
};
