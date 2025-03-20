import React from "react";
import IconRenderer from "../utils/IconRenderer";

const GroupCard = ({ icon, text, desc }) => {
  return (
    <>
      <div className="flex items-center gap-8 lg:pl-10">
        <div className="bg-black text-white rounded-lg p-2 text-3xl">
          <IconRenderer iconName={icon} size={30} />
        </div>
        <div>
          <h3 className="font-bold text-sm ">{text}</h3>
          <p className="text-sm mt-2 font-light mb-0">{desc}</p>
        </div>
      </div>
    </>
  );
};

export default GroupCard;
