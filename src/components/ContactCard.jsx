import { Mail, Phone, Building2, Calendar } from "lucide-react";
import React from "react";

export const ContactCard = React.memo(
  ({ position, Company, Name, Gmail, contactDate, phoneNo, since }) => {
    const initial = (Name || "?").charAt(0).toUpperCase();

    return (
      <div className="group h-full rounded-2xl border border-border bg-card p-5 shadow-(--shadow) transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_18px_40px_-18px_rgba(224,182,84,0.45)]">
        <div className="flex items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground text-lg font-bold">
            {initial}
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-semibold text-foreground truncate">{Name}</h1>
            <p className="text-xs text-muted truncate">
              {position} · <span className="text-foreground/80">{Company}</span>
            </p>
          </div>
        </div>

        <div className="my-4 h-px bg-border" />

        <div className="flex flex-col gap-2 text-sm text-muted">
          <span className="inline-flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-info/10 text-info">
              <Mail size={13} />
            </span>
            <span className="truncate">{Gmail}</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-danger/10 text-danger">
              <Phone size={13} />
            </span>
            <span>{phoneNo}</span>
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-1 rounded-xl bg-card-soft px-3 py-2 text-[11px] text-muted">
          <span className="inline-flex items-center gap-2">
            <Calendar size={12} className="text-accent" />
            Contacted {contactDate}
          </span>
          <span className="inline-flex items-center gap-2">
            <Building2 size={12} className="text-accent" />
            With company since {since}
          </span>
        </div>
      </div>
    );
  }
);
