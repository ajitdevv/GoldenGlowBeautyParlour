import {
  GithubIcon,
  HomeIcon,
  InstagramIcon,
  Linkedin,
  LogOutIcon,
  LucidePencilLine,
  MapPinHouse,
  Phone,
  ReceiptTextIcon,
  SettingsIcon,
  YoutubeIcon,
  Sparkles,
} from "lucide-react";
import weblogo from "../assets/logoAj.png";
import Themetoggle from "../components/Themetoggle";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ manuopen, setManuopen }) => {
  const navigate = useNavigate();

  const ManuItems = [
    { id: "1", logo: <HomeIcon size={18} />, name: "Home", path: "/admin/dashboard" },
    { id: "2", logo: <Phone size={18} />, name: "Contact", path: "/admin/contact" },
    { id: "3", logo: <MapPinHouse size={18} />, name: "Companys", path: "/admin/companys" },
    { id: "4", logo: <LucidePencilLine size={18} />, name: "Deals", path: "/admin/deals" },
    { id: "5", logo: <ReceiptTextIcon size={18} />, name: "Reports", path: "/admin/reports" },
    { id: "6", logo: <SettingsIcon size={18} />, name: "Setting", path: "/admin/setting" },
  ];

  const SocialMedia = [
    { id: "1", logo: <InstagramIcon size={16} /> },
    { id: "2", logo: <YoutubeIcon size={16} /> },
    { id: "3", logo: <Linkedin size={16} /> },
    { id: "4", logo: <GithubIcon size={16} /> },
  ];

  return (
    <aside
      className={`
        fixed top-0 z-50 flex h-screen w-64 shrink-0 flex-col bg-card-soft/95 backdrop-blur-xl
        border-r border-border px-4 py-5 overflow-y-auto no-scrollbar
        transition-[left] duration-300 ease-out
        ${manuopen ? "left-0" : "-left-72"}
        md:sticky md:top-0 md:left-0 md:z-30 md:h-screen md:transition-none
      `}
      onClick={() => {
        if (window.innerWidth < 768) setManuopen(false);
      }}
    >
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-primary/15 ring-1 ring-primary/30 flex items-center justify-center overflow-hidden">
            <img src={weblogo} alt="logo" className="size-7 object-contain" />
          </div>
          <div className="leading-tight">
            <h1 className="text-foreground text-base font-semibold tracking-tight">DashBoard</h1>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted">Golden Glow</p>
          </div>
        </div>
        <Themetoggle />
      </div>

      <div className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success ring-1 ring-success/20">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60"></span>
          <span className="relative inline-flex size-1.5 rounded-full bg-success"></span>
        </span>
        Available for work
      </div>

      <p className="mt-6 mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
        Workspace
      </p>

      <nav className="flex-1">
        <ul className="space-y-1">
          {ManuItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-(--shadow)"
                      : "text-muted hover:text-foreground hover:bg-card"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex size-7 items-center justify-center rounded-lg transition
                      ${isActive ? "bg-black/10 text-primary-foreground" : "bg-card text-muted group-hover:text-foreground"}`}
                    >
                      {item.logo}
                    </span>
                    <span>{item.name}</span>
                    {isActive && (
                      <Sparkles size={14} className="ml-auto opacity-70" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-4 pt-4 border-t border-border space-y-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted hover:text-danger hover:bg-danger/10 transition cursor-pointer"
        >
          <LogOutIcon size={16} /> Logout
        </button>

        <div className="flex items-center justify-center gap-3 pt-1">
          {SocialMedia.map((item) => (
            <button
              key={item.id}
              className="size-8 rounded-lg bg-card text-muted hover:text-foreground hover:bg-primary/20 flex items-center justify-center transition"
            >
              {item.logo}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
