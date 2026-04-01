import React from "react";

const HeadingSubheading = ({h1,h2}) => {
  return (
    <div className="flex flex-col gap-1 md:gap-2.75 w-full items-start">
      <h1 className="font-bold text-base md:text-2xl">{h1}</h1>
      <h2 className="text-xs whitespace-nowrap md:text-xl">{h2}</h2>
    </div>
  );
};

export default React.memo(HeadingSubheading);
