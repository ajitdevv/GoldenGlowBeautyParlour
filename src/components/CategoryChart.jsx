import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export const ManufacturerChart = ({ productdata }) => {
  const Manufacturer = {};
  productdata.forEach((product) => {
    if (!Manufacturer[product.manufacturer]) {
      Manufacturer[product.manufacturer] = 0;
    }
    Manufacturer[product.manufacturer] +=
      product.stockSold * product.revenuePerUnit;
  });

  let ArrayOfManufacturer = Object.keys(Manufacturer).map((key) => ({
    name: key,
    value: Manufacturer[key],
  }));
  let TopManufacturers = ArrayOfManufacturer.sort((a, b) => b.value - a.value);
  let Top5Manufacturers = TopManufacturers.slice(0, 5);
  let OthersManufacturers = TopManufacturers.slice(5);
  const othersValue = OthersManufacturers.reduce(
    (sum, item) => sum + item.value,
    0,
  );
  if (othersValue > 0) {
    Top5Manufacturers.push({
      name: "Others",
      value: othersValue,
    });
  }
  console.log(OthersManufacturers);
  console.log(Top5Manufacturers);
  const COLORS = [
    "#3b82f6",
    "#22c55e",
    "#f97316",
    "#e11d48",
    "#a855f7",
    "#14b8a6",
  ];
  return (
    <div className="border rounded-lg border-foreground">
      <div className="flex items-start p-4">
        <h1 className="text-2xl text-foreground ">
            Top 5 Manufacturers
        </h1>
      </div>
      <div className="w-full h-100 ">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={Top5Manufacturers}
              dataKey="value"
              outerRadius="50%"
              label
              fill="#8884d8"
            >
              {Top5Manufacturers.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
