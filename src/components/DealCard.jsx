import { User2Icon } from "lucide-react";

const DealCard = ({ deal, getStatusColor }) => {
  return (
<>     <h2 className="text-md font-bold flex justify-start">{deal.title}</h2>

      <div className="flex w-full justify-between items-center">
        <p className="text-muted text-sm gap-1 flex items-center">
          <User2Icon size={15}/>
          {deal.companyName}
        </p>

        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
          {deal.stage}
        </span>
      </div>

      <hr className="border w-full border-muted" />

      <div className="flex justify-between w-full">
        <p className="text-muted text-sm">Deal Value</p>
        <h3 className="text-xl font-semibold">₹{deal.value}</h3>
      </div>

      <hr className="border w-full border-muted" />

      <div className="flex justify-between w-full">
        <div className="mt-2 text-sm text-muted">
          Probability: {deal.probability}%
        </div>

        <span
          className={`flex items-center px-2 text-xs py-0 rounded ${getStatusColor(
            deal.status,
          )}`}
        >
          {deal.status}
        </span>
      </div>

      <div className="mt-2 text-xs text-gray-400">
        Close Date: {deal.expectedCloseDate}
      </div>
    </> 
  );
};

export default DealCard;
