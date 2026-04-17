import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetDeals } from "../apis/product";
import HeadingSubheading from "../components/HeadingSubheading";
import AccountBar from "../componentpreant/AccountBar";
import { DeleteDeal } from "../apis/deletedata";
import { RetryButton } from "../components/Button";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Building2,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  Layers,
  Pencil,
  Target,
  Trash2,
  TrendingUp,
  Wallet,
} from "lucide-react";

const stageBadge =
  "rounded-full bg-card/95 backdrop-blur px-3 py-1 text-xs font-semibold text-accent ring-1 ring-primary/30";

const statusStyle = (s) =>
  s === "Closed"
    ? "bg-danger/15 text-danger ring-1 ring-danger/25"
    : s === "Active"
      ? "bg-success/15 text-success ring-1 ring-success/25"
      : s === "Lost"
        ? "bg-muted/15 text-muted ring-1 ring-border"
        : "bg-warning/15 text-warning ring-1 ring-warning/25";

const DealFullView = () => {
  const { _id } = useParams();
  const navigation = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    Fetchdata();
  }, [_id]);

  const Fetchdata = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await GetDeals();
      setData(res.data);
    } catch (err) {
      console.log("Error Loading Deals", err);
      setError("Failed to load deal");
    } finally {
      setLoading(false);
    }
  };

  const FindDeal = data.find((item) => String(item._id) === String(_id));

  const handleDealEdit = () => toast.error("Edit Temporarily Disabled");
  const handleDealDelete = async (deal) => {
    try {
      await toast.promise(DeleteDeal({ id: deal.id }), {
        loading: "Deleting...",
        success: "Deleted successfully",
        error: "Delete failed",
      });
      navigation("/admin/deals");
    } catch (error) {
      console.log("Not delete", error);
      throw error;
    }
  };

  const timeline = useMemo(() => {
    if (!FindDeal?.startDate || !FindDeal?.expectedCloseDate) return null;
    const start = new Date(FindDeal.startDate).getTime();
    const end = new Date(FindDeal.expectedCloseDate).getTime();
    const now = Date.now();
    if (isNaN(start) || isNaN(end) || end <= start) return null;
    const pct = Math.max(0, Math.min(100, ((now - start) / (end - start)) * 100));
    const remainingDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return { pct, remainingDays };
  }, [FindDeal]);

  return (
    <div className="flex flex-col gap-6">
      <AccountBar />

      <div className="flex items-center justify-between gap-3 animate-fadeUp">
        <HeadingSubheading
          h1={"Deal Details"}
          h2={"View and manage this deal information"}
        />
        <button
          onClick={() => navigation(-1)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-card-soft px-3 py-1.5 text-sm text-muted hover:text-foreground hover:bg-card transition cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-fadeUp">
          <div className="lg:col-span-2 h-72 rounded-3xl border border-border bg-card-soft shimmer" />
          <div className="h-72 rounded-3xl border border-border bg-card-soft shimmer" />
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-danger/30 bg-danger/10 p-6 text-center">
          <p className="text-danger font-medium">{error}</p>
          <div className="mt-3 flex justify-center">
            <RetryButton onClick={Fetchdata}>Retry</RetryButton>
          </div>
        </div>
      )}

      {!loading && !error && !FindDeal && (
        <div className="rounded-2xl border border-border bg-card p-6 text-center text-muted">
          Deal not found.
        </div>
      )}

      {!loading && !error && FindDeal && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-fadeUp">
          {/* MAIN COLUMN */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Hero Card */}
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-(--shadow)">
              <div className="relative h-20 bg-linear-to-br from-primary via-accent-soft to-accent">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
                <div className="absolute inset-0 flex items-center justify-between px-5 md:px-6">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/85">
                    Deal Overview
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={stageBadge}>{FindDeal.stage}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(FindDeal.status)}`}
                    >
                      {FindDeal.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-5 md:px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-accent text-lg font-bold ring-1 ring-primary/30">
                    {(FindDeal.companyName || "?").charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-lg md:text-2xl font-semibold tracking-tight text-foreground line-clamp-2">
                      {FindDeal.title || "Untitled Deal"}
                    </h1>
                    <p className="mt-0.5 inline-flex items-center gap-1.5 text-sm text-muted">
                      <Building2 size={14} className="text-accent" />
                      <span className="truncate">{FindDeal.companyName}</span>
                    </p>
                  </div>
                </div>

                {/* Metrics grid */}
                <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  <Metric
                    icon={<Wallet size={15} />}
                    label="Value"
                    value={`₹${Number(FindDeal.value || 0).toLocaleString("en-IN")}`}
                  />
                  <Metric
                    icon={<Target size={15} />}
                    label="Probability"
                    value={`${FindDeal.probability ?? 0}%`}
                  />
                  <Metric
                    icon={<Layers size={15} />}
                    label="Stage"
                    value={FindDeal.stage || "—"}
                  />
                  <Metric
                    icon={<CheckCircle2 size={15} />}
                    label="Status"
                    value={FindDeal.status || "—"}
                  />
                </div>
              </div>
            </div>

            {/* Probability Card */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-(--shadow)">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-accent ring-1 ring-primary/25">
                    <TrendingUp size={16} />
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">
                      Win Probability
                    </h2>
                    <p className="text-xs text-muted">
                      Likelihood of closing this deal successfully
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-semibold tracking-tight text-foreground">
                  {FindDeal.probability ?? 0}%
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-card-soft">
                <div
                  className="h-full rounded-full bg-linear-to-r from-primary to-accent-soft transition-all"
                  style={{ width: `${FindDeal.probability || 0}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-wider text-muted">
                <span>Cold</span>
                <span>Likely</span>
                <span>Hot</span>
              </div>
            </div>

            {/* Timeline Card */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-(--shadow)">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-accent ring-1 ring-primary/25">
                    <CalendarClock size={16} />
                  </span>
                  <h2 className="text-sm font-semibold text-foreground">
                    Deal Timeline
                  </h2>
                </div>
                {timeline && (
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      timeline.remainingDays < 0
                        ? "bg-danger/15 text-danger ring-1 ring-danger/25"
                        : timeline.remainingDays <= 7
                          ? "bg-warning/15 text-warning ring-1 ring-warning/25"
                          : "bg-success/15 text-success ring-1 ring-success/25"
                    }`}
                  >
                    {timeline.remainingDays < 0
                      ? `${Math.abs(timeline.remainingDays)}d overdue`
                      : `${timeline.remainingDays}d left`}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <DateBlock
                  icon={<CalendarDays size={14} className="text-success" />}
                  label="Start Date"
                  value={FindDeal.startDate || "—"}
                />
                <DateBlock
                  icon={<CalendarClock size={14} className="text-warning" />}
                  label="Expected Close"
                  value={FindDeal.expectedCloseDate || "—"}
                />
              </div>

              {timeline && (
                <div className="mt-5">
                  <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-card-soft">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-success via-primary to-warning"
                      style={{ width: `${timeline.pct}%` }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-[11px] text-muted">
                    <span>{FindDeal.startDate}</span>
                    <span>{FindDeal.expectedCloseDate}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR COLUMN */}
          <aside className="flex flex-col gap-5">
            {/* Company Card */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-(--shadow)">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                Customer
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-card-soft text-foreground text-base font-semibold ring-1 ring-border">
                  {(FindDeal.companyName || "?").charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {FindDeal.companyName}
                  </p>
                  <p className="text-xs text-muted truncate">
                    Account · {FindDeal.stage}
                  </p>
                </div>
              </div>
            </div>

            {/* Meta info */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-(--shadow) space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                Details
              </p>
              <InfoRow label="Deal ID" value={`#${FindDeal.id ?? "—"}`} mono />
              <InfoRow label="Created" value={FindDeal.createdAt || "—"} />
              <InfoRow label="Stage" value={FindDeal.stage} />
              <InfoRow label="Status" value={FindDeal.status} />
            </div>

            {/* Actions */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-(--shadow) space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                Actions
              </p>
              <button
                onClick={handleDealEdit}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:bg-accent-soft active:scale-[0.97] transition cursor-pointer shadow-(--shadow)"
              >
                <Pencil size={15} /> Edit Deal
              </button>
              <button
                onClick={() => handleDealDelete(FindDeal)}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-danger/30 bg-danger/10 text-danger py-2.5 text-sm font-semibold hover:bg-danger hover:text-white active:scale-[0.97] transition cursor-pointer"
              >
                <Trash2 size={15} /> Delete Deal
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

const Metric = ({ icon, label, value, accent }) => (
  <div className="rounded-2xl border border-border bg-card-soft px-3 py-2.5">
    <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
      <span className="text-accent">{icon}</span>
      {label}
    </div>
    <p
      className={`mt-1 text-sm md:text-base font-semibold tracking-tight truncate ${accent || "text-foreground"}`}
    >
      {value}
    </p>
  </div>
);

const DateBlock = ({ icon, label, value }) => (
  <div className="rounded-2xl border border-border bg-card-soft p-4">
    <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
      {icon}
      {label}
    </div>
    <p className="mt-1.5 text-sm font-semibold text-foreground">{value}</p>
  </div>
);

const InfoRow = ({ label, value, mono }) => (
  <div className="flex items-center justify-between gap-3 text-sm">
    <span className="text-xs text-muted">{label}</span>
    <span
      className={`font-medium text-foreground truncate max-w-[60%] ${mono ? "font-mono text-xs" : ""}`}
    >
      {value || "—"}
    </span>
  </div>
);

export default DealFullView;
