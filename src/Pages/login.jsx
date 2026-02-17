import axios from "axios";
import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  let [show, setshow] = useState(false);
  let [username, setusername] = useState("");
  let [password, setpassword] = useState("");
  let navigation = useNavigate();
  const handelSubmit = () => {
    const payload = {
      username: username,
      password: password,
    };
    axios
      // .post("https://admin-apis.vercel.app/login", payload)
      .post("/api/login", payload)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        console.log("login successful", token);
        navigation("/admin/dashboard");
      })
      .catch((err) => {
        console.log("login failed", err);
      });
  };
  return (
    <div className="w-full h-screen bg-background flex flex-col justify-center items-center">
      <div className="bg-background px-12 py-8 w-[33%] flex flex-col gap-4 rounded-4xl shadow-(--shadow)">
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
          <div>
            <label
              htmlFor="remember-me"
              className="text-sm flex gap-2 items-center justify-start"
            >
              <input type="checkbox" id="remember-me" className="ml-2" />
              <div className="font-bold text-muted"> Remember me</div>
            </label>
          </div>
        </div>

        <button
          onClick={handelSubmit}
          className={`bg-foreground font-bold text-white w-full rounded-lg p-2 mt-2 transform-transition duration-500 ${
            !username.trim() || !password.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-foreground text-white cursor-pointer"
          }`}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};
