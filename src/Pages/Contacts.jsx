import React, { useEffect, useState } from "react";
import { Getmanufacturers } from "../apis/product";
import { ContactCard } from "../components/ContactCard";
import AccountBar from "../componentpreant/AccountBar";
import HeadingSubheading from "../components/HeadingSubheading";
import { useNavigate } from "react-router-dom";

const ContactsPage = () => {
  let [Manufacturedata, setManufacturedata] = useState([]);
  let [loading, setloading] = useState(true);
  let [error, seterror] = useState(null);
  let [filterby, setfilterby] = useState("Normal");

  const navgation = useNavigate();
  useEffect(() => {
    const FetchData = async () => {
      try {
        setloading(true);
        seterror(null);
        const data = await Getmanufacturers();
        setManufacturedata(data.data);
      } catch (error) {
        console.log("Error Lodaing Manufacturedata", error);
        seterror("Failed to load Manufacture");
      } finally {
        setloading(false);
      }
    };

    FetchData();
  }, []);

  const sortdata = [...Manufacturedata].sort((a, b) => {
    switch (filterby) {
      case "Normal":
        return a.id - b.id;
      case "AtoZ":
        return a.contact.personName.localeCompare(b.contact.personName);
      case "ZtoA":
        return b.contact.personName.localeCompare(a.contact.personName);
      case "NewtoOld":
        return (
          new Date(b.contact.contactDate) - new Date(a.contact.contactDate)
        );
      case "OldtoNew":
        return (
          new Date(a.contact.contactDate) - new Date(b.contact.contactDate)
        );
      case "AccordingtoProducts":
        return b.productsCount - a.productsCount;

      default:
        break;
    }
  });
  const handeldatilecard = (item) => {
    navgation(`/admin/companies/details/${item.id}`);
  };
  console.log(sortdata);

  return (
    <div className="flex-col gap-6 py-3 h-full flex w-full">
      <div className="w-full">
        <AccountBar />
      </div>
      <div className="flex justify-between w-full pr-5">
        <div className="pr-3">
          <HeadingSubheading
            h1={"Contacts"}
            h2={"Contact Manage your contact relationshipss"}
          />
        </div>
        <div className="relative w-fit">
          <select
            onChange={(e) => setfilterby(e.target.value)}
            className="w-full 
               appearance-none 
               bg-card-soft
               border border-card
               text-sm text-muted
               rounded-xl
               px-4 py-2 z-90
               shadow-sm
               focus:outline-none 
               focus:ring-2 
               focus:ring-primary
               cursor-pointer"
          >
            <option value="Normal">Normal</option>
            <option value="AtoZ">A to Z</option>
            <option value="ZtoA">Z to A</option>
            <option value="NewtoOld">New To Old</option>
            <option value="OldtoNew">Old To New</option>
            <option value="AccordingtoProducts">According To Products</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md border p-5 animate-pulse"
            >
              <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto mb-6"></div>

              <div className="space-y-3">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-3/6"></div>
                <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        {!loading && error && (
          <div className="col-span-full text-center text-red-400">{error}</div>
        )}
        {!loading &&
          !error &&
          sortdata.length > 0 &&
          sortdata.map((item) => {
            return (
              <div
                key={item.id}
                className="cursor-pointer"
                onClick={() => handeldatilecard(item)}
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
            );
          })}
      </div>
    </div>
  );
};

export default ContactsPage;

