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
        setDeals(data.data);
      } catch (error) {
        setError(true);
        console.log("Error loading Deals", error);
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
  const Navgation = useNavigate();
  const AddDeal = () => {
    Navgation("/admin/deals/add+new+deal");
  };
  const handleclick=(deal)=>{
  Navgation(`/admin/deal/${deal._id}`)
  }
  return (
    <div className="flex-col gap-6 py-3 flex w-full">
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
          <AddButton children={"Add Deals"} onClick={() => AddDeal()} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {loader && (
          <div className="w-full min-w-245 max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl w-full h-full shadow border p-5 space-y-3 animate-pulse flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <div className="h-5 w-40 bg-gray-300 rounded"></div>
                    <div className="h-5 w-20 bg-gray-300 rounded-full"></div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-5 h-4 bg-gray-300 rounded-full"></div>
                    <div className="h-3 w-24 bg-gray-300 rounded"></div>
                  </div>

                  <div className="h-px bg-gray-300"></div>

                  <div className="flex justify-between items-center">
                    <div className="h-3 w-24 bg-gray-300 rounded"></div>
                    <div className="h-5 w-28 bg-gray-300 rounded"></div>
                  </div>

                  <div className="h-px bg-gray-300"></div>

                  <div className="flex justify-between items-center">
                    <div className="h-3 w-32 bg-gray-300 rounded"></div>
                    <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
                  </div>

                  <div className="h-3 w-40 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        )}
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
          deals.map((deal) => {
            return (
              <div key={deal._id} onClick={()=>handleclick(deal)
              } className="bg-background shadow-(--shadow) rounded-xl flex flex-col gap-1.5 w-full items-start p-5 border hover:shadow-(-shadow) transition">
                <DealCard
                  deal={deal}
                  getStatusColor={getStatusColor}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Deals;
