import React, { useState } from "react";
import { AddDeal } from "../apis/product";

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
    
    console.log(newDeal);
    try {
      const result = await AddDeal(newDeal);
      console.log("Deal Added:", result);
      alert("Deal Added Successfully");
    } catch (error) {
      alert("Error adding deal");
    }
  };
  return (
    <div>
      <form onSubmit={handelDealSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={addDeal.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={addDeal.companyName}
          onChange={handleChange}
        />
        <input
          type="number"
          name="value"
          placeholder="value"
          value={addDeal.value}
          onChange={handleChange}
        />
        <select name="status" value={addDeal.status}
          onChange={handleChange} className="border p-2">
          <option disabled>Select Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Closed">Closed</option>
          <option value="Lost">Lost</option>
        </select>
        <select name="stage" value={addDeal.stage}
          onChange={handleChange} className="border p-2">
          <option value="">Select Stage</option>
          <option value="Won">Won</option>
          <option value="Proposal">Proposal</option>
          <option value="Lead">Lead</option>
          <option value="Negotiation">Negotiation</option>
          <option value="Lost">Lost</option>
        </select>
        <input
          type="number"
          name="probability"
          placeholder="probability"
          value={addDeal.probability}
          onChange={handleChange}
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start date"
          value={addDeal.startDate}
          onChange={handleChange}
        />
        <input
          type="date"
          name="expectedCloseDate"
          placeholder="Expected Close Date"
          value={addDeal.expectedCloseDate}
          onChange={handleChange}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Deal
        </button>
      </form>
    </div>
  );
};

export default AddDealFrom;
