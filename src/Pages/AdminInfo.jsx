import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminInfo = () => {
  let [user, setUser] = useState([]);
  let Navgation=useNavigate()
  useEffect(() => {
    const data = localStorage.getItem("userData");
    const userData = JSON.parse(data);
    setUser(userData);
  }, []);
const handleNavigate=()=>{
  Navgation("/admin/setting")
}

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 rounded-xl border-border border shadow-sm bg-card">
      {user ? (
        <div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-card-soft text-foreground flex items-center justify-center text-xl font-bold">
              {user?.fullName?.charAt(0).toUpperCase()}
            </div>

            <h2 className="text-lg font-semibold">{user.fullName}</h2>
            <p className="text-sm text-muted/80">{user?.jobTitle||"No job title added"}</p>
          </div>

          <div className="my-4 border-t"></div>

          <div className="space-y-2 text-sm text-muted">
            <p>
              <span className="font-medium">📧 Email:</span> {user?.email || "Email not added"}
            </p>
            <p>
              <span className="font-medium">📍 Location:</span> {user?.location ||"Location not added"}
            </p>
            <p>
              <span className="font-medium">📞 Number:</span> {user?.number||"Number not added"}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-1 md:gap-2">
            <h1 className="text-xl font-semibold text-foreground">Your profile is incomplete</h1>
            <h2 className="font-normal">Add your details to get the best experience</h2>
          </div>
          <div>
            <button className="p-3 bg-primary/60 -mb-2 hover:bg-primary hover:scale-105 cursor-pointer font-bold mt-4 rounded-xl transition-all duration-300" onClick={()=>handleNavigate()}>Complete Profile</button>
          </div>
        </div>
      )}
    
    </div>
  );
};

export default AdminInfo;
