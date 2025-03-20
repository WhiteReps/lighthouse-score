"use client";
import Link from "next/link";
import { useData } from "../service/Provider";
import IconRenderer from "../utils/IconRenderer";
import React from "react";

const ContactOut = () => {
  const sectionData = useData();
  return (
    <div className="flex flex-col gap-1 fixed bottom-5 left-2">
      {sectionData?.conLeftIcon?.map((elem) => {
        return (
          <Link
            href={elem.icon_link}
            target="_blank"
            key={elem.cil_id}
            aria-label={`Link to ${elem.icon_name}`}
          >
            <span
              className="shadow-xl text-white text-3xl cursor-pointer w-[50px] h-[50px] p-[10px] flex items-center justify-center rounded-lg"
              style={{
                backgroundColor: elem.bg_color,
              }}
            >
              <IconRenderer
                iconName={elem.icon_name}
                size={30}
              />
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default ContactOut;
