import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetDeals } from "../apis/product";
import HeadingSubheading from "../components/HeadingSubheading";
import { DeleteDeal } from "../apis/deletedata";

const DealFullView = () => {
  const { _id } = useParams();

  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);
  let [data, setData] = useState([]);
  let [dloading, setDLoading] = useState(false);
  useEffect(() => {
    const Fetchdata = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await GetDeals();
        setData(res.data);
      } catch (err) {
        console.log("Error Loading Deals", err);
        setError("Failed to load deals");
      } finally {
        setLoading(false);
      }
    };

    Fetchdata();
  }, [_id]);

  const FindDeal = data.find((item) => String(item._id) === String(_id));

  const handleDealDelete = async (FindDeal) => {
    try {
      setDLoading(true);
      await DeleteDeal({ id: FindDeal.id });
    } catch (error) {
      console.log("Not delet", error);
      throw error;
    }
  };
  return (
    <div className="flex flex-col items-center gap-2 md:gap-5 mt-10">
      <div className="flex items-start w-full ml-2">
        <HeadingSubheading
          h1={"Deal Details"}
          h2={"View and manage this deal information"}
        />
      </div>
      {loading && (
        <div className="bg-(--card-soft) rounded-2xl border border-(--border) shadow-(--shadow) p-6 w-full max-w-md mx-auto animate-pulse">
          <div className="flex justify-between items-start mb-2">
            <div className="h-6 w-48 bg-gray-300 rounded"></div>
            <div className="h-7 w-16 bg-gray-300 rounded-full"></div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
          </div>

          <div className="h-px bg-gray-300 mb-2"></div>

          <div className="flex justify-between items-center mb-4">
            <div className="h-2 w-24 bg-gray-300 rounded"></div>
            <div className="h-4 w-28 bg-gray-300 rounded"></div>
          </div>

          <div className="h-px bg-gray-300 mb-4"></div>

          <div className="flex justify-between items-center mb-3">
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
            <div className="h-7 w-16 bg-gray-300 rounded-full"></div>
          </div>

          <div className="h-3 w-40 bg-gray-300 rounded mx-auto mb-6"></div>

          <div className="flex gap-4">
            <div className="h-8 flex-1 bg-gray-300 rounded-xl"></div>
            <div className="h-8 flex-1 bg-gray-300 rounded-xl"></div>
          </div>
        </div>
      )}
      {!loading && error && <div>{error}</div>}
      {!loading && !error && !FindDeal && <div>Deal not found</div>}
      {FindDeal && (
        <div className="flex items-center w-[90%] justify-center h-full ">
          <div className="bg-(--card-soft) rounded-2xl border border-(--border) shadow-(--shadow) p-5 w-full max-w-md">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-lg font-semibold text-(--foreground)">
                {FindDeal.title}
              </h2>

              <span className="text-xs px-3 py-1 rounded-full bg-(--primary) text-(--primary-foreground)">
                {FindDeal.stage}
              </span>
            </div>

            <div className="flex items-center gap-2 text-(--muted) text-sm mb-3">
              <div className="w-6 h-6 rounded-full bg-(--card) flex items-center justify-center text-xs font-bold">
                {FindDeal.companyName?.[0]}
              </div>
              {FindDeal.companyName}
            </div>

            <div className="h-px bg-(--border) mb-3"></div>

            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-(--muted)">Deal Value</span>
              <span className="text-lg font-semibold">
                ₹{FindDeal.value?.toLocaleString()}
              </span>
            </div>

            <div className="h-px bg-(--border) mb-3"></div>

            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-(--muted)">
                Probability: {FindDeal.probability}%
              </span>

              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  FindDeal.status === "Closed"
                    ? "bg-red-100 text-red-600"
                    : FindDeal.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {FindDeal.status}
              </span>
            </div>

            <div className="text-xs text-(--muted) mb-4">
              Close Date: {FindDeal.expectedCloseDate}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => console.log("Edit", FindDeal)}
                className="flex-1 py-2 rounded-xl bg-(--primary) text-(--primary-foreground) text-sm font-medium"
              >
                Edit
              </button>

              <button
                onClick={() => handleDealDelete(FindDeal)}
                className="flex-1 py-2 rounded-xl bg-(--danger) text-white text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealFullView;
