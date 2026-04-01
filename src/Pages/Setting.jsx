import React, { useEffect, useState } from "react";
import HeadingSubheading from "../components/HeadingSubheading";
import AccountBar from "../componentpreant/AccountBar";
import DesablePopUp from "../components/DesablePopUp";
import { AddButton } from "../components/Button";
import toast from "react-hot-toast";

const Setting = () => {
  const savedTheme = localStorage.getItem("theme");
  let [theme, setTheme] = useState(savedTheme);
  useEffect(() => {
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [theme]);
  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };
  useEffect(() => {
    if (theme === "dark") {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.removeItem("theme");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  let [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    number: "",
    jobTitle: "",
    location: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(userInfo));
    toast.success("Saved successfully ✅");
  };

  return (
    <div className="flex-col gap-2 sm:gap-3 md:gap-4 px-2 py-3 flex w-full">
      <div className="w-full">
        <AccountBar />
      </div>
      <div className="flex justify-between w-full pr-5">
        <div className="pr-3">
          <HeadingSubheading
            h1={"Settings"}
            h2={"Manage your application preferences"}
          />
        </div>
      </div>
      <div className="h-fit w-full flex items-center justify-center pr-2 bg-background ">
        <form
          onSubmit={handleSubmit}
          className="w-full bg-card-soft p-6 rounded-2xl shadow-(--color-shadow) border border-border flex flex-col gap-4"
        >
          <div className="flex items-start flex-col gap-1">
            <h1 className="text-lg text-muted">Full Name</h1>
            <input
              type="text"
              name="fullName"
              onChange={handleChange}
              placeholder="Jane smith"
              className="px-3 shadow-xs w-full py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>

          <div className="flex flex-col items-start gap-1">
            <h1 className="text-lg text-muted">Email Address</h1>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="jane12@gmail.com"
              className="px-3 shadow-xs py-2 w-full rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>

          <div className="flex flex-col items-start gap-1">
            <h1 className="text-lg text-muted">Number</h1>
            <input
              type="number"
              name="number"
              onChange={handleChange}
              placeholder="9876543210"
              className="px-3 shadow-xs py-2 w-full rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>

          <div className="flex flex-col items-start gap-1">
            <h1 className="text-lg text-muted">Job Title</h1>
            <input
              type="text"
              name="jobTitle"
              onChange={handleChange}
              placeholder="Sales manager"
              className="px-3 shadow-xs py-2 w-full rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>

          <div className="flex flex-col items-start gap-1">
            <h1 className="text-lg text-muted">Location</h1>
            <input
              type="text"
              name="location"
              onChange={handleChange}
              placeholder="Jaipur"
              className="px-3 shadow-xs py-2 w-full rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>
          <AddButton children={"Save Changes"} type={"submit"} />
        </form></div>
      <div className="mr-2 mt-3">
        <select
          value={theme}
          onChange={handleThemeChange}
          className="w-full px-2 py-2 md:px-4 md:py-4 mb-5 rounded-lg border bg-card-soft  text-foreground border-(--border) focus:outline-none focus:ring-1 focus:ring-foreground cursor-pointer transition"
        >
          <option value="dark">🌙 Dark</option>
          <option value="light">☀️ Light</option>
        </select>
      </div>
    </div>
  );
};

export default Setting;
