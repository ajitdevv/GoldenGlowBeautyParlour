import { PlaneLandingIcon, BoxesIcon } from "lucide-react";

const CompanyCard = ({ Name, Category, Location, ProductsCount }) => {
  return (
    <div
      className="
        bg-white/5
        backdrop-blur-xl
       hover:backdrop-blur-xs
        border border-white/20
        rounded-2xl
        p-6
        text-muted
        shadow-2xl
        hover:shadow-blue-500/40
        hover:border-blue-400
        hover:scale-105
        transition-all
        duration-300
      "
    >
      <h2 className="text-2xl font-bold text-blue-400 mb-3">
        {Name}
      </h2>

      <p className="flex items-center gap-2 text-card">
        <PlaneLandingIcon size={16} className="text-blue-400" />
        {Location}
      </p>

      <p className="text-card flex w-full mt-2 whitespace-nowrap">
        Category: {Category}
      </p>

      <p className="flex items-center gap-2 text-card mt-1">
        <BoxesIcon size={16} className="text-blue-400" />
        {ProductsCount} Products
      </p>
    </div>
  );
};

export default CompanyCard;