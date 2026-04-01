import React, { useState } from "react";
import { AddDeal } from "../apis/product";
import toast from "react-hot-toast";

const AddDealFrom = () => {
  let [addDeal, setAddDeal] = useState({
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
    setAddDeal({
      ...addDeal,
      [e.target.name]: e.target.value,
    });
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
  return (
    <div className="max-w-2xl mx-auto p-6 bg-background">
      <form
        onSubmit={handelDealSubmit}
        className="bg-card-soft border border-(--border) rounded-2xl p-8 shadow-(--shadow) flex flex-col gap-5"
      >
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            New Deal
          </h2>
          <p className="text-sm text-muted">
            Fill in the details to add to pipeline
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-widest flex items-start text-muted ml-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Project Name"
              value={addDeal.title}
              onChange={handleChange}
              className="w-full text-xs md:text-base placeholder:text-xs md:placeholder:text-base px-2 md:px-4 py-1.5 md:py-2.5 rounded-xl border border-(--border) bg-background text-foreground focus:ring-2 focus:ring-primary outline-none transition-all "
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-widest flex items-start text-muted ml-1">
              Company
            </label>
            <input
              type="text"
              name="companyName"
              placeholder="Client Name"
              value={addDeal.companyName}
              onChange={handleChange}
              className="w-full text-xs md:text-base placeholder:text-xs md:placeholder:text-base px-2 md:px-4 py-1.5 md:py-2.5 rounded-xl border border-(--border) bg-background text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-widest flex items-start text-muted ml-1">
              Value (₹)
            </label>
            <input
              type="number"
              name="value"
              placeholder="Amount"
              value={addDeal.value}
              onChange={handleChange}
              className="w-full text-xs md:text-base placeholder:text-xs md:placeholder:text-base px-2 md:px-4 py-1.5 md:py-2.5 rounded-xl border border-(--border) bg-background text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-widest flex items-start text-muted ml-1">
              Status
            </label>
            <select
              name="status"
              value={addDeal.status}
              onChange={handleChange}
              className="w-full text-xs md:text-base placeholder:text-xs md:placeholder:text-base px-2 md:px-4 py-1.5 md:py-2.5 rounded-xl border border-(--border) bg-background text-foreground focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer"
            >
              <option disabled value="">
                Select Status
              </option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-widest flex items-start text-muted ml-1">
              Stage
            </label>
            <select
              name="stage"
              value={addDeal.stage}
              onChange={handleChange}
              className="w-full text-xs md:text-base placeholder:text-xs md:placeholder:text-base px-2 md:px-4 py-1.5 md:py-2.5 rounded-xl border border-(--border) bg-background text-foreground focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer"
            >
              <option value="">Select Stage</option>
              <option value="Lead">Lead</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-widest flex items-start text-muted ml-1">
              Probability (%)
            </label>
            <input
              type="number"
              name="probability"
              placeholder="e.g. 50"
              value={addDeal.probability}
              onChange={handleChange}
              className="w-full text-xs md:text-base placeholder:text-xs md:placeholder:text-base px-2 md:px-4 py-1.5 md:py-2.5 rounded-xl border border-(--border) bg-background text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-widest flex items-start text-muted ml-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={addDeal.startDate}
              onChange={handleChange}
              className="w-full text-xs md:text-base placeholder:text-xs md:placeholder:text-base px-2 md:px-4 py-1.5 md:py-2.5 rounded-xl border border-(--border) bg-background text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-widest flex items-start text-muted ml-1">
              Expected Close
            </label>
            <input
              type="date"
              name="expectedCloseDate"
              value={addDeal.expectedCloseDate}
              onChange={handleChange}
              className="w-full text-xs md:text-base placeholder:text-xs md:placeholder:text-base px-2 md:px-4 py-1.5 md:py-2.5 rounded-xl border border-(--border) bg-background text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 w-full bg-primary text-[var(--pforeground font-bold py-2 md:py-3 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
        >
          Add Deal
        </button>
      </form>
    </div>
  );
};

export default AddDealFrom;
