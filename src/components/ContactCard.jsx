import { Mail, Phone, Building2, Calendar } from "lucide-react";

export const ContactCard = ({
  position,
  Company,
  Name,
  Gmail,
  contactDate,
  phoneNo,
  since,
}) => {
  return (
    <div
      className="bg-background 
                    border border-foreground
                    shadow-md hover:shadow-(--shadow)
                    transition-all duration-300
                    rounded-2xl 
                    p-5 w-65"
    >
      <h1 className="text-lg font-semibold text-foreground">{Name}</h1>
      <p className="text-sm text-muted mt-1">
        {position} at{" "}
        <span className="font-medium text-foreground">{Company}</span>
      </p>
      <div className="flex items-center gap-2 mt-3 text-sm text-mute">
        <Mail size={14} className="text-sky-600"/>
        <span className="truncate">{Gmail}</span>
      </div>
      <div className="flex items-center gap-2 mt-2 text-sm text-mute">
        <Phone className="text-red-500" size={14} />
        <span>{phoneNo}</span>
      </div>
      <div className="flex items-center gap-2 mt-3 text-xs text-muted">
        <Calendar size={14} />
        <span>In contact since {contactDate}</span>
      </div>
      <div className="flex items-center gap-2 mt-1 text-xs text-muted">
        <Building2 size={14} />
        <span>In company since {since}</span>
      </div>
    </div>
  );
};
