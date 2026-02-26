import React, { useEffect, useState } from "react";
import { Getmanufacturers } from "../apis/product";
import AccountBar from "../componentpreant/AccountBar";
import HadingSubhading from "../components/HadingSubhading";
import CompanyCard from "../components/CompanyCard";
import video from "/videobg.mp4";
const CompanysPage = () => {
  let [companys, setcompanys] = useState([]);
  let [loder, setloder] = useState(true);
  let [error, setError] = useState(null);
  useEffect(() => {
    const FetchData = async () => {
      try {
        setloder(true);
        setError(null);
        const data = await Getmanufacturers();
        setcompanys(data);
      } catch (error) {
        console.log("Error loading companies", error);
        setError("Failed to load companies");
      } finally {
        setloder(false);
      }
    };
    FetchData();
  }, []);

  return (
    <div>
      <div>
        <AccountBar />
      </div>
      <div className="flex justify-around items-center p-2">
        <HadingSubhading
          h1={"Companys"}
          h2={"Manage your company relationships"}
        />
        <button className="px-3 font-medium py-2  h-fit whitespace-nowrap w-fit bg-primary/50 hover:bg-primary/80 text-foreground rounded-xl transition-all duration-300 cursor-pointer ">
          <span className="text-xl">+</span> Add Company
        </button>
      </div>
      <div className="relative h-full border-t-4 border-blue-200 rounded-2xl w-full overflow-hidden p-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 top-0 z-0 left-0 w-full h-full rounded-2xl object-cover pointer-events-none"
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="z-10 grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-full  transform-gpu">
          {loder &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-pulse"
              >
                <div className="h-6 w-1/2 bg-gray-400/30 rounded mb-4"></div>
                <div className="h-4 w-3/4 bg-gray-400/20 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-gray-400/20 rounded mb-2"></div>
                <div className="h-4 w-1/3 bg-gray-400/20 rounded"></div>
              </div>
            ))}
          {!loder && error && (
            <div className="col-span-full text-center text-red-400">
              {error}
            </div>
          )}
          {!loder &&
            !error &&
            companys.length > 0 &&
            companys.map((item, index) => {
              return (
                <div key={index}>
                  <CompanyCard
                    Name={item.name}
                    Cetagory={item.category}
                    Location={item.country}
                    ProductsCount={item.productsCount}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CompanysPage;
