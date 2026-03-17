import React, { useEffect, useState } from "react";

const AdminInfo = () => {
  let [user, setUser] = useState([]);
  useEffect(() => {
    const data = localStorage.getItem("userData");
    const userData=JSON.parse(data)
    setUser(userData);
  }, []);

  return (
     <div className="max-w-sm mx-auto mt-10 p-6 rounded-xl border shadow-sm bg-white">
      
     {user? (
        <div>
            <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
         {user?.fullName?.charAt(0).toUpperCase()}
        </div>

        <h2 className="text-lg font-semibold">{user.fullName}</h2>
        <p className="text-sm text-gray-500">{user.jobTitle}</p>
      </div>

      <div className="my-4 border-t"></div>

      <div className="space-y-2 text-sm text-gray-700">
        <p><span className="font-medium">📧 Email:</span> {user.email}</p>
        <p><span className="font-medium">📍 Location:</span> {user.location}</p>
        <p><span className="font-medium">📞 Number:</span> {user.number}</p>
      </div>
      </div>
      ):"null"}

    </div>
  );
};

export default AdminInfo;
