import React from "react";
import { HomeCard } from "../components/HomeCard";
import { BoxesIcon, Factory, HandshakeIcon, Wallet } from "lucide-react";

const TotalCards = ({ productdata, manufacturers }) => {
  const totalSale = productdata
    .reduce((sum, item) => sum + item.stockSold * item.price, 0)
    .toLocaleString("en-IN");

  const Carddata = [
    { title: "Total Sales", logo: <Wallet size={18} />, value: `₹ ${totalSale}` },
    { title: "Total Manufacturers", logo: <Factory size={18} />, value: manufacturers.length },
    { title: "Total Products", logo: <BoxesIcon size={18} />, value: productdata.length },
    { title: "Active Deals", logo: <HandshakeIcon size={18} />, value: manufacturers.length },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {Carddata.map((card, index) => (
        <HomeCard key={index} title={card.title} logo={card.logo} value={card.value} />
      ))}
    </div>
  );
};

export default React.memo(TotalCards);
