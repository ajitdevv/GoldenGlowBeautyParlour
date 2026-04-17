import React, { useEffect, useState } from "react";
import { Getmanufacturers } from "../apis/product";
import { ContactCard } from "../components/ContactCard";
import AccountBar from "../componentpreant/AccountBar";
import HeadingSubheading from "../components/HeadingSubheading";
import { useNavigate } from "react-router-dom";
import { RetryButton } from "../components/Button";
import { ArrowDownUp } from "lucide-react";

const ContactsPage = () => {
  const [manufacturerData, setManufacturerData] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const [filterby, setfilterby] = useState("Normal");
  const navigation = useNavigate();

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      setloading(true);
      seterror(null);
      const data = await Getmanufacturers();
      setManufacturerData(data.data);
    } catch (error) {
      console.log("Error Lodaing manufacturerData", error);
      seterror("Failed to load Manufacture");
    } finally {
      setloading(false);
    }
  };

  const sortdata = [...manufacturerData].sort((a, b) => {
    switch (filterby) {
      case "Normal":
        return a.id - b.id;
      case "AtoZ":
        return a.contact.personName.localeCompare(b.contact.personName);
      case "ZtoA":
        return b.contact.personName.localeCompare(a.contact.personName);
      case "NewtoOld":
        return new Date(b.contact.contactDate) - new Date(a.contact.contactDate);
      case "OldtoNew":
        return new Date(a.contact.contactDate) - new Date(b.contact.contactDate);
      case "AccordingtoProducts":
        return b.productsCount - a.productsCount;
      default:
        return 0;
    }
  });

  const handleDetailCard = (item) => {
    navigation(`/admin/companies/details/${item.id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <AccountBar />

      <div className="flex items-end justify-between gap-3 animate-fadeUp">
        <HeadingSubheading
          h1={"Contacts"}
          h2={"Manage your contact relationships"}
        />

        <div className="relative">
          <ArrowDownUp
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          />
          <select
            value={filterby}
            onChange={(e) => setfilterby(e.target.value)}
            className="appearance-none rounded-xl border border-border bg-card-soft pl-9 pr-8 py-2 text-sm text-foreground hover:bg-card focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
          >
            <option value="Normal">Default order</option>
            <option value="AtoZ">A to Z</option>
            <option value="ZtoA">Z to A</option>
            <option value="NewtoOld">Newest first</option>
            <option value="OldtoNew">Oldest first</option>
            <option value="AccordingtoProducts">By products</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeUp">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-56 rounded-2xl border border-border bg-card-soft shimmer"
            />
          ))}

        {!loading && error && (
          <div className="col-span-full rounded-2xl border border-danger/30 bg-danger/10 p-6 text-center">
            <p className="text-danger font-medium">{error}</p>
            <div className="mt-3 flex justify-center">
              <RetryButton onClick={FetchData}>Retry</RetryButton>
            </div>
          </div>
        )}

        {!loading && !error && sortdata.length === 0 && (
          <div className="col-span-full text-center text-muted text-sm">
            No contacts match the {filterby} filter.
          </div>
        )}

        {!loading &&
          !error &&
          sortdata.length > 0 &&
          sortdata.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer"
              onClick={() => handleDetailCard(item)}
            >
              <ContactCard
                position={item.contact.position}
                Company={item.name}
                Name={item.contact.personName}
                Gmail={item.contact.email}
                contactDate={item.contact.contactDate}
                phoneNo={item.contact.phone}
                since={item.contact.since}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ContactsPage;
