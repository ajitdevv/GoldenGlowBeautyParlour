import React from "react";
import SearchFunclity from "../components/SearchFunclity";
import Account from "../components/Account";

const AccountBar = () => {
  return (
    <div className="sticky top-0 z-20 -mx-3 sm:-mx-5 lg:-mx-8 mb-2 flex items-center justify-between gap-3 border-b border-border bg-background/80 backdrop-blur-xl px-3 sm:px-5 lg:px-8 py-3">
      <SearchFunclity />
      <Account />
    </div>
  );
};

export default React.memo(AccountBar);
