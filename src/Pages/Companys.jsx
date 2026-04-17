import React, { useEffect, useState } from "react";
import { Getmanufacturers } from "../apis/product";
import AccountBar from "../componentpreant/AccountBar";
import HeadingSubheading from "../components/HeadingSubheading";
import CompanyCard from "../components/CompanyCard";
import { useNavigate } from "react-router-dom";
import { AddButton, RetryButton } from "../components/Button";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

const CompaniesPage = () => {
  const [companies, setcompanys] = useState([]);
  const [loader, setloader] = useState(true);
  const [error, setError] = useState(null);
  const Navgation = useNavigate();

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      setloader(true);
      setError(null);
      const data = await Getmanufacturers();
      setcompanys(data.data);
    } catch (error) {
      console.log("Error loading companies", error);
      setError("Failed to load companies");
    } finally {
      setloader(false);
    }
  };

  const companiesDeatilePage = (item) => {
    Navgation(`/admin/companies/details/${item.id}`);
  };

  const AddCompanie = () => {
    toast("⚠️ Add New Companie is temporarily disabled");
  };

  return (
    <div className="flex flex-col gap-6">
      <AccountBar />

      <div className="flex items-end justify-between gap-3 animate-fadeUp">
        <HeadingSubheading
          h1={"Companies"}
          h2={"Manage your company relationships"}
        />
        <AddButton onClick={AddCompanie}>
          <Plus size={16} /> Add Company
        </AddButton>
      </div>

      <div className="rounded-3xl border border-border bg-card-soft/50 p-3 sm:p-5 animate-fadeUp">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loader &&
            Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-52 rounded-2xl border border-border bg-card-soft shimmer"
              />
            ))}

          {!loader && error && (
            <div className="col-span-full rounded-2xl border border-danger/30 bg-danger/10 p-6 text-center">
              <p className="text-danger font-medium">{error}</p>
              <div className="mt-3 flex justify-center">
                <RetryButton onClick={FetchData}>Retry</RetryButton>
              </div>
            </div>
          )}

          {!loader &&
            !error &&
            companies.length > 0 &&
            companies.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer"
                onClick={() => companiesDeatilePage(item)}
              >
                <CompanyCard
                  Name={item.name}
                  Category={item.category}
                  Location={item.country}
                  ProductsCount={item.productsCount}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;
