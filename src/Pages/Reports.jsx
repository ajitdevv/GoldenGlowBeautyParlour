import React, { useEffect, useState } from "react";
import { GetReports } from "../apis/product";
import AccountBar from "../componentpreant/AccountBar";
import HeadingSubheading from "../components/HeadingSubheading";

const Reports = () => {
  let [reportsData, setReportsData] = useState([]);
  let [loader, setLoader] = useState(true);
  let [error, setError] = useState(null);
  useEffect(() => {
    const FatchReports = async () => {
      try {
        setLoader(true);
        setError(null);
        const data = await GetReports();
        setReportsData(data.data);
      } catch (error) {
        console.log("Error Fetch Report", error);
        setError("Reports Not Found");
      } finally {
        setLoader(false);
      }
    };
    FatchReports();
  }, []);
  console.log(reportsData);

  return (
    <div className="">
      <div>
        <AccountBar />
      </div>
      <div>
        <HeadingSubheading
          h1={"Reports"}
          h2={"Browse and manage available reports"}
        />
      </div>
      <div>
        <select name="type" >
          <option value="abuse">Abuse</option>
          <option value="bug">Bug</option>
          <option value="payment">Payment</option>
          <option value="other">Other</option>
        </select>
        <select name="status" >
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
        </select>
      </div>
      {loader && <div className="bg-amber-300 text-black">loding...</div>}
      {!loader && error && (
        <div className=" text-red-500 text-2xl">{error}</div>
      )}
      {!loader && !error && reportsData.length === 0 && (
        <div>
          <div>No reports found. Try adjusting filters or create a new one</div>
        </div>
      )}
      {!loader && !error && reportsData.length > 0 && (
        <div>now data his avalible</div>
      )}
    </div>
  );
};

export default Reports;
