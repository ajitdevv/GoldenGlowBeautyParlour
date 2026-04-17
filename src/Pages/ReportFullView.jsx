import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetReports } from "../apis/product";
import { ReportUpdate } from "../apis/updatedata";
import { SaveButton } from "../components/Button";
import AccountBar from "../componentpreant/AccountBar";
import HeadingSubheading from "../components/HeadingSubheading";
import toast from "react-hot-toast";
import { ArrowLeft, Mail, User2 } from "lucide-react";

const statusBadge = (s) =>
  s === "pending"
    ? "bg-warning/15 text-warning ring-1 ring-warning/25"
    : s === "in-progress"
      ? "bg-info/15 text-info ring-1 ring-info/25"
      : s === "resolved"
        ? "bg-success/15 text-success ring-1 ring-success/25"
        : "bg-card-soft text-muted ring-1 ring-border";

const priorityBadge = (p) =>
  p === "low"
    ? "bg-card-soft text-muted ring-1 ring-border"
    : p === "medium"
      ? "bg-warning/15 text-warning ring-1 ring-warning/25"
      : p === "high"
        ? "bg-danger/15 text-danger ring-1 ring-danger/25"
        : "bg-card-soft text-muted ring-1 ring-border";

const ReportFullView = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [urloading, setURLoading] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    status: "",
    priority: "",
    description: "",
  });
  const navigation = useNavigate();

  useEffect(() => {
    Fatchdata();
  }, []);

  const Fatchdata = async () => {
    try {
      setLoading(true);
      const data = await GetReports();
      setData(data.data);
    } catch (error) {
      console.log("faild to fatch reports", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUpdateForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { _id } = useParams();
  const SelectedReport = data.find((item) => item._id === _id);

  useEffect(() => {
    if (SelectedReport) {
      setUpdateForm({
        status: SelectedReport.status || "",
        priority: SelectedReport.priority || "",
        description: SelectedReport.description || "",
      });
    }
  }, [SelectedReport]);

  const handleReportUpdate = async () => {
    try {
      setURLoading(true);
      const edits = { reportId: SelectedReport.reportId, ...updateForm };
      await ReportUpdate({ id: SelectedReport._id, edits });
      toast.success("Edit successfully ✅");
    } catch (error) {
      console.log("Report not updated", error);
      throw error;
    } finally {
      setURLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition";

  return (
    <div className="flex flex-col gap-6">
      <AccountBar />

      <div className="flex items-center justify-between gap-3 animate-fadeUp">
        <HeadingSubheading
          h1={"Report Details"}
          h2={"Review the report and take admin action"}
        />
        <button
          onClick={() => navigation(-1)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-card-soft px-3 py-1.5 text-sm text-muted hover:text-foreground hover:bg-card transition cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      {loading && (
        <div className="space-y-4">
          <div className="h-24 rounded-2xl border border-border bg-card-soft shimmer" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-40 rounded-2xl border border-border bg-card-soft shimmer" />
              <div className="h-56 rounded-2xl border border-border bg-card-soft shimmer" />
            </div>
            <div className="h-96 rounded-2xl border border-border bg-card-soft shimmer" />
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-danger/30 bg-danger/10 p-6 text-center text-danger">
          {String(error)}
        </div>
      )}

      {!loading && !error && !SelectedReport && (
        <div className="rounded-2xl border border-border bg-card p-6 text-center text-muted">
          Report not found.
        </div>
      )}

      {!loading && !error && SelectedReport && (
        <div className="space-y-5 animate-fadeUp">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-(--shadow)">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">Report</p>
                <h1 className="mt-1 text-lg md:text-xl font-semibold text-foreground">
                  <span className="font-mono text-info">{SelectedReport.reportId}</span>
                  <span className="mx-2 text-muted">·</span>
                  {SelectedReport.title}
                </h1>
              </div>
              <div className="flex gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusBadge(SelectedReport.status)}`}>
                  {SelectedReport.status}
                </span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${priorityBadge(SelectedReport.priority)}`}>
                  {SelectedReport.priority}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-5">
              <Section title="User Information">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-lg font-bold">
                    {SelectedReport.user?.name?.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                      <User2 size={14} className="text-muted" />
                      {SelectedReport.user.name}
                    </h3>
                    <p className="text-xs text-muted flex items-center gap-1.5 mt-1">
                      <Mail size={12} />
                      {SelectedReport.user.email}
                    </p>
                  </div>
                </div>
              </Section>

              <Section title="Report Information">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Type" value={SelectedReport.type} />
                  <Field label="Target" value={SelectedReport.targetType} />
                </div>
                <div className="mt-3 rounded-xl bg-card-soft p-3">
                  <p className="text-xs font-medium text-muted">Description</p>
                  <p className="mt-1 text-sm text-foreground/90 leading-relaxed">
                    {SelectedReport.description}
                  </p>
                </div>
              </Section>

              {SelectedReport.attachment && (
                <Section title="Attachment">
                  <img
                    src={SelectedReport.attachment}
                    alt="attachment"
                    className="rounded-xl border border-border max-h-96 object-contain bg-card-soft"
                  />
                </Section>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-(--shadow) h-fit space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
                Admin Actions
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted">Status</label>
                <select
                  name="status"
                  value={updateForm.status}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="pending">pending</option>
                  <option value="in-progress">in-progress</option>
                  <option value="resolved">resolved</option>
                  <option value="rejected">rejected</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted">Priority</label>
                <select
                  name="priority"
                  value={updateForm.priority}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="low">low</option>
                  <option value="medium">medium</option>
                  <option value="high">high</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted">Internal Notes</label>
                <textarea
                  name="description"
                  value={updateForm.description}
                  onChange={handleChange}
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder="Add internal note..."
                />
              </div>

              <SaveButton
                onClick={handleReportUpdate}
                urloading={urloading}
                style="w-full"
              >
                Save Note
              </SaveButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="rounded-2xl border border-border bg-card p-5 shadow-(--shadow)">
    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
      {title}
    </h2>
    {children}
  </div>
);

const Field = ({ label, value }) => (
  <div className="rounded-xl border border-border bg-card-soft px-3 py-2">
    <p className="text-[10px] uppercase tracking-wider text-muted">{label}</p>
    <p className="mt-0.5 text-sm font-medium text-foreground capitalize">{value}</p>
  </div>
);

export default ReportFullView;
