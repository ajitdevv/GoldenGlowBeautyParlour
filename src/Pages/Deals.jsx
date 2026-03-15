import React, { useEffect, useState } from "react";
import { GetDeals } from "../apis/product";
import { AddButton } from "../components/Button";
import HeadingSubheading from "../components/HeadingSubheading";
import AccountBar from "../componentpreant/AccountBar";

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

  return (
    <div className="flex-col gap-6 h-full flex w-full">
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
          <AddButton children={"Add Deals"} onClick={console.log("hi")} />
        </div>
      </div>
      <div className="grid grid-cols-3">
        {!loader && error && (
          <div className="col-span-full text-center text-red-400">{error}</div>
        )}
        {!loader && !error && deals.length < 0 && (
          <div className="col-span-full text-center text-red-400">
            Deals Are Not Found & Not Avalible
          </div>
        )}
        {!loader&&!error&&deals.length>0&&(deals.map ((deal,index)=>{
          return(
            <div
        key={index}
        className="bg-white shadow-md rounded-xl p-5 border hover:shadow-xl transition"
      >
        <h2 className="text-lg font-bold">{deal.title}</h2>

        <p className="text-gray-500">{deal.companyName}</p>

        <div className="flex justify-between mt-3">
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">
            {deal.stage}
          </span>

          <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
            {deal.status}
          </span>
        </div>

        <div className="mt-4">
          <p className="text-gray-400 text-sm">Deal Value</p>
          <h3 className="text-xl font-semibold">₹{deal.value}</h3>
        </div>

        <div className="mt-2 text-sm text-gray-500">
          Probability: {deal.probability}%
        </div>

        <div className="mt-2 text-xs text-gray-400">
          Close Date: {deal.expectedCloseDate}
        </div>

      </div>
          )}
        ))}
      </div>
    </div>
  );
};

export default Deals;
