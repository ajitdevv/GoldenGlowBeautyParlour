import React from "react";

const FilterBar = ({ filter, handleChange, handleApply, handleReset }) => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-6">
      <select
        name="type"
        value={filter.type}
        onChange={handleChange}
        className="px-1.5 md:px-3 py-1 md:py-2 text-sm rounded-xl border border-border bg-card-soft/60 focus:outline-none focus:ring-2 focus:ring-accent hover:bg-card-soft transition"
      >
        <option value="">All Type</option>
        <option value="abuse">Abuse</option>
        <option value="bug">Bug</option>
        <option value="payment">Payment</option>
        <option value="other">Other</option>
      </select>
      <select
        name="status"
        value={filter.status}
        onChange={handleChange}
        className="px-1.5 md:px-3 py-1 md:py-2 text-sm rounded-xl border border-border bg-card-soft/60 focus:outline-none focus:ring-2 focus:ring-accent hover:bg-card-soft transition"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>
      <select
        name="priority"
        value={filter.priority}
        onChange={handleChange}
        className="px-1.5 md:px-3 py-1 md:py-2 text-sm rounded-xl border border-border bg-card-soft/60 focus:outline-none focus:ring-2 focus:ring-accent hover:bg-card-soft transition"
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        name="username"
        value={filter.username}
        onChange={handleChange}
        type="text"
        placeholder="🔍Search by user..."
        className="px-1 py-1 md:py-2  text-sm rounded-xl border border-border bg-card-soft/60 focus:outline-none focus:ring-2 focus:ring-accent max-w-25 sm:max-w-35 md:max-w-full hover:bg-card-soft transition placeholder:text-[10px] sm:placeholder:text-[12px] md:placeholder:text-sm"
      />
      <button
        onClick={handleApply}
        className="px-2.5 md:px-5 py-1 md:py-2 text-sm font-medium rounded-xl bg-foreground/90 text-background hover:bg-foreground active:scale-95 transition-all duration-200 shadow-sm"
      >
        Apply
      </button>
      <button
        onClick={handleReset}
        className="px-2.5 md:px-5 py-1 md:py-2 text-sm font-medium rounded-xl bg-foreground/70 text-background hover:bg-foreground/80 active:scale-95 transition-all duration-200 shadow-sm"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterBar;
