import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetReports } from "../apis/product";
import { Tag } from "lucide-react";

const ReportFullView = () => {
  let [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);
  let [error, setError] = useState(null);
  useEffect(() => {
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
    Fatchdata();
  }, []);

  const { _id } = useParams();
  const selectedReport = data.find((item) => item._id === _id);
  return (
    <div>
      {loading && <div className="bg-amber-300 text-black">loding...</div>}
      {!loading && error && (
        <div className="bg-red-300 text-black">
          {error}
          {!loading && !error && SelectedReport.length === 0 && (
            <div className="bg-blue-300 text-black">not found</div>
          )}
        </div>
      )}
      {!loading && !error && SelectedReport.length > 0 && (
        <div>
          {console.log("call")}
          {SelectedReport.map((item) => {
            return (
              <div className="p-6 bg-card/50 min-h-screen">
                <div className="bg-card-soft rounded-md shadow p-5 mb-6 flex flex-col items-start gap-2">
                  <h1 className="text-lg font-semibold text-foreground">
                    Report ID:{" "}
                    <span className="font-bold text-blue-600">
                      {item.reportId}
                    </span>{" "}
                    - {item.title}
                  </h1>

                  <div className="flex gap-2">
                    <span className="px-3 py-1 text-xs rounded-md bg-yellow-400 text-yellow-800 font-medium">
                      {item.status}
                    </span>
                    <span className="px-3 py-1 text-xs rounded-md bg-red-400 text-red-900 font-medium">
                      {item.priority}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    <div className="bg-card-soft p-5 rounded-xl shadow">
                      <h2 className="font-semibold flex items-start text-foreground mb-3">
                        User Information
                      </h2>
                      <hr className="mb-4" />

                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-full bg-foreground/30 flex items-center justify-center text-xl font-bold text-background">
                          {item.user?.name?.charAt(0)}
                        </div>

                        <div className="flex flex-col items-start">
                          <h3 className="font-semibold text-foreground">
                            {item.user.name}
                          </h3>
                          <p className="text-sm text-foreground/60">
                            {item.user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card-soft flex flex-col items-start  p-5 rounded-xl shadow">
                      <h2 className="font-semibold text-foreground mb-3">
                        Report Information
                      </h2>
                      <hr className="mb-4 h-px bg-muted w-full" />
                      <p className="text-sm text-foreground/80">
                        <span className="font-medium">Type:</span>{" "}
                        {item.type?.charAt().toUpperCase() +
                          item.type?.slice(1)}
                      </p>
                      <p className="text-sm text-foreground/80">
                        <span className="font-medium">Target:</span>
                        {item.targetType?.charAt().toUpperCase() +
                          item.targetType?.slice(1)}
                      </p>

                      <hr className="h-px my-2 bg-muted w-full" />

                      <h3 className="font-medium text-foreground/80 mb-1">
                        Description:
                      </h3>
                      <p className="text-sm text-foreground/50">
                        {item.description}
                      </p>
                    </div>

                    <div className="bg-card-soft p-5 rounded-xl shadow">
                      <h2 className="font-semibold text-foreground/80 mb-3">
                        Attachment
                      </h2>
                      <hr className="h-px my-2 bg-muted w-full" />

                      <img
                        src={item.attachment}
                        alt="attachment"
                        className="rounded-lg border"
                      />
                    </div>
                  </div>
                  {/*  Admin Action */}
                  <div className="bg-card-soft w-full flex flex-col gap-2 items-start p-5 rounded-xl shadow h-fit">
                    <h2 className="font-semibold text-foreground/80">
                      Admin Actions
                    </h2>
                    <hr className="h-px bg-muted w-full" />

                    <div className="mb-4 flex flex-col gap-4 items-start">
                      <label className="text-sm text-foreground/80">
                        Status
                      </label>
                      <select className="w-full p-2 border rounded-lg text-sm">
                        <option>Pending</option>
                        <option>Resolved</option>
                        <option>Rejected</option>
                      </select>
                    </div>
                    <hr className="h-px bg-muted w-full" />

                    <div className="mb-4 flex flex-col gap-4 items-start">
                      <label className="text-sm text-foreground/80">
                        Priority
                      </label>
                      <select className="w-full p-2 border rounded-lg text-sm">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                    <hr className="h-px bg-muted w-full" />
                    <div className="mb-4 flex flex-col gap-4 items-start">
                      <label className="text-sm text-foreground/80">
                        Internal Notes
                      </label>
                      <textarea
                        className="w-full border rounded-lg text-sm"
                        placeholder="Add internal note..."
                      />
                    </div>
                    <hr className="h-px my-2 bg-muted w-full" />
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                      Save Note
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReportFullView;
