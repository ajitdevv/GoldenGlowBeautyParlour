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
      setAspect(window.innerWidth >= 1024 ? 3 : 1.2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const Top10Products = [...productdata]
    .sort((a, b) => a.stockSold - b.stockSold)
    .slice(0, 10);

  return (
    <div className="rounded-2xl border border-border bg-card p-4 md:p-5 shadow-(--shadow)">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base md:text-lg font-semibold tracking-tight text-foreground">
            Revenue Trend
          </h3>
          <p className="text-xs text-muted mt-0.5">
            Stock sold vs available across top 10 products
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-medium text-accent ring-1 ring-primary/25">
          Last 30 days
        </span>
      </div>
      <div className="w-full">
        <ResponsiveContainer width="100%" aspect={aspect}>
          <LineChart data={Top10Products} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tickFormatter={(value) => value.slice(0, 6) + "..."}
              interval={"preserveStartEnd"}
              stroke="var(--muted)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis stroke="var(--muted)" fontSize={11} tickLine={false} axisLine={false} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                fontSize: 12,
                color: "var(--foreground)",
              }}
            />
            <Line
              dataKey="stockAvailable"
              stroke="var(--info)"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              dataKey="stockSold"
              stroke="var(--success)"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              dataKey="discountPercent"
              stroke="var(--primary)"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
