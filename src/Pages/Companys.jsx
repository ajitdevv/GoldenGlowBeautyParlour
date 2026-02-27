import React, { useEffect, useState } from "react";
import { Getmanufacturers } from "../apis/product";
import AccountBar from "../componentpreant/AccountBar";
import HeadingSubheading from "../components/HeadingSubheading";
import CompanyCard from "../components/CompanyCard";
import video from "/videobg.mp4";
import { useNavigate } from "react-router-dom";
const CompaniesPage = () => {
  let [companies, setcompanys] = useState([]);
  let [loader, setloader] = useState(true);
  let [error, setError] = useState(null);
  let [companyname, setcompanyname] = useState(null);
  console.log(companyname);

  useEffect(() => {
    const FetchData = async () => {
      try {
        setloader(true);
        setError(null);
        const data = await Getmanufacturers();
        setcompanys(data);
      } catch (error) {
        console.log("Error loading companies", error);
        setError("Failed to load companies");
      } finally {
        setloader(false);
      }
    };
    FetchData();
  }, []);
  let Navgation = useNavigate();
  const companiesDeatilePage = (item) => {
    setcompanyname(item);
    Navgation(`/admin/companies/details/${item.id}`);
    console.log(item);
  };
  return (
    <div>
      <div>
        <AccountBar />
      </div>
      <div className="flex justify-around items-center p-2">
        <HeadingSubheading
          h1={"companies"}
          h2={"Manage your company relationships"}
        />
        <button className="px-3 font-medium py-2  h-fit whitespace-nowrap w-fit bg-primary/50 hover:bg-primary/80 text-foreground rounded-xl transition-all duration-300 cursor-pointer ">
          <span className="text-xl">+</span> Add companies
        </button>
      </div>
      <div className="relative h-full border-t-4 border-blue-200 rounded-2xl w-full overflow-hidden p-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 top-0 z-0 left-0 w-full h-full rounded-2xl object-cover pointer-events-none"
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="z-10 grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-full  transform-gpu">
          {loader &&
            Array.from({ length: 26 }).map((_, i) => (
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
          {!loader && error && (
            <div className="col-span-full text-center text-red-400">
              {error}
            </div>
          )}
          {!loader &&
            !error &&
            companies.length > 0 &&
            companies.map((item, index) => {
              return (
                <div key={index}>
                  <a onClick={()=>companiesDeatilePage(item)}>
                    <CompanyCard
                      Name={item.name}
                      Category={item.category}
                      Location={item.country}
                      ProductsCount={item.productsCount}
                    />
                  </a>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;
