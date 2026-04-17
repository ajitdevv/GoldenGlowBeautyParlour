import { Search } from "lucide-react";
import React from "react";

const FilterBar = ({ filter, handleChange, handleApply, handleReset }) => {
  const selectClass =
    "rounded-xl border border-border bg-card-soft/70 px-3 py-2 text-sm text-foreground hover:bg-card-soft focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer transition";

  return (
    <div className="flex w-full flex-wrap items-center gap-2 md:gap-3">
      <select name="type" value={filter.type} onChange={handleChange} className={selectClass}>
        <option value="">All Types</option>
        <option value="abuse">Abuse</option>
        <option value="bug">Bug</option>
        <option value="payment">Payment</option>
        <option value="other">Other</option>
      </select>

      <select name="status" value={filter.status} onChange={handleChange} className={selectClass}>
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>

      <select name="priority" value={filter.priority} onChange={handleChange} className={selectClass}>
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <div className="relative flex-1 min-w-40">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          name="username"
          value={filter.username}
          onChange={handleChange}
          type="text"
          placeholder="Search by user..."
          className="w-full rounded-xl border border-border bg-card-soft/70 pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 hover:bg-card-soft transition"
        />
      </div>

      <button
        onClick={handleApply}
        className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-accent-soft active:scale-[0.97] transition cursor-pointer"
      >
        Apply
      </button>
      <button
        onClick={handleReset}
        className="rounded-xl border border-border bg-card-soft text-foreground px-4 py-2 text-sm font-medium hover:bg-card active:scale-[0.97] transition cursor-pointer"
      >
        Reset
      </button>
    </div>
  );
};

export default FilterBar;
