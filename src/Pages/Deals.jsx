import React, { useEffect, useState } from "react";
import { GetDeals } from "../apis/product";
import { AddButton } from "../components/Button";
import HeadingSubheading from "../components/HeadingSubheading";
import AccountBar from "../componentpreant/AccountBar";
import { User2Icon } from "lucide-react";
import DealCard from "../components/DealCard";
import { useNavigate } from "react-router-dom";

const Deals = () => {
  let [deals, setDeals] = useState([]);
  let [loader, setLoader] = useState(true);
  let [error, setError] = useState(false);
  useEffect(() => {
    const FetchData = async () => {
      try {
        setLoader(true);
        setError(false);
        const data = await GetDeals();
        setDeals(data);
      } catch (error) {
        setError(true);
        console.log("Error loading companies", error);
      } finally {
        setLoader(false);
      }
    };
    FetchData();
  }, []);
  console.log(deals);
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-500 text-white";
      case "Pending":
        return "bg-yellow-500 text-white";
      case "Closed":
        return "bg-red-500 text-white";

      default:
        return "bg-gray-400 text-black";
    }
  };
  const Navgation=useNavigate()
  const AddDeal=()=>{
Navgation("/admin/deals/add+new+deal")
  }
  return (
    <div className="flex-col gap-6 py-3 h-full flex w-full">
      <div className="w-full">
        <AccountBar />
      </div>
      <div className="flex justify-between w-full pr-5">
        <div className="pr-3">
          <HeadingSubheading
            h1={"Deals Pipeline"}
            h2={"Track your sales opportunities"}
          />
        </div>
        <div className="relative w-fit">
          <AddButton children={"Add Deals"} onClick={()=>AddDeal()} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {!loader && error && (
          <div className="col-span-full text-center text-danger">{error}</div>
        )}
        {!loader && !error && deals.length < 0 && (
          <div className="col-span-full text-center text-danger">
            Deals Are Not Found & Not Avalible
          </div>
        )}
        {!loader &&
          !error &&
          deals.length > 0 &&
          deals.map((deal, index) => {
           return <DealCard
              key={index}
              deal={deal}
              getStatusColor={getStatusColor}
            />;
          })}
      </div>
    </div>
  );
};

export default Deals;
