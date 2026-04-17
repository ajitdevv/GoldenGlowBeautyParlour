import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";
import AccountBar from "../componentpreant/AccountBar";
import HeadingSubheading from "../components/HeadingSubheading";
import { RetryButton } from "../components/Button";

const AddCompanieForm = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <AccountBar />

      <div className="flex items-center justify-between gap-3 animate-fadeUp">
        <HeadingSubheading
          h1={"Add Company"}
          h2={"Create a new company in your workspace"}
        />
        <button
          onClick={() => navigate(-1)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-card-soft px-3 py-1.5 text-sm text-muted hover:text-foreground hover:bg-card transition cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="mx-auto w-full max-w-lg animate-fadeUp">
        <div className="rounded-3xl border border-dashed border-border bg-card-soft/50 p-8 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-warning/15 text-warning ring-1 ring-warning/30">
            <Construction size={24} />
          </div>
          <h3 className="text-base md:text-lg font-semibold text-foreground">
            Endpoint not available yet
          </h3>
          <p className="mt-1 text-sm text-muted">
            The backend API for adding a new company has not been implemented.
            Please check back later.
          </p>
          <div className="mt-5 flex justify-center">
            <RetryButton onClick={() => navigate("/admin/companys")}>
              Back to Companies
            </RetryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompanieForm;
