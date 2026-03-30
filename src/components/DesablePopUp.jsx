import React, { Children } from "react";

const DesablePopUp = ({ popup, children }) => {
  return (
    <div
      className={`z-200 fixed top-15 md:top-5 right-5 transition-all duration-500 ${
        popup ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="bg-primary text-primary-foreground px-5 py-3 rounded-xl shadow-(--shadow)">
        {children}
      </div>
    </div>
  );
};

export default DesablePopUp;
