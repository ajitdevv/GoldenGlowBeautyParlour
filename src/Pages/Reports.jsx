import React, { useEffect, useState } from "react";
import { GetReports } from "../apis/product";
import AccountBar from "../componentpreant/AccountBar";
import HeadingSubheading from "../components/HeadingSubheading";
import { useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import { RetryButton } from "../components/Button";

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

const Reports = () => {
  const [reportsData, setReportsData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);
  const [appliedFilter, setAppliedFilter] = useState(null);
  const [filter, setFilter] = useState({
    type: "",
    status: "",
    priority: "",
    username: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoader(true);
      setError(null);
      const data = await GetReports();
      setReportsData(data.data);
    } catch (error) {
      console.log("Error Fetch Report", error);
      setError("Reports Not Found");
    } finally {
      setLoader(false);
    }
  };

  const FilterReports = appliedFilter
    ? reportsData.filter(
        (item) =>
          (!appliedFilter.type || item.type === appliedFilter.type) &&
          (!appliedFilter.status || item.status === appliedFilter.status) &&
          (!appliedFilter.priority || item.priority === appliedFilter.priority) &&
          (!appliedFilter.username ||
            item.user.name.toLowerCase().includes(appliedFilter.username.toLowerCase()))
      )
    : reportsData;

  const handleChange = (e) => setFilter({ ...filter, [e.target.name]: e.target.value });
  const handleApply = () => setAppliedFilter(filter);
  const handleReset = () => {
    setAppliedFilter(null);
    setFilter({ type: "", status: "", priority: "", username: "" });
  };
  const handleFullView = (item) => navigate(`/admin/report/${item._id}`);

  return (
    <div className="flex flex-col gap-5">
      <AccountBar />

      <div className="animate-fadeUp">
        <HeadingSubheading
          h1={"Reports"}
          h2={"Browse and manage available reports"}
        />
      </div>

      <div className="rounded-2xl border border-border bg-card p-3 md:p-4 shadow-(--shadow) animate-fadeUp">
        <FilterBar
          filter={filter}
          handleChange={handleChange}
          handleApply={handleApply}
          handleReset={handleReset}
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-(--shadow) animate-fadeUp">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-card-soft text-muted text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 font-medium">Report ID</th>
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Priority</th>
              </tr>
            </thead>

            <tbody>
              {loader &&
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="border-t border-border">
                    {Array.from({ length: 5 }).map((__, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-5 w-20 rounded bg-card-soft shimmer" />
                      </td>
                    ))}
                  </tr>
                ))}

              {!loader &&
                !error &&
                FilterReports.map((item) => (
                  <tr
                    onClick={() => handleFullView(item)}
                    key={item._id}
                    className="border-t border-border hover:bg-card-soft/60 cursor-pointer transition"
                  >
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-md bg-foreground/90 text-background px-2 py-0.5 text-xs font-mono">
                        {item.reportId}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-foreground">{item.user?.name}</td>
                    <td className="px-4 py-3 capitalize text-muted">{item.type}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${priorityBadge(item.priority)}`}>
                        {item.priority}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {!loader && error && (
          <div className="p-6 text-center">
            <p className="text-danger font-medium">{error}</p>
            <div className="mt-3 flex justify-center">
              <RetryButton onClick={fetchReports}>Retry</RetryButton>
            </div>
          </div>
        )}

        {!loader && !error && FilterReports.length === 0 && (
          <div className="p-8 text-center text-muted text-sm">
            No reports found. Try adjusting filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
