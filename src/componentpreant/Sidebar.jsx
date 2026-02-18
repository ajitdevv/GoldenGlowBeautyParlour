import {
  HomeIcon,
  LogOutIcon,
  LucidePencilLine,
  MapPinHouse,
  Phone,
  ReceiptTextIcon,
  SettingsIcon,
} from "lucide-react";
import logo from "../assets/logoAj.png";
import Themetoggle from "../components/Themetoggle";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const Sidebar = () => {
  let [selectedItem, setSelectedItem] = useState("Companys");
  let navigate = useNavigate();
  const ManuItems = [
    {
      id: "1",
      logo: <HomeIcon size={17} />,
      name: "Home",
      path: "/admin/dashboard",
    },
    { id: "2", logo: <Phone size={17} />, name: "Contact", path: "/contact" },
    {
      id: "3",
      logo: <MapPinHouse size={17} />,
      name: "Companys",
      path: "/companys",
    },
    {
      id: "4",
      logo: <LucidePencilLine size={17} />,
      name: "Deals",
      path: "/deals",
    },
    {
      id: "5",
      logo: <ReceiptTextIcon size={17} />,
      name: "Reports",
      path: "/reports",
    },
    {
      id: "6",
      logo: <SettingsIcon size={17} />,
      name: "Settings",
      path: "/settings",
    },
  ];
  
  return (
    <div className="w-full flex flex-col  items-center bg-card-soft h-screen p-4 ">
      <div className="flex gap-3 justify-start items-center mt-7">
        <div className="size-9 ">
          <img src={logo} alt={logo} />
        </div>
        <div>
          <h1 className="text-foreground text-2xl font-bold">DashBoard</h1>
        </div>
      </div>

      <div className="flex w-full justify-end ">
        <Themetoggle />
      </div>
      <div className="w-full flex items-start mt-3">
        <div className="w-fit bg-green-100 font-bold text-xs text-green-400 px-2 py-1 rounded-full flex gap-1">
          <div className="relative flex items-center justify-center ">
            <div className="w-1 h-1 bg-green-500 rounded-full z-3"></div>

            <div className="absolute w-1.25 h-1.25 bg-green-400 rounded-full animate-ping opacity-75 z-1"></div>
            <div className="absolute w-1.5 h-1.5 bg-green-300 rounded-full animate-ping opacity-50 z-2"></div>
          </div>
          <div>
            <h1 className="text-xs">Available for work</h1>
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <ul className="space-y-7">
          {ManuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `w-full text-left text-sm font-medium transition-colors ${
                    isActive
                      ? "text-foreground "
                      : "text-muted hover:text-foreground"
                  }`
                }
              >
                <div className="flex gap-2 items-center hover:translate-x-8 transition-transform duration-500 hover:scale-110">
                  <div>{item.logo}</div>
                  <h1 className="text-sm">{item.name}</h1>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <hr className="border w-full border-muted my-4" />
      <div className="flex justify-start w-full">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className=" transition-colors flex items-center gap-1 text-sm font-medium text-muted cursor-pointer hover:text-red-500"
        >
         <LogOutIcon size={17}/> Logout
        </button>
      </div>
      <div>

      </div>
    </div>
  );
};

export default Sidebar;
