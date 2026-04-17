import { Building2, CalendarClock } from "lucide-react";
import React from "react";

const DealCard = ({ deal, getStatusColor }) => {
  const initial = (deal.companyName || "?").charAt(0).toUpperCase();

  return (
    <div className="flex h-full w-full flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-semibold text-foreground line-clamp-2">
          {deal.title}
        </h2>
        <span className="shrink-0 rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-medium text-accent ring-1 ring-primary/25">
          {deal.stage}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted">
        <span className="flex size-6 items-center justify-center rounded-md bg-card-soft text-foreground text-xs font-semibold">
          {initial}
        </span>
        <span className="truncate">{deal.companyName}</span>
      </div>

      <div className="h-px bg-border" />

      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-muted">Deal Value</p>
          <p className="text-xl font-semibold text-foreground tracking-tight">
            ₹{Number(deal.value || 0).toLocaleString("en-IN")}
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusColor(
            deal.status,
          )}`}
        >
          {deal.status}
        </span>
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between text-xs text-muted">
          <span>Probability</span>
          <span className="font-medium text-foreground">{deal.probability}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-card-soft">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${deal.probability || 0}%` }}
          />
        </div>
      </div>

      <div className="mt-auto flex items-center gap-1.5 text-xs text-muted">
        <CalendarClock size={13} />
        Close by {deal.expectedCloseDate}
      </div>
    </div>
  );
};

export default React.memo(DealCard);
