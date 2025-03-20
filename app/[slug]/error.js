"use client";

import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useData } from "../service/Provider";import IconRenderer from "../utils/IconRenderer";


const Header = dynamic(() => import("../components/Header"));

const Error = () => {
  const data = useData();
  const renderText = (text) => {
    if (!text) return null;
    return text.split(/(<br\s*\/?>)/).map((line, index) => {
      // If the line is a <br> tag, return a <br> element
      if (line.match(/<br\s*\/?>/)) {
        return <br key={index} />;
      }
      return <span key={index}>{line}</span>;
    });
  };

  return (
    <>
      <Header />
      <div className="text-center flex items-center justify-center h-screen">
        <div>
          <p className="text-3xl font-bold text-[#707070]">
            {renderText(data?.loading_error?.[0]?.title_text)}
          </p>
          <p className="text-2xl">
            {renderText(data?.loading_error?.[0]?.text_desc)}
          </p>
          <Image
            src={`${process.env.NEXT_PUBLIC_POST_URL}/api/uploads/${data?.loading_error?.[0]?.error_img}`}
            className="m-auto"
            width={200}
            height={200}
            priority={false}
            alt="error page"
          />
          <Link href="/" >
            <span >
              <IconRenderer
                iconName={data?.loading_error?.[0]?.icon_name}
                className="m-auto text-center text-3xl my-3 whatsapp_icon_social"
              />
            </span>
            <p className="text-xl">
              {renderText(data?.loading_error?.[0]?.message_forword)}
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
