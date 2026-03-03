import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Getmanufacturers } from "../apis/product";

const CompaniesDetails = () => {
  let [manufacturers, setmanufacturers] = useState([]);
  let [error, seterror] = useState(null);
  let [loader, setloader] = useState(true);
  let { id } = useParams();
  useEffect(() => {
    const FatchData = async () => {
      setloader(true);
      try {
        seterror(null);
        let data = await Getmanufacturers(id);
        setmanufacturers(data);
      } catch (error) {
        console.log("Data not found", error);
        seterror("data not found plz try again");
      } finally {
        setloader(false);
      }
    };
    FatchData();
  }, [id]);

  const manufacturer = manufacturers.find((item) => item.id === Number(id));
  const getInitials = (manufacturer) => {
    return manufacturer.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex bg-[url('/Greadientdeatile.jpg')] bg-cover  w-full h-full justify-center items-center p-10 ">
      {loader && (
        <div
          className="w-full h-full max-w-3xl rounded-3xl  p-8 
    bg-white/10 backdrop-blur-xl border border-white/20 
    animate-pulse"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-4 w-1/2">
              <div className="h-9 w-40 bg-white/30 rounded-lg"></div>
              <div className="h-4 w-32 bg-white/20 rounded"></div>
              <div className="flex gap-4 mt-4">
                <div className="h-8 w-25 bg-white/20 rounded-full"></div>
                <div className="h-8 w-25 bg-white/20 rounded-full"></div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-15 bg-white/20 rounded-xl"></div>
              <div className="h-10 w-18 bg-yellow-300/40 rounded-xl"></div>
            </div>
          </div>
          <div className="my-8 h-px bg-white/20"></div>
          <div className="flex gap-10 items-center">
            <div className="size-25 bg-white/20 rounded-full"></div>
            <div className="space-y-4 w-1/2">
              <div className="h-8 w-48 bg-white/30 rounded"></div>
              <div className="h-6 w-32 bg-white/20 rounded"></div>

              <div className="space-y-3 mt-4">
                <div className="h-5 w-60 bg-white/20 rounded"></div>
                <div className="h-5 w-72 bg-white/20 rounded"></div>
                <div className="h-5 w-44 bg-white/20 rounded"></div>
              </div>
            </div>
          </div>
          <div className="my-2 h-px bg-white/20"></div>
          <div className="flex justify-between">
            <div className="h-5 w-52 bg-white/20 rounded"></div>
            <div className="h-5 w-16 bg-white/20 rounded"></div>
          </div>
        </div>
      )}
      {!loader && error&&<div className="w-full h-full">
        <h1 className="text-2xl text-foreground">{error}</h1>
        </div>}
      {!loader&& !error&& manufacturer &&(
        <div
          className="w-full max-w-3xl rounded-3xl p-8 backdrop-blur-md transition-all duration-300 hover:backdrop-blur-xs border border-muted"
          style={{
            background: "rgba(255,255,255,0.1)",
            boxShadow: "var(--shadow)",
          }}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-foreground">
                {manufacturer.name}
              </h1>
              <p className="text-muted mt-1">
                {manufacturer.category} • {manufacturer.country}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-xl border border-border text-foreground) hover:bg-card-soft transition">
                Edit
              </button>
              <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-80 transition">
                Delete
              </button>
            </div>
          </div>
          <div className="flex gap-4 mb-8">
            <div className="px-4 py-2 rounded-full bg-card text-sm">
              Products:
              <span className="font-semibold"> {manufacturer.productsCount}</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-card text-sm">
              Since:
              <span className="font-semibold "> {manufacturer.contact.since.split("-")[0]}
              </span>
            </div>
          </div>
          <div className="border-t border-(--border) mb-6"></div>
          <div className="flex gap-6 items-center">
            <div className="w-24 h-24 rounded-full bg-card flex items-center justify-center text-2xl font-bold text-[var(--accent)] shadow-md">
              {getInitials(manufacturer?.contact?.personName)}
            </div>
            {/* Contact Info */}
            <div className="flex-1 space-y-2">
              <h2 className="text-xl font-semibold text-foreground">
                {manufacturer?.contact?.personName}
              </h2>
              <p className="text-foreground">{manufacturer.contact.position}</p>

              <div className="pt-2 space-y-1 text-sm text-foreground">
                <p>📅 Contacted: {manufacturer.contact.contactDate}</p>
                <p>📧 {manufacturer.contact.email}</p>
                <p>📞 {manufacturer.contact.phone}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-border my-6"></div>
          <div className="flex justify-between text-sm text-foreground">
            <div>Relationship Since: {manufacturer.contact.since}</div>
            <div>ID: #{manufacturer.id}</div>
          </div>
        </div>
      ) }
    </div>
  );
};

export default CompaniesDetails;
