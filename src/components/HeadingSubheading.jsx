import React from "react";

const HeadingSubheading = ({ h1, h2 }) => {
  return (
    <div className="flex flex-col gap-1 w-full items-start">
      <h1 className="text-xl md:text-3xl font-semibold tracking-tight text-foreground capitalize">
        {h1}
      </h1>
      <h2 className="text-xs md:text-sm text-muted">{h2}</h2>
    </div>
  );
};

export default React.memo(HeadingSubheading);
