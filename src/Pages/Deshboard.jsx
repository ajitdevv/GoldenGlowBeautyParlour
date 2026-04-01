import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Getmanufacturers, getProducts } from "../apis/product";
import TotalCards from "../componentpreant/TotalCards";
import { RevenueGraph } from "../components/RevenueGraph";
import { ManufacturerChart } from "../components/CategoryChart";
import AccountBar from "../componentpreant/AccountBar";
import HeadingSubheading from "../components/HeadingSubheading";
import DesablePopUp from "../components/DesablePopUp";

const Deshboard = () => {
  let [productdata, setproductdata] = useState([]);
  let [manufacturers, setmanufacturers] = useState([]);
  let [loading, setloading] = useState(true);
  let [err, seterr] = useState(null);
  useEffect(() => {
    FetchData();
  }, []);
  const FetchData =async () => {
    try {
      setloading(true);
      seterr(null);

      const [products, manufacturers] = await Promise.all([
        getProducts(),
        Getmanufacturers(),
      ]);
      setproductdata(products.data);
      setmanufacturers(manufacturers.data);
    } catch (error) {
      console.log(error);
      seterr("Failed to load data");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className=" flex flex-col gap-6 py-3 px-2">
      <div>
        <AccountBar />
      </div>
      <HeadingSubheading
        h1={"Dashboard"}
        h2={"Welcome to your new CRM dashboard"}
      />
      {loading && (
        <div className="flex flex-col gap-6 px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg flex flex-col items-center shadow-[0_-4px_10px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.1)] p-6 animate-pulse"
              >
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
          <div className="h-100 bg-gray-200 rounded-lg w-full mb-4"></div>
          <div className="h-100 bg-gray-200 rounded-lg w-full mb-4"></div>
        </div>
      )}
      {!loading && err && (
        <div className="col-span-full text-center text-red-400">{err}</div>
      )}
      {productdata.length > 0 && manufacturers.length > 0 && (
        <>
          <div className="">
            <TotalCards
              productdata={productdata}
              manufacturers={manufacturers}
            />
          </div>
          <div className="w-full h-full">
            <RevenueGraph productdata={productdata} />
          </div>
          <div className="w-full h-full">
            <ManufacturerChart productdata={productdata} />
          </div>
        </>
      )}
    </div>
  );
};

export default Deshboard;
