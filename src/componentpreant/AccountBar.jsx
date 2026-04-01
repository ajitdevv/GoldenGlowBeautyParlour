import React from "react";
import SearchFunclity from "../components/SearchFunclity";
import Account from "../components/Account";

const AccountBar = () => {
  return (
    <div className="flex justify-between items-center z-100">
      <SearchFunclity />
      <Account />
    </div>
  );
};

export default React.memo(AccountBar);
