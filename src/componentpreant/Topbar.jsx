import { HdmiPortIcon } from "lucide-react";
import React from "react";

const Topbar = ({ manuopen, setManuopen }) => {
  return (
    <div className="bg-background sticky top-0 right-0 md:-top-40 md:fixed w-full text-4xl">
      <HdmiPortIcon
        className="ml-5"
        onClick={() => {
          console.log("Topbar click:", manuopen);
          setManuopen((prev) => !prev);
        }}
        size={30}
      />
    </div>
  );
};

export default Topbar;
