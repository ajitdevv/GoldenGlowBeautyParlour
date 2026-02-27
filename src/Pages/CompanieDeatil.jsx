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
        let data = await Getmanufacturers();
        setmanufacturers(data);
      } catch (error) {
        console.log("Data not found", error);
        seterror("data not found plz try again");
      } finally {
        setloader(false);
      }
    };
    FatchData();
  }, []);

  const manufacturer = manufacturers.find((item) => item.id === Number(id));
  console.log(manufacturer);
  const getInitials = (manufacturer) => {
    return manufacturer.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex bg-[url('/Greadientdeatile.jpg')] bg-cover  w-full h-full justify-center items-center p-10 ">
      {manufacturer ? (
        <div
          className="w-full max-w-3xl rounded-3xl p-8 backdrop-blur-md transition-all duration-300 hover:backdrop-blur-xs border border-muted"
          style={{
            background: "rgba(255,255,255,0.1)",
            boxShadow: "var(--shadow)",
          }}
        >
          {/* 🔹 Header */}
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
              <button className="px-4 py-2 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition">
                Delete
              </button>
            </div>
          </div>

          {/* 🔹 Stats */}
          <div className="flex gap-4 mb-8">
            <div className="px-4 py-2 rounded-full bg-[var(--card-soft)] text-sm">
              Products:{" "}
              <span className="font-semibold">
                {manufacturer.productsCount}
              </span>
            </div>

            <div className="px-4 py-2 rounded-full bg-[var(--card-soft)] text-sm">
              Since:{" "}
              <span className="font-semibold">
                {manufacturer.contact.since.split("-")[0]}
              </span>
            </div>
          </div>

          <div className="border-t border-[var(--border)] mb-6"></div>

          {/* 🔹 Contact Section */}
          <div className="flex gap-6 items-center">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-[var(--card-soft)] flex items-center justify-center text-2xl font-bold text-[var(--accent)] shadow-md">
              {getInitials(manufacturer.contact.personName)}
            </div>

            {/* Contact Info */}
            <div className="flex-1 space-y-2">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">
                {manufacturer.contact.personName}
              </h2>
              <p className="text-[var(--muted)]">
                {manufacturer.contact.position}
              </p>

              <div className="pt-2 space-y-1 text-sm text-[var(--foreground)]">
                <p>📅 Contacted: {manufacturer.contact.contactDate}</p>
                <p>📧 {manufacturer.contact.email}</p>
                <p>📞 {manufacturer.contact.phone}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--border)] my-6"></div>

          {/* Footer Info */}
          <div className="flex justify-between text-sm text-[var(--muted)]">
            <div>Relationship Since: {manufacturer.contact.since}</div>
            <div>ID: #{manufacturer.id}</div>
          </div>
        </div>
      ) : (
        "not founded"
      )}
    </div>
  );
};

export default CompaniesDetails;
