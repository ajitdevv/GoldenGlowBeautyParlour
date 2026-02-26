import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Getmanufacturers, getProducts } from "../apis/product";
import TotalCards from "../componentpreant/TotalCards";
import { RevenueGraph } from "../components/RevenueGraph";
import { ManufacturerChart } from "../components/CategoryChart";
import AccountBar from "../componentpreant/AccountBar";
import HadingSubhading from "../components/HadingSubhading";

const Deshboard = () => {
  let [productdata, setproductdata] = useState([]);
  let [manufacturers, setmanufacturers] = useState([]);
  let [loading, setloading] = useState(true);
  let [err, seterr] = useState(null);
  useEffect(() => {
    const FatchData = async () => {
      try {
        setloading(true);
        const [productdata, manufacturedata] = await Promise.all([
          getProducts(),
          Getmanufacturers(),
        ]);
        setproductdata(productdata);
        setmanufacturers(manufacturedata);
      } catch (error) {
        console.log("Error to Find Product and Manufacture", error);
        seterr("Data not Found");
      } finally {
        setloading(false);
      }
    };
    FatchData();
  }, []);

  let navigation = useNavigate();
  let handellogout = () => {
    localStorage.removeItem("token");
    console.log("logout sacassefull");
    navigation("/login");
  };
  return (
    <div className=" flex flex-col gap-6 py-3">
      <div>
        <AccountBar />
      </div>
      <HadingSubhading
        h1={"Dashboard"}
        h2={"Welcome to your new CRM dashboard"}
      />
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-6 animate-pulse"
            >
              <div className="h-5 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      )}
      {!loading && err && (
        <div className="col-span-full text-center text-red-400">{err}</div>
      )}
      {productdata.length > 0 && manufacturers.length > 0 && (
        <>
          <div>
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
