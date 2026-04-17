import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Briefcase, Mail, MapPin, Phone, UserPlus } from "lucide-react";
import AccountBar from "../componentpreant/AccountBar";
import HeadingSubheading from "../components/HeadingSubheading";

const AdminInfo = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) setUser(JSON.parse(data));
  }, []);

  const handleNavigate = () => navigation("/admin/setting");

  const initial = user?.fullName?.charAt(0).toUpperCase() || "?";
  const isComplete = user && user.fullName;

  return (
    <div className="flex flex-col gap-6">
      <AccountBar />

      <div className="flex items-center justify-between gap-3 animate-fadeUp">
        <HeadingSubheading
          h1={"My Profile"}
          h2={"Your account details and contact info"}
        />
        <button
          onClick={() => navigation(-1)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-card-soft px-3 py-1.5 text-sm text-muted hover:text-foreground hover:bg-card transition cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="mx-auto w-full max-w-md animate-fadeUp">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-(--shadow)">
          <div className="relative h-24 bg-linear-to-br from-primary via-accent-soft to-accent">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_60%)]" />
          </div>

          <div className="relative px-6 pb-7 -mt-10 flex flex-col items-center text-center">
            <div className="size-20 rounded-2xl border-4 border-card bg-card flex items-center justify-center text-2xl font-bold text-accent shadow-(--shadow)">
              {initial}
            </div>

            {isComplete ? (
              <>
                <h2 className="mt-3 text-lg font-semibold text-foreground">{user.fullName}</h2>
                <p className="text-xs text-muted">
                  {user.jobTitle || "No job title added"}
                </p>

                <div className="my-5 h-px w-full bg-border" />

                <div className="w-full space-y-2 text-left">
                  <Row icon={<Mail size={14} className="text-info" />} label="Email" value={user.email} />
                  <Row icon={<Phone size={14} className="text-danger" />} label="Phone" value={user.number} />
                  <Row icon={<MapPin size={14} className="text-accent" />} label="Location" value={user.location} />
                  <Row icon={<Briefcase size={14} className="text-success" />} label="Job" value={user.jobTitle} />
                </div>
              </>
            ) : (
              <div className="mt-3">
                <h1 className="text-base font-semibold text-foreground">
                  Your profile is incomplete
                </h1>
                <p className="mt-1 text-sm text-muted">
                  Add your details to get the best experience.
                </p>
                <button
                  onClick={handleNavigate}
                  className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-accent-soft active:scale-[0.97] transition cursor-pointer"
                >
                  <UserPlus size={15} /> Complete Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Row = ({ icon, label, value }) => (
  <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card-soft px-3 py-2">
    <span className="flex items-center gap-2 text-xs text-muted">
      <span className="flex size-7 items-center justify-center rounded-md bg-card">
        {icon}
      </span>
      {label}
    </span>
    <span className="text-sm font-medium text-foreground truncate max-w-[60%]">
      {value || "—"}
    </span>
  </div>
);

export default AdminInfo;
