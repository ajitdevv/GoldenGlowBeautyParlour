import React from "react";

export const AddButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold shadow-(--shadow) hover:bg-accent-soft hover:text-primary-foreground active:scale-[0.97] transition cursor-pointer"
    >
      {children}
    </button>
  );
};

export const RetryButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card-soft px-4 py-2 text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground active:scale-[0.97] transition cursor-pointer"
    >
      {children}
    </button>
  );
};

export const SaveButton = React.memo(({ children, onClick, type, style, urloading }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={urloading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-2.5 px-4 text-sm font-semibold shadow-(--shadow) transition
        ${urloading ? "opacity-70 cursor-not-allowed" : "hover:bg-accent-soft active:scale-[0.97] cursor-pointer"} ${style || ""}`}
    >
      {urloading && (
        <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {urloading ? "Saving..." : children}
    </button>
  );
});
