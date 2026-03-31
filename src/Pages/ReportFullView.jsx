import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetReports } from "../apis/product";
import { Tag } from "lucide-react";
import { ReportUpdate } from "../apis/updatedata";
import { SaveButton } from "../components/Button";
import DesablePopUp from "../components/DesablePopUp";

const ReportFullView = () => {
  let [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);
  let [error, setError] = useState(null);
  let [urloading, setURLoading] = useState(false);
  let [popup, setPopUp] = useState(false);
  let [updateForm, setUpdateForm] = useState({
    status: "",
    priority: "",
    description: "",
  });
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
    setUpdateForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleReportUpdate = async () => {
    try {
      setURLoading(true);
      const edits = {
        reportId: SelectedReport.reportId,
        ...updateForm,
      };
      await ReportUpdate({
        id: SelectedReport._id,
        edits,
      });
      setPopUp(true);
      setTimeout(() => {
        setPopUp(false);
      }, 3000);
    } catch (error) {
      console.log("Report not updated", error);
      throw error;
    } finally {
      setURLoading(false);
    }
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
  return (
    <div>
      {loading && (
        <div className="space-y-6 mt-8 animate-pulse">
          <div className="bg-white rounded-2xl shadow p-5 space-y-4">
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>

            <div className="flex gap-3">
              <div className="h-7 w-20 bg-gray-300 rounded-full"></div>
              <div className="h-7 w-16 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow p-5 space-y-4">
                <div className="h-5 bg-gray-300 rounded w-40"></div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-300 rounded"></div>
                    <div className="h-3 w-40 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow p-5 space-y-4">
                <div className="h-5 bg-gray-300 rounded w-48"></div>

                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-300 rounded"></div>
                  <div className="h-4 w-40 bg-gray-300 rounded"></div>
                </div>

                <div className="space-y-2 mt-4">
                  <div className="h-4 w-28 bg-gray-300 rounded"></div>
                  <div className="h-4 w-full bg-gray-300 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow p-5 space-y-4">
                <div className="h-5 bg-gray-300 rounded w-32 mx-auto"></div>
                <div className="h-32 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow p-5 space-y-6">
              <div className="h-5 bg-gray-300 rounded w-40"></div>
              <div className="space-y-2">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
                <div className="h-10 bg-gray-300 rounded-xl"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
                <div className="h-10 bg-gray-300 rounded-xl"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
                <div className="h-24 bg-gray-300 rounded-xl"></div>
              </div>
              <div className="h-12 bg-gray-300 rounded-xl"></div>
            </div>
          </div>
        </div>
      )}
      {!loading && error && (
        <div className="bg-red-300 text-black">{error}</div>
      )}
      {!loading && !error && !SelectedReport && (
        <div className="bg-blue-300 text-black">not found</div>
      )}
      {!loading && !error && SelectedReport && (
        <div>
          <div className="p-6 bg-card/50 min-h-screen">
            <div className="bg-card-soft rounded-md shadow p-5 mb-6 flex flex-col items-start gap-2">
              <h1 className="text-lg font-semibold text-foreground">
                Report ID:{" "}
                <span className="font-bold text-blue-600">
                  {SelectedReport.reportId}
                </span>{" "}
                - {SelectedReport.title}
              </h1>

              <div className="flex gap-2">
                <span className="px-3 py-1 text-xs rounded-md bg-yellow-400 text-yellow-800 font-medium">
                  {SelectedReport.status}
                </span>
                <span className="px-3 py-1 text-xs rounded-md bg-red-400 text-red-900 font-medium">
                  {SelectedReport.priority}
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
                      {SelectedReport.user?.name?.charAt(0)}
                    </div>

                    <div className="flex flex-col items-start">
                      <h3 className="font-semibold text-foreground">
                        {SelectedReport.user.name}
                      </h3>
                      <p className="text-sm text-foreground/60">
                        {SelectedReport.user.email}
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
                    {SelectedReport.type?.charAt().toUpperCase() +
                      SelectedReport.type?.slice(1)}
                  </p>
                  <p className="text-sm text-foreground/80">
                    <span className="font-medium">Target:</span>
                    {SelectedReport.targetType?.charAt().toUpperCase() +
                      SelectedReport.targetType?.slice(1)}
                  </p>

                  <hr className="h-px my-2 bg-muted w-full" />

                  <h3 className="font-medium text-foreground/80 mb-1">
                    Description:
                  </h3>
                  <p className="text-sm text-foreground/50">
                    {SelectedReport.description}
                  </p>
                </div>

                <div className="bg-card-soft p-5 rounded-xl shadow">
                  <h2 className="font-semibold text-foreground/80 mb-3">
                    Attachment
                  </h2>
                  <hr className="h-px my-2 bg-muted w-full" />

                  <img
                    src={SelectedReport.attachment}
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
                  <label className="text-sm text-foreground/80">Status</label>
                  <select
                    name="status"
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg text-sm"
                  >
                    <option className="bg-blue-400 text-black" disabled>
                      {SelectedReport.status}
                    </option>
                    <option>pending</option>
                    <option>resolved</option>
                    <option>rejected</option>
                  </select>
                </div>
                <hr className="h-px bg-muted w-full" />

                <div className="mb-4 flex flex-col gap-4 items-start">
                  <label className="text-sm text-foreground/80">Priority</label>
                  <select
                    name="priority"
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg text-sm"
                  >
                    <option className="bg-blue-400 text-black" disabled>
                      {SelectedReport.priority}
                    </option>
                    <option>low</option>
                    <option>medium</option>
                    <option>high</option>
                  </select>
                </div>
                <hr className="h-px bg-muted w-full" />
                <div className="mb-4 flex flex-col gap-4 items-start">
                  <label className="text-sm text-foreground/80">
                    Internal Notes
                  </label>
                  <textarea
                    name="description"
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 bg-card/50 text-sm"
                    placeholder="Add internal note..."
                  />
                </div>
                <hr className="h-px my-2 bg-muted w-full" />
                <SaveButton
                  onClick={() => handleReportUpdate()}
                  urloading={urloading}
                  style={"w-full px-1"}
                >
                  Save Note
                </SaveButton>
              </div>
            </div>
          </div>
          <DesablePopUp popup={popup}>Edit successfully ✅ </DesablePopUp>
        </div>
      )}
    </div>
  );
};

export default ReportFullView;
