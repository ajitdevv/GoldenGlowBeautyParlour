import axios from "axios";
import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  let [show, setshow] = useState(false);
  let [checkBox, setCheckBox] = useState(false);
  let [username, setusername] = useState("");
  let [password, setpassword] = useState("");

  let navigation = useNavigate();
  const handelSubmit = () => {
    const payload = {
      username: username,
      password: password,
    };
    axios
      .post("https://admin-apis.vercel.app/login", payload, { withCredentials: true })
      .then((res) => {
        const data = res.data;
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: data.username,
            email: data.email,
          }),
        );
        navigation("/admin/dashboard");
      })
      .catch((err) => {
        console.log("Status:", err.response?.status);
        console.log("Data:", err.response?.data);
        console.log("Full Error:", err);
      });
  };
  return (
    <div className="w-full h-screen bg-background flex flex-col justify-center items-center">
      <div className="bg-background px-12 py-8 w-[90%] md:w-[33%] flex flex-col gap-4 rounded-4xl shadow-(--shadow)">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Sign in</h1>
          <h2 className="text-sm text-muted">
            Welcome back! Please sign in to your account
          </h2>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-start gap-2">
            <h1 className="font-bold text-sm text-foreground">User Name</h1>
            <input
              type="text"
              onChange={(e) => setusername(e.target.value)}
              className="bg-card w-full rounded-lg p-2 shadow-md"
            />
          </div>
          <div className="flex flex-col items-start gap-2 ">
            <h1 className="font-bold text-sm text-foreground">Password</h1>
            <div className="relative w-full">
              <input
                type={show ? "text" : "password"}
                onChange={(e) => setpassword(e.target.value)}
                className=" bg-card w-full rounded-lg p-2 shadow-md"
              />
              <button onClick={() => setshow(!show)}>
                {show ? (
                  <EyeClosed
                    size={20}
                    className="absolute top-3 right-2 cursor-pointer"
                  />
                ) : (
                  <Eye
                    size={20}
                    className="absolute top-2.5 right-2 cursor-pointer"
                  />
                )}
              </button>
            </div>
          </div>

          <div
            className={`transition-all duration-300 
  ${checkBox ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"}`}
          >
            <h1 className="font-bold text-sm w-full flex items-start text-foreground">
              Re-enter Password
            </h1>

            <input
              type="text"
              onChange={(e) => setpassword(e.target.value)}
              className="bg-card w-full rounded-lg p-2 shadow-md"
            />
          </div>
          <div
            className={`transition-all duration-500  ${checkBox ? "translate-y-0 " : "-translate-y-20 "}`}
          >
            <label
              htmlFor="remember-me"
              className="text-sm flex gap-2 items-center justify-start"
            >
              <input
                type="checkbox"
                onClick={() => setCheckBox(!checkBox)}
                id="remember-me"
                className="ml-2"
              />
              <div className="font-bold text-muted"> Remember me</div>
            </label>
          </div>
        </div>

        <button
          onClick={handelSubmit}
          className={`bg-foreground font-bold text-background w-full rounded-lg p-2 mt-2 transform-transition duration-500 ${
            !username.trim() || !password.trim() ? "bg-muted text-background cursor-not-allowed" : "bg-foreground text-background  cursor-pointer"
          } transition-all duration-300  ${checkBox ? "translate-y-0 " : "-translate-y-20 "}`}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};
