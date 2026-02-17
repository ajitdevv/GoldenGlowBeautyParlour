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
      .post("/api/login", payload)
      .then((res) => {
        const fullresponse = res.data;
        const token = fullresponse.split(" ").pop();
        localStorage.setItem("token", token);
        console.log("login successful", token);
        navigation("/admin/dashboard");
      })
      .catch((err) => {
        console.log("login failed", err);
      });
  };
  return (
    <div className="bg-card-soft p-4 w-[40%] flex flex-col gap-4 rounded-lg shadow-md">
      <div className="flex flex-col items-start gap-2">
        <h1>User Name</h1>
        <input
          type="text"
          onChange={(e) => setusername(e.target.value)}
          className="bg-accent w-full rounded-lg p-1 pl-2 shadow-md"
        />
      </div>
      <div className="flex flex-col items-start gap-2 ">
        <h1>Password</h1>
        <div className="relative w-full">
          <input
            type={show ? "text" : "password"}
            onChange={(e) => setpassword(e.target.value)}
            className=" bg-accent w-full rounded-lg p-1 pl-2 shadow-md"
          />
          <button onClick={() => setshow(!show)}>
            {show ? (
              <Eye
                size={20}
                className="absolute top-1.5 right-1.5 cursor-pointer"
              />
            ) : (
              <EyeClosed
                size={20}
                className="absolute top-2 right-1.5 cursor-pointer"
              />
            )}
          </button>
        </div>
      </div>
      <button
        onClick={handelSubmit}
        className="bg-primary text-white w-full rounded-lg p-1 mt-2"
      >
        Login
      </button>
    </div>
  );
};
