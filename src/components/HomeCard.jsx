export const HomeCard = ({ title, value, logo }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-(--shadow) transition hover:border-primary/40 hover:-translate-y-0.5">
      <div className="absolute -right-6 -top-6 size-24 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted truncate">
            {title}
          </p>
          <div className="shrink-0 flex size-9 items-center justify-center rounded-xl bg-primary/15 text-accent ring-1 ring-primary/25">
            {logo}
          </div>
        </div>
        <p className="text-xl md:text-2xl font-semibold tracking-tight text-foreground whitespace-nowrap overflow-hidden text-ellipsis">
          {value}
        </p>
      </div>
    </div>
  );
};
