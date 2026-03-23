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
  const SelectedReport = [...data].filter((item) => item._id === _id);
  console.log(SelectedReport);

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
        <div >
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
                          <h3 className="font-semibold text-muted">
                            {item.user.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card-soft flex flex-col gap-2 items-start p-5 rounded-xl shadow">
                      <h2 className="font-semibold text-gray-700 mb-3">
                        Report Information
                      </h2>
                      <hr className="mb-4" />

                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Type:</span> {item.type}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Target:</span>{" "}
                        {item.targetType}
                      </p>

                      <hr className="my-4" />

                      <h3 className="font-medium text-gray-700 mb-1">
                        Description:
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow">
                      <h2 className="font-semibold text-gray-700 mb-3">
                        Attachment
                      </h2>
                      <hr className="mb-4" />

                      <img
                        src={item.attachment}
                        alt="attachment"
                        className="rounded-lg border"
                      />
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl shadow h-fit">
                    <h2 className="font-semibold text-gray-700 mb-3">
                      Admin Actions
                    </h2>
                    <hr className="mb-4" />

                    <div className="mb-4">
                      <label className="text-sm text-gray-600">Status</label>
                      <select className="w-full mt-1 p-2 border rounded-lg text-sm">
                        <option>Pending</option>
                        <option>Resolved</option>
                        <option>Rejected</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="text-sm text-gray-600">Priority</label>
                      <select className="w-full mt-1 p-2 border rounded-lg text-sm">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="text-sm text-gray-600">
                        Internal Notes
                      </label>
                      <textarea
                        className="w-full mt-1 p-2 border rounded-lg text-sm"
                        placeholder="Add internal note..."
                      />
                    </div>

                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                      Save Note
                    </button>
                  </div>
                </div>
              </div>
              //   <div key={item._id}>
              //     <div>
              //       <h1>
              //         Report ID:{" "}
              //         <span>
              //           {item.reportId}-{item.title}
              //         </span>
              //       </h1>
              //       <div>
              //         <h2>{item.status}</h2>
              //         <h2>
              //           <Tag className="rotate-90" />
              //           {item.priority}
              //         </h2>
              //       </div>
              //     </div>
              //     <div>
              //       {" "}
              //       <div>
              //         <h1>User Information</h1>
              //         <hr />
              //         <div>
              //           <div className="w-16 h-16 rounded-full bg-card-soft text-foreground flex items-center justify-center text-xl font-bold">
              //             {item.user?.name?.charAt(0).toUpperCase()}
              //           </div>
              //           <h2 className="font-bold">{item.user.name}</h2>
              //         </div>
              //         <h2>{item.user.gmail}</h2>
              //       </div>
              //       <div>
              //         <h1>Report Information</h1>
              //         <hr />
              //         <h2>Type:{item.type}</h2>
              //         <h2>Target:{item.targetType}</h2>
              //         <hr />
              //         <h1>Description:</h1>
              //         <p>{item.description}</p>
              //       </div>
              //       <div>
              //         <h1>Attachment</h1>
              //         <img src={item.attachment} alt="" />
              //       </div>
              //     </div>
              //     <div>
              //       <h1>Admin Action</h1>
              //       <hr />
              //       <div>
              //         {" "}
              //         <h2>Status</h2>
              //         <select name="status">
              //           <option value=""></option>
              //           <option value=""></option>
              //           <option value=""></option>
              //         </select>
              //       </div>
              //       <div>
              //         <h1>Priority</h1>
              //         <select name="status">
              //           <option value=""></option>
              //           <option value=""></option>
              //           <option value=""></option>
              //         </select>
              //       </div>
              //       <div>
              //         <h1>Assign To</h1>
              //         <select name="status">
              //           <option value=""></option>
              //           <option value=""></option>
              //           <option value=""></option>
              //         </select>
              //       </div>
              //       <div>
              //         <h2>Internal Notes</h2>
              //         <input type="text" placeholder="inter" />
              //       </div>
              //       <button>Save Report</button>
              //     </div>
              //   </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReportFullView;
