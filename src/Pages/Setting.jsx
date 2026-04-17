import React, { useEffect, useState } from "react";
import HeadingSubheading from "../components/HeadingSubheading";
import AccountBar from "../componentpreant/AccountBar";
import { SaveButton } from "../components/Button";
import toast from "react-hot-toast";
import { Briefcase, Mail, MapPin, MoonIcon, Phone, SunIcon, User } from "lucide-react";

const Setting = () => {
  const savedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(savedTheme || "light");

  useEffect(() => {
    if (theme === "dark") {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    number: "",
    jobTitle: "",
    location: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) setUserInfo(JSON.parse(stored));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(userInfo));
    toast.success("Saved successfully ✅");
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-card pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition";

  return (
    <div className="flex flex-col gap-6">
      <AccountBar />

      <div className="animate-fadeUp">
        <HeadingSubheading
          h1={"Settings"}
          h2={"Manage your application preferences"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-fadeUp">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-(--shadow) flex flex-col gap-4"
        >
          <div>
            <h2 className="text-base font-semibold text-foreground">Profile</h2>
            <p className="text-xs text-muted">
              Personal info that will appear on your account.
            </p>
          </div>

          <Field
            icon={<User size={15} />}
            label="Full Name"
            name="fullName"
            value={userInfo.fullName}
            onChange={handleChange}
            placeholder="Jane Smith"
            inputClass={inputClass}
          />
          <Field
            icon={<Mail size={15} />}
            label="Email Address"
            name="email"
            type="email"
            value={userInfo.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            inputClass={inputClass}
          />
          <Field
            icon={<Phone size={15} />}
            label="Phone Number"
            name="number"
            type="tel"
            value={userInfo.number}
            onChange={handleChange}
            placeholder="9876543210"
            inputClass={inputClass}
          />
          <Field
            icon={<Briefcase size={15} />}
            label="Job Title"
            name="jobTitle"
            value={userInfo.jobTitle}
            onChange={handleChange}
            placeholder="Sales Manager"
            inputClass={inputClass}
          />
          <Field
            icon={<MapPin size={15} />}
            label="Location"
            name="location"
            value={userInfo.location}
            onChange={handleChange}
            placeholder="Jaipur"
            inputClass={inputClass}
          />

          <SaveButton type="submit" style="w-full sm:w-fit sm:px-8">
            Save Changes
          </SaveButton>
        </form>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-(--shadow) h-fit">
          <h2 className="text-base font-semibold text-foreground">Appearance</h2>
          <p className="text-xs text-muted">Choose how the app looks to you.</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm transition cursor-pointer ${
                theme === "light"
                  ? "border-primary bg-primary/15 text-foreground"
                  : "border-border bg-card-soft text-muted hover:text-foreground"
              }`}
            >
              <SunIcon size={20} />
              Light
            </button>
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm transition cursor-pointer ${
                theme === "dark"
                  ? "border-primary bg-primary/15 text-foreground"
                  : "border-border bg-card-soft text-muted hover:text-foreground"
              }`}
            >
              <MoonIcon size={20} />
              Dark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ icon, label, name, type = "text", value, onChange, placeholder, inputClass }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-medium text-muted">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">{icon}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  </div>
);

export default Setting;
