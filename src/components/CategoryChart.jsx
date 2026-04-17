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
    Manufacturer[product.manufacturer] += product.stockSold * product.revenuePerUnit;
  });

  const ArrayOfManufacturer = Object.keys(Manufacturer).map((key) => ({
    name: key,
    value: Manufacturer[key],
  }));
  const TopManufacturers = ArrayOfManufacturer.sort((a, b) => b.value - a.value);
  const Top5Manufacturers = TopManufacturers.slice(0, 5);
  const OthersManufacturers = TopManufacturers.slice(5);
  const othersValue = OthersManufacturers.reduce((sum, item) => sum + item.value, 0);
  if (othersValue > 0) {
    Top5Manufacturers.push({ name: "Others", value: othersValue });
  }

  const COLORS = ["#E0B654", "#7A5A1F", "#22C55E", "#3B82F6", "#A855F7", "#94A3B8"];

  return (
    <div className="rounded-2xl border border-border bg-card p-4 md:p-5 shadow-(--shadow)">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base md:text-lg font-semibold tracking-tight text-foreground">
            Top Manufacturers
          </h3>
          <p className="text-xs text-muted mt-0.5">By revenue contribution</p>
        </div>
        <span className="hidden sm:inline-flex items-center rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-medium text-accent ring-1 ring-primary/25">
          Top 5 + Others
        </span>
      </div>

      <div className="w-full h-72 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={Top5Manufacturers}
              dataKey="value"
              outerRadius="70%"
              innerRadius="42%"
              paddingAngle={3}
              stroke="var(--card)"
              strokeWidth={2}
              label={({ name }) => name}
              labelLine={false}
            >
              {Top5Manufacturers.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `₹${value.toLocaleString()}`}
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                fontSize: 12,
                color: "var(--foreground)",
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
