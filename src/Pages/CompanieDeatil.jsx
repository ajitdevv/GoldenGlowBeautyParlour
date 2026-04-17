import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Getmanufacturers } from "../apis/product";
import { deleteProduct } from "../apis/deletedata";
import { RetryButton } from "../components/Button";
import AccountBar from "../componentpreant/AccountBar";
import HeadingSubheading from "../components/HeadingSubheading";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Calendar,
  Mail,
  MapPin,
  Phone,
  Tag,
  BoxesIcon,
  Pencil,
  Trash2,
} from "lucide-react";

const CompaniesDetails = () => {
  const [manufacturers, setmanufacturers] = useState([]);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(true);
  const { id } = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    FetchData();
  }, [id]);

  const FetchData = async () => {
    setloading(true);
    try {
      seterror(null);
      const data = await Getmanufacturers(id);
      setmanufacturers(data.data);
    } catch (error) {
      console.log("Data not found", error);
      seterror("data not found plz try again");
    } finally {
      setloading(false);
    }
  };

  const manufacturer = manufacturers.find((item) => item.id === Number(id));

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  const handleDelete = async (id) => {
    try {
      await toast.promise(deleteProduct(id), {
        loading: "Deleting...",
        success: "Deleted successfully",
        error: "Delete failed",
      });
      navigation("/admin/companys");
    } catch {}
  };

  const handleEdit = () => toast.error("Editing is temporarily disabled.");

  return (
    <div className="flex flex-col gap-6">
      <AccountBar />

      <div className="flex items-center justify-between gap-3 animate-fadeUp">
        <HeadingSubheading
          h1={"Company Details"}
          h2={"View and manage this company information"}
        />
        <button
          onClick={() => navigation(-1)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-card-soft px-3 py-1.5 text-sm text-muted hover:text-foreground hover:bg-card transition cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      {loading && (
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 shadow-(--shadow)">
          <div className="h-72 rounded-2xl bg-card-soft shimmer" />
        </div>
      )}

      {!loading && error && (
        <div className="mx-auto max-w-md rounded-2xl border border-danger/30 bg-danger/10 p-6 text-center">
          <p className="text-danger font-medium">{error}</p>
          <div className="mt-3 flex justify-center">
            <RetryButton onClick={FetchData}>Retry</RetryButton>
          </div>
        </div>
      )}

      {!loading && !error && !manufacturer && (
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-foreground font-medium">
            Unable to load company details.
          </p>
          <div className="mt-3 flex justify-center">
            <RetryButton onClick={FetchData}>Retry</RetryButton>
          </div>
        </div>
      )}

      {!loading && !error && manufacturer && (
        <div className="mx-auto max-w-4xl animate-fadeUp">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-(--shadow)">
            <div className="relative h-32 bg-linear-to-br from-primary via-accent-soft to-accent">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
            </div>

            <div className="relative px-6 md:px-8 pb-8">
              <div className="-mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div className="flex items-end gap-4">
                  <div className="size-24 rounded-2xl bg-card border-4 border-card flex items-center justify-center text-2xl font-bold text-accent shadow-(--shadow)">
                    {getInitials(manufacturer.name)}
                  </div>
                  <div className="pb-1">
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                      {manufacturer.name}
                    </h1>
                    <p className="mt-1 text-sm text-muted">
                      {manufacturer.category} · {manufacturer.country}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleEdit}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card-soft px-4 py-2 text-sm font-medium text-foreground hover:bg-card transition cursor-pointer"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(manufacturer.id)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-danger text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition cursor-pointer"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-accent ring-1 ring-primary/25">
                  <BoxesIcon size={12} /> {manufacturer.productsCount} products
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-card-soft px-3 py-1 text-xs font-medium text-muted">
                  <Calendar size={12} /> Since {manufacturer.contact.since.split("-")[0]}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-card-soft px-3 py-1 text-xs font-medium text-muted">
                  <Tag size={12} /> #{manufacturer.id}
                </span>
              </div>

              <div className="my-6 h-px bg-border" />

              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">
                Primary contact
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 rounded-2xl border border-border bg-card-soft p-5 flex flex-col items-center text-center">
                  <div className="size-20 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                    {getInitials(manufacturer?.contact?.personName)}
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-foreground">
                    {manufacturer?.contact?.personName}
                  </h3>
                  <p className="text-xs text-muted">{manufacturer?.contact?.position}</p>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 gap-3">
                  <InfoRow
                    icon={<Mail size={14} className="text-info" />}
                    label="Email"
                    value={manufacturer?.contact?.email}
                  />
                  <InfoRow
                    icon={<Phone size={14} className="text-danger" />}
                    label="Phone"
                    value={manufacturer?.contact?.phone}
                  />
                  <InfoRow
                    icon={<MapPin size={14} className="text-accent" />}
                    label="Country"
                    value={manufacturer?.country}
                  />
                  <InfoRow
                    icon={<Calendar size={14} className="text-success" />}
                    label="First contacted"
                    value={manufacturer?.contact?.contactDate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3">
    <div className="flex items-center gap-2 text-muted text-xs">
      <span className="flex size-7 items-center justify-center rounded-md bg-card-soft">
        {icon}
      </span>
      {label}
    </div>
    <span className="text-sm font-medium text-foreground truncate">{value}</span>
  </div>
);

export default CompaniesDetails;
