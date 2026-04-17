import React, { useState } from "react";
import { AddDeal } from "../apis/product";
import AccountBar from "../componentpreant/AccountBar";
import HeadingSubheading from "../components/HeadingSubheading";
import toast from "react-hot-toast";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddDealFrom = () => {
  const navigate = useNavigate();
  const [addDeal, setAddDeal] = useState({
    title: "",
    companyName: "",
    value: "",
    status: "",
    stage: "",
    probability: "",
    startDate: "",
    expectedCloseDate: "",
  });

  const handleChange = (e) => {
    setAddDeal({ ...addDeal, [e.target.name]: e.target.value });
  };

  const handelDealSubmit = async (e) => {
    e.preventDefault();
    const newDeal = {
      ...addDeal,
      value: Number(addDeal.value),
      probability: Number(addDeal.probability),
      createdAt: new Date().toISOString().split("T")[0],
    };
    try {
      await toast.promise(AddDeal({ deal: newDeal }), {
        loading: "Adding...",
        success: "Added successfully",
        error: "Added failed",
      });
    } catch (error) {
      console.log("Error adding deal", error);
      throw error;
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition";

  return (
    <div className="flex flex-col gap-6">
      <AccountBar />

      <div className="flex items-center justify-between gap-3 animate-fadeUp">
        <HeadingSubheading
          h1={"New Deal"}
          h2={"Fill in the details to add to your pipeline"}
        />
        <button
          onClick={() => navigate(-1)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-card-soft px-3 py-1.5 text-sm text-muted hover:text-foreground hover:bg-card transition cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <form
        onSubmit={handelDealSubmit}
        className="mx-auto w-full max-w-2xl rounded-3xl border border-border bg-card p-6 md:p-8 shadow-(--shadow) flex flex-col gap-5 animate-fadeUp"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Title" className="md:col-span-2">
            <input
              type="text"
              name="title"
              placeholder="Project Name"
              value={addDeal.title}
              onChange={handleChange}
              className={inputClass}
            />
          </FormField>

          <FormField label="Company">
            <input
              type="text"
              name="companyName"
              placeholder="Client Name"
              value={addDeal.companyName}
              onChange={handleChange}
              className={inputClass}
            />
          </FormField>

          <FormField label="Value (₹)">
            <input
              type="number"
              name="value"
              placeholder="Amount"
              value={addDeal.value}
              onChange={handleChange}
              className={inputClass}
            />
          </FormField>

          <FormField label="Status">
            <select
              name="status"
              value={addDeal.status}
              onChange={handleChange}
              className={`${inputClass} cursor-pointer`}
            >
              <option disabled value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
              <option value="Lost">Lost</option>
            </select>
          </FormField>

          <FormField label="Stage">
            <select
              name="stage"
              value={addDeal.stage}
              onChange={handleChange}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="">Select Stage</option>
              <option value="Lead">Lead</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </FormField>

          <FormField label="Probability (%)">
            <input
              type="number"
              name="probability"
              placeholder="e.g. 50"
              value={addDeal.probability}
              onChange={handleChange}
              className={inputClass}
            />
          </FormField>

          <FormField label="Start Date">
            <input
              type="date"
              name="startDate"
              value={addDeal.startDate}
              onChange={handleChange}
              className={inputClass}
            />
          </FormField>

          <FormField label="Expected Close" className="md:col-span-2">
            <input
              type="date"
              name="expectedCloseDate"
              value={addDeal.expectedCloseDate}
              onChange={handleChange}
              className={inputClass}
            />
          </FormField>
        </div>

        <button
          type="submit"
          className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary text-primary-foreground py-3 text-sm font-semibold hover:bg-accent-soft active:scale-[0.98] transition cursor-pointer shadow-(--shadow)"
        >
          <Plus size={16} /> Add Deal
        </button>
      </form>
    </div>
  );
};

const FormField = ({ label, children, className = "" }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted">
      {label}
    </label>
    {children}
  </div>
);

export default AddDealFrom;
