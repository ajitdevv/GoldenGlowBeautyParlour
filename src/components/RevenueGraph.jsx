import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const RevenueGraph = ({ productdata }) => {
  const [aspect, setAspect] = useState(1);

  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setAspect(3); // large screen
    } else {
      setAspect(1); // small screen
    }
  };

  handleResize(); // initial run
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);
  let Top10Products = [...productdata]
    .sort((a, b) => a.stockSold - b.stockSold)
    .slice(0, 10);
  console.log(Top10Products);

  return (
    <div className="border h-full rounded-lg border-foreground">
      <div>
        <h1 className="text-2xl flex items-start p-4">Revenue Trend</h1>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <ResponsiveContainer width="95%" aspect={aspect}>
          <LineChart data={Top10Products}>
            <CartesianGrid />
            <XAxis
              dataKey="name"
              tickFormatter={(value) => value.slice(0, 6) + "..."}
              interval={"preserveStartEnd"}
            />
            <YAxis />
            <Legend />
            <Tooltip />
            <Line dataKey="stockAvailable" stroke="red" />
            <Line dataKey="stockSold" stroke="green" />
            <Line dataKey="discountPercent" stroke="black" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
