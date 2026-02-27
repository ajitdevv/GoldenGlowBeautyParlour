export const HomeCard = ({ title, value, logo }) => {
  return (
    <div className="bg-background flex flex-col text-foreground border border-foreground shadow-(--shadow) p-4 rounded-lg justify-around ">
      <div className="flex justify-center items-center gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {logo}
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};
