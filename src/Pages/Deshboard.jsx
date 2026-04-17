import React, { useEffect, useState } from "react";
import { Getmanufacturers, getProducts } from "../apis/product";
import TotalCards from "../componentpreant/TotalCards";
import { RevenueGraph } from "../components/RevenueGraph";
import { ManufacturerChart } from "../components/CategoryChart";
import AccountBar from "../componentpreant/AccountBar";
import HeadingSubheading from "../components/HeadingSubheading";
import DesablePopUp from "../components/DesablePopUp";
import { RetryButton } from "../components/Button";

const Deshboard = () => {
  const [productdata, setproductdata] = useState([]);
  const [manufacturers, setmanufacturers] = useState([]);
  const [loading, setloading] = useState(true);
  const [err, seterr] = useState(null);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
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
    <div className="flex flex-col gap-6">
      <AccountBar />

      <div className="animate-fadeUp">
        <HeadingSubheading
          h1={"Dashboard"}
          h2={"Welcome back — here is what's happening today."}
        />
      </div>

      {loading && (
        <div className="flex flex-col gap-6 animate-fadeUp">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-2xl border border-border bg-card-soft shimmer"
              />
            ))}
          </div>
          <div className="h-80 rounded-2xl border border-border bg-card-soft shimmer" />
          <div className="h-80 rounded-2xl border border-border bg-card-soft shimmer" />
        </div>
      )}

      {!loading && err && (
        <div className="rounded-2xl border border-danger/30 bg-danger/10 p-6 text-center">
          <p className="text-danger font-medium">{err}</p>
          <div className="mt-3 flex justify-center">
            <RetryButton onClick={FetchData}>Try Again</RetryButton>
          </div>
        </div>
      )}

      {!loading &&
        !err &&
        productdata.length === 0 &&
        manufacturers.length === 0 && (
          <DesablePopUp
            title="No data available"
            message="There is no data available for the selected period."
          />
        )}

      {!loading && productdata.length > 0 && manufacturers.length > 0 && (
        <div className="flex flex-col gap-5 md:gap-6 animate-fadeUp">
          <TotalCards productdata={productdata} manufacturers={manufacturers} />
          <RevenueGraph productdata={productdata} />
          <ManufacturerChart productdata={productdata} />
        </div>
      )}
    </div>
  );
};

export default Deshboard;
