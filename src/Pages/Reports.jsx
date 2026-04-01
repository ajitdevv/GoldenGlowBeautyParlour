import React, { useEffect, useState } from "react";
import { GetReports } from "../apis/product";
import AccountBar from "../componentpreant/AccountBar";
import HeadingSubheading from "../components/HeadingSubheading";
import { Bug } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";

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
    <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 px-2">
      <div>
        <AccountBar />
      </div>
      <div>
        <HeadingSubheading
          h1={"Reports"}
          h2={"Browse and manage available reports"}
        />
      </div>
      <div className="flex items-center p-2 md:p-4 bg-background rounded-2xl border border-border/90">
        <FilterBar
          filter={filter}
          handleChange={handleChange}
          handleApply={handleApply}
          handleReset={handleReset}
        />
      </div>
      {loader && (
        <div className="overflow-x-auto mt-4 rounded-xl border border-border">
          <table className="min-w-full table-auto text-left">
            <thead className="bg-card-soft">
              <tr>
                <th className="px-4 text-xs md:text-base py-3">User ID</th>
                <th className="px-4 text-xs md:text-base py-3">User</th>
                <th className="px-4 text-xs md:text-base py-3">Type</th>
                <th className="px-4 text-xs md:text-base py-3">Status</th>
                <th className="px-4 text-xs md:text-base py-3">Priority</th>
              </tr>
            </thead>

            <tbody>
              {loader &&
                Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i} className="border-t animate-pulse">
                    <td className="px-2 py-3">
                      <div className="h-5 w-15 md:w-20 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-5 w-10 md:w-40 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-5 w-12 md:w-24 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-7 w-14 md:w-28 bg-gray-300 rounded-full"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-7 w-10 md:w-20 bg-gray-300 rounded-full"></div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
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
                <th className="px-4 text-xs md:text-base py-3">User ID</th>
                <th className="px-4 text-xs md:text-base py-3">User</th>
                <th className="px-4 text-xs md:text-base py-3">Type</th>
                <th className="px-4 text-xs md:text-base py-3">Status</th>
                <th className="px-4 text-xs md:text-base py-3">Priority</th>
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
                    <div className="bg-foreground text-xs md:text-base text-background rounded-sm w-fit px-2 py-0.5">
                      {item.reportId}
                    </div>
                  </td>
                  <td className="px-4 text-xs md:text-base py-3">
                    {item.user?.name}
                  </td>
                  <td className="px-4 text-xs md:text-base py-3 capitalize">
                    {item.type}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${item.status === "pending" && "bg-yellow-100 text-yellow-700"} ${item.status === "in-progress" && "bg-blue-100 text-blue-700"} ${item.status === "resolved" && "bg-green-100 text-green-700"}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${item.priority === "low" && "bg-gray-100 text-gray-700"} ${item.priority === "medium" && "bg-orange-100 text-orange-700"} ${item.priority === "high" && "bg-red-100 text-red-700"}`}
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
