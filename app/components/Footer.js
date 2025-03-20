import Image from "next/image";
import Link from "next/link";
import { useData } from "../service/Provider";
import React from "react";

import IconRenderer from "../utils/IconRenderer";

const Footer = () => {
  const data = useData();
  return (
    <footer className="py-8 bg-[#222]">
      <div className="container m-auto">
        <p className="text-center text-sm text-white">
          {data?.footerDetails[0]?.copyright_text}
        </p>
        <ul className="flex items-center justify-center gap-6 my-6">
          {data?.mainWebImg?.map((elem) => {
            return (
              <li key={elem.fm_id}>
                <Link
                  href={elem.web_link}
                  target="_blank"
                  aria-label={`Link to ${elem.icon_name}`}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_POST_URL}/api/uploads/${elem.web_img}`}
                    width={18}
                    priority={false}
                    height={18}
                    alt="Footer Image"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className="text-center text-white my-6">
          {data?.mainWebLink?.map((elem, index) => {
            return (
              <li
                className={`inline-block me-8`}
                key={index}
              >
                <Link
                  className="flex items-center gap-1 "
                  href={elem.item_link}
                >
                  <IconRenderer
                    iconName={elem.item_icon}
                    size={20}
                  />
                  {elem.item_name}
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className="text-white text-center">
          {data?.morePage?.map((elem) => {
            return (
              <li className="inline-block me-8" key={elem.mp_id}>
                <Link href={elem.menuLink}>
                  {elem.menu_name}
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-[12px] text-center text-[#999] ">
          {data?.footerDetails[0]?.country_text}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
