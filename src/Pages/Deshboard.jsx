import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Getmanufacturers, getProducts } from "../apis/product";
import TotalCards from "../componentpreant/TotalCards";
import { RevenueGraph } from "../components/RevenueGraph";
import { ManufacturerChart } from "../components/CategoryChart";
import AccountBar from "../componentpreant/AccountBar";
import HeadingSubheading from "../components/HeadingSubheading";

const Deshboard = () => {
  let [productdata, setproductdata] = useState([]);
  let [manufacturers, setmanufacturers] = useState([]);
  let [loading, setloading] = useState(true);
  let [err, seterr] = useState(null);
  // useEffect(() => {
  //   const FatchData = async () => {
  //     try {
  //       setloading(true);
  //       const [productdata, manufacturedata] = await Promise.all([
  //         getProducts(),
  //         Getmanufacturers(),
  //       ]);
  //       console.log(productdata);
  //       console.log(manufacturedata);
        
  //       setproductdata(productdata);
  //       setmanufacturers(manufacturedata);
  //     } catch (error) {
  //       console.log("Error to Find Product and Manufacture", error);
  //       seterr("Data not Found");
  //     } finally {
  //       setloading(false);
  //     }
  //   };
  //   FatchData();
  // }, []);
  useEffect(()=>{
    const FetchData=async()=>{
      try {
         setloading(true);
        seterr(null);
         const data = await getProducts();
                setproductdata(data.data);
      } catch (error) {
         console.log("Error Lodaing product", error);
        seterr("Failed to load product");
      }finally{
        setloading(false);
      }
    }
     FetchData();
  },[])
  useEffect(()=>{
    const FetchData=async()=>{
      try {
         setloading(true);
        seterr(null);
         const data = await Getmanufacturers();
                setmanufacturers(data.data);
      } catch (error) {
         console.log("Error Lodaing manufacture", error);
        seterr("Failed to load manufacture");
      }finally{
        setloading(false);
      }
    }
     FetchData();
  },[])


  console.log(productdata,manufacturers);
  

  let navigation = useNavigate();
  let handellogout = () => {
    localStorage.removeItem("token");
    console.log("logout sacassefull");
    navigation("/login");
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl flex flex-col gap-2 items-center shadow-md p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
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
