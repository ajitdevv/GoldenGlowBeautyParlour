import React, { useEffect, useState } from "react";
import { Getmanufacturers, getProducts } from "../apis/product";
import { HomeCard } from "../components/HomeCard";
import { BoxesIcon, Factory, HandshakeIcon, Wallet } from "lucide-react";

const TotalCards = ( {productdata ,manufacturers}) => {
  let totalSale = productdata
    .reduce((sum, item) => sum + item.stockSold * item.price, 0)
    .toLocaleString("en-IN");

  const Carddata = [
    {
      title: "Total Sales",
      logo: <Wallet  size={20} />,
      value: `₹ ${totalSale}`,
    },
    {
      title: "Total Manufacturers",
      logo: <Factory size={20} />,
      value: manufacturers.length,
    },
    {
      title: "Total Products",
      logo: <BoxesIcon size={20} />,
      value: productdata.length,
    },
    {
      title: "Active Deals",
      logo: <HandshakeIcon  size={20} />,
      value: manufacturers.length,
    },
  ];
  return (
    <div className="flex justify-between gap-4 ">
      {Carddata.map((card, index) => (
        <HomeCard
          key={index}
          title={card.title}
          logo={card.logo}
          value={card.value}
        />
      ))}
    </div>
  );
};

export default TotalCards;
