import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../apis/product";

const Deshboard = () => {
  let [productdata, setproductdata] = useState([]);
  useEffect(() => {
    getProducts()
      .then((data) => {
        setproductdata(data);
      })
      .catch((err) => {
        console.log("Error fetching products:", err);
      });
  },[]);
  console.log(productdata);
  
  let navigation = useNavigate();
  let handellogout = () => {
    localStorage.removeItem("token");
    console.log("logout sacassefull");
    navigation("/login");
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <button
        onClick={() => handellogout()}
        className="bg-primary text-white px-4 py-2 rounded-md mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default Deshboard;
