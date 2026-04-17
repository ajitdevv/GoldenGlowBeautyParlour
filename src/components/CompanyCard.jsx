import { MapPin, BoxesIcon, ArrowUpRight, Tag } from "lucide-react";

const CompanyCard = ({ Name, Category, Location, ProductsCount }) => {
  const initial = (Name || "?").charAt(0).toUpperCase();

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-(--shadow) transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_18px_40px_-18px_rgba(224,182,84,0.45)]">
      <div className="absolute -top-10 -right-10 size-32 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground text-lg font-bold shadow-(--shadow)">
            {initial}
          </div>
          <div className="min-w-0">
            <h2 className="text-base md:text-lg font-semibold text-foreground truncate">
              {Name}
            </h2>
            <p className="text-xs text-muted truncate">{Category}</p>
          </div>
        </div>
        <ArrowUpRight
          size={18}
          className="shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
        />
      </div>

      <div className="my-4 h-px bg-border" />

      <div className="flex flex-col gap-2 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <MapPin size={14} className="text-accent" />
          <span className="truncate">{Location}</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <Tag size={14} className="text-accent" />
          <span className="truncate">{Category}</span>
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-card-soft px-3 py-2">
        <span className="text-xs text-muted">Products</span>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <BoxesIcon size={14} className="text-accent" />
          {ProductsCount}
        </span>
      </div>
    </div>
  );
};

export default CompanyCard;
