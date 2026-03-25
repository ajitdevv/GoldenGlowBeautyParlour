import React, { useEffect, useState } from "react";
import { GetReports } from "../apis/product";
import AccountBar from "../componentpreant/AccountBar";
import HeadingSubheading from "../components/HeadingSubheading";
import { Bug } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  let [reportsData, setReportsData] = useState([]);
  let [loader, setLoader] = useState(true);
  let [error, setError] = useState(null);
  let [appliedFilter, setAppliedFilter] = useState(null);
  let [filter, setFilter] = useState({
    type: "",
    status: "",
    priority: "",
    username: "",
  });
  let navigate = useNavigate();
  useEffect(() => {
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
    fetchReports();
  }, []);
  const FilterReports = appliedFilter
    ? reportsData.filter((item) => {
        return (
          (!appliedFilter.type || item.type === appliedFilter.type) &&
          (!appliedFilter.status || item.status === appliedFilter.status) &&
          (!appliedFilter.priority ||
            item.priority === appliedFilter.priority) &&
          (!appliedFilter.username ||
            item.user.name
              .toLowerCase()
              .includes(appliedFilter.username.toLowerCase()))
        );
      })
    : reportsData;

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };
  const handleApply = () => {
    setAppliedFilter(filter);
  };
  const handleReset = () => {
    setAppliedFilter(null);
    setFilter({
      type: "",
      status: "",
      priority: "",
      username: "",
    });
  };
  const handleFullView = (item) => {
    navigate(`/admin/report/${item._id}`);
  };

  return (
    <div>
      <div>
        <AccountBar />
      </div>
      <div>
        <HeadingSubheading
          h1={"Reports"}
          h2={"Browse and manage available reports"}
        />
      </div>
      <div className="flex w-full flex-wrap justify-around items-center gap-3 p-4 bg-background rounded-2xl border border-border/90">
        <select
          name="type"
          onChange={handleChange}
          className="px-3 py-2 text-sm rounded-xl border border-border bg-card-soft/60 focus:outline-none focus:ring-2 focus:ring-accent hover:bg-card-soft transition"
        >
          <option value="">All Type</option>
          <option value="abuse">Abuse</option>
          <option value="bug">Bug</option>
          <option value="payment">Payment</option>
          <option value="other">Other</option>
        </select>
        <select
          name="status"
          onChange={handleChange}
          className="px-3 py-2 text-sm rounded-xl border border-border bg-card-soft/60 focus:outline-none focus:ring-2 focus:ring-accent hover:bg-card-soft transition"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
        <select
          name="priority"
          onChange={handleChange}
          className="px-3 py-2 text-sm rounded-xl border border-border bg-card-soft/60 focus:outline-none focus:ring-2 focus:ring-accent hover:bg-card-soft transition"
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          name="username"
          onChange={handleChange}
          type="text"
          placeholder="🔍Search by user..."
          className="px-4 py-2 text-sm rounded-xl border border-border bg-card-soft/60 focus:outline-none focus:ring-2 focus:ring-accent max-w-full hover:bg-card-soft transition"
        />
        <button
          onClick={handleApply}
          className="px-5 py-2 text-sm font-medium rounded-xl bg-foreground/90 text-background hover:bg-foreground active:scale-95 transition-all duration-200 shadow-sm"
        >
          Apply
        </button>
        <button
          onClick={handleReset}
          className="px-5 py-2 text-sm font-medium rounded-xl bg-foreground/70 text-background hover:bg-foreground/80 active:scale-95 transition-all duration-200 shadow-sm"
        >
          Remove All Filters
        </button>
      </div>
      {loader && (
        <>
          {/* Header Skeleton */}
          <tr className="animate-pulse w-full ">
            <td className="px-4 py-3 w-full">
              <div className="h-5 w-20 bg-gray-300 rounded"></div>
            </td>
            <td className="px-4 pr-80 w-full">
              <div className="h-5 w-20 bg-gray-300 rounded"></div>
            </td>
            <td className="px-4 pr-10 w-full">
              <div className="h-5 w-20 bg-gray-300 rounded"></div>
            </td>
            <td className="px-4 pr-10 w-full">
              <div className="h-5 w-20 bg-gray-300 rounded"></div>
            </td>
            <td className="px-4 pr-10 w-full">
              <div className="h-5 w-20 bg-gray-300 rounded"></div>
            </td>
          </tr>

          {/* Rows */}
          {Array.from({ length: 16 }).map((_, i) => (
            <tr key={i} className="border-t animate-pulse w-full mr-20">
              <td className="px-4 py-3 w-full">
                <div className="h-8 w-20 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-4 py-3 w-full">
                <div className="h-5 w-40 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-4 py-3 w-full">
                <div className="h-5 w-24 bg-gray-300 rounded-md"></div>
              </td>
              <td className="px-4 py-3 w-full">
                <div className="h-7 w-28 bg-gray-300 rounded-full"></div>
              </td>
              <td className="px-4 py-3 w-full">
                <div className="h-7 w-20 bg-gray-300 rounded-full"></div>
              </td>
            </tr>
          ))}
        </>
      )}
      {!loader && error && (
        <div className=" text-red-500 text-2xl">{error}</div>
      )}
      {!loader && !error && FilterReports.length === 0 && (
        <div>
          <div>No reports found. Try adjusting filters or create a new one</div>
        </div>
      )}
      {!loader && !error && FilterReports.length > 0 && (
        <div className="overflow-x-auto mt-4 rounded-xl border border-border">
          <table className="min-w-full table-auto text-left">
            <thead className="bg-card-soft ">
              <tr>
                <th className="px-4 py-3">User ID</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Priority</th>
              </tr>
            </thead>

            <tbody className="">
              {FilterReports.map((item) => (
                <tr
                  onClick={() => handleFullView(item)}
                  key={item._id}
                  className="border-t hover:bg-card-soft cursor-pointer scale-100 hover:scale-101 transition-all duration-300"
                >
                  <td className="px-2 py-2.5">
                    <div className="bg-foreground text-background rounded-sm w-fit px-2 py-0.5">
                      {item.reportId}
                    </div>
                  </td>
                  <td className="px-4 py-3">{item.user.name}</td>
                  <td className="px-4 py-3 capitalize">{item.type}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs
              ${item.status === "pending" && "bg-yellow-100 text-yellow-700"}
              ${item.status === "in-progress" && "bg-blue-100 text-blue-700"}
              ${item.status === "resolved" && "bg-green-100 text-green-700"}
            `}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs
              ${item.priority === "low" && "bg-gray-100 text-gray-700"}
              ${item.priority === "medium" && "bg-orange-100 text-orange-700"}
              ${item.priority === "high" && "bg-red-100 text-red-700"}
            `}
                    >
                      {item.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reports;
