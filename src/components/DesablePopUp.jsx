import React from "react";
import { Inbox } from "lucide-react";

const DesablePopUp = ({ title, message, children }) => {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-border bg-card-soft/50 px-6 py-12 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30">
          <Inbox size={24} />
        </div>
        <h3 className="text-base md:text-lg font-semibold text-foreground">
          {title || "Nothing here yet"}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {message || children || "There is no data to display."}
        </p>
      </div>
    </div>
  );
};

export default DesablePopUp;

export const DeletePopUp = ({ popup, children }) => {
  return (
    <div
      className={`z-200 fixed top-15 md:top-5 right-5 transition-all duration-500 ${
        popup ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="bg-primary text-primary-foreground px-5 py-3 rounded-xl shadow-(--shadow)">
        {children}
      </div>
    </div>
  );
};
