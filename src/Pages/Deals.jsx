import React, { useEffect, useState } from "react";
import { GetDeals } from "../apis/product";
import { AddButton, RetryButton } from "../components/Button";
import HeadingSubheading from "../components/HeadingSubheading";
import AccountBar from "../componentpreant/AccountBar";
import DealCard from "../components/DealCard";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);
  const Navgation = useNavigate();

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      setLoader(true);
      setError(false);
      const data = await GetDeals();
      setDeals(data.data);
    } catch (error) {
      setError(true);
      console.log("Error loading Deals", error);
    } finally {
      setLoader(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-success/15 text-success ring-1 ring-success/25";
      case "Pending":
        return "bg-warning/15 text-warning ring-1 ring-warning/25";
      case "Closed":
        return "bg-danger/15 text-danger ring-1 ring-danger/25";
      default:
        return "bg-card-soft text-muted ring-1 ring-border";
    }
  };

  const AddDeal = () => Navgation("/admin/deals/add+new+deal");
  const handleclick = (deal) => Navgation(`/admin/deal/${deal._id}`);

  return (
    <div className="flex flex-col gap-6">
      <AccountBar />

      <div className="flex items-end justify-between gap-3 animate-fadeUp">
        <HeadingSubheading
          h1={"Deals Pipeline"}
          h2={"Track your sales opportunities"}
        />
        <AddButton onClick={AddDeal}>
          <Plus size={16} /> Add Deal
        </AddButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 animate-fadeUp">
        {loader &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-60 rounded-2xl border border-border bg-card-soft shimmer"
            />
          ))}

        {!loader && error && (
          <div className="col-span-full rounded-2xl border border-danger/30 bg-danger/10 p-6 text-center">
            <p className="text-danger font-medium">Failed to load deals</p>
            <div className="mt-3 flex justify-center">
              <RetryButton onClick={FetchData}>Retry</RetryButton>
            </div>
          </div>
        )}

        {!loader && !error && deals.length === 0 && (
          <div className="col-span-full text-center text-muted text-sm">
            No deals found yet — create your first one.
          </div>
        )}

        {!loader &&
          !error &&
          deals.length > 0 &&
          deals.map((deal) => (
            <div
              key={deal._id}
              onClick={() => handleclick(deal)}
              className="cursor-pointer rounded-2xl border border-border bg-card p-5 shadow-(--shadow) transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_18px_40px_-18px_rgba(224,182,84,0.45)]"
            >
              <DealCard deal={deal} getStatusColor={getStatusColor} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Deals;
