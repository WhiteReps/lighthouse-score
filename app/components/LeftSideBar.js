import Image from "next/image";
import Link from "next/link";
import React from "react";
import MostPopular from "./MostPopular";
import PopularPost from "./PopularPost";
import { useData } from "../service/Provider";

const LeftSideBar = () => {
  const sectionData = useData();
  return (
    <div
      className="pt-10"
      id="left_side_wrapper"
    >
      <div className="mb-6">
        <Link
          href={`${sectionData?.singlePost[0]?.ad1_link}`}
          target="_blank"
          aria-label="Link"
        >
          <p className="p-1 shadow-lg">
            <Image
              src={`${process.env.NEXT_PUBLIC_POST_URL}/api/uploads/${sectionData?.singlePost[0]?.ad1_preview}`}
              width={305}
              height={400}
              priority={false}
              alt="youtube banner"
            />
          </p>
        </Link>
      </div>
      <MostPopular title={sectionData?.singlePost[0]?.first_section_title} />
      <div className="mb-6">
        <Link
          href={`${sectionData?.singlePost[0]?.ad2_link}`}
          target="_blank"
          aria-label="Link"
        >
          <div className="p-1 shadow-lg">
            <Image
              src={`${process.env.NEXT_PUBLIC_POST_URL}/api/uploads/${sectionData?.singlePost[0]?.ad2_preview}`}
              width={305}
              priority={false}
              height={400}
              alt="facebook banner"
            />
          </div>
        </Link>
      </div>
      <PopularPost title={sectionData?.singlePost[0]?.second_section_title} />
      <div className="mb-6">
        <Link
          href={`${sectionData?.singlePost[0]?.ad3_link}`}
          target="_blank"
          aria-label="Link"
        >
          <div className="p-1 shadow-lg">
            <Image
              src={`${process.env.NEXT_PUBLIC_POST_URL}/api/uploads/${sectionData?.singlePost[0]?.ad3_preview}`}
              width={305}
              priority={false}
              height={400}
              alt="instagram banner"
            />
          </div>
        </Link>
      </div>
      <div className="mb-6">
        <Link
          href={`${sectionData?.singlePost[0]?.wiki_link}`}
          target="_blank"
          aria-label="Link"
        >
          <div className="p-1 py-3 shadow-lg">
            <Image
              src={`${process.env.NEXT_PUBLIC_POST_URL}/api/uploads/${sectionData?.singlePost[0]?.wiki_img}`}
              width={88}
              height={31}
              priority={false}
              alt="wikipedia banner"
              className="m-auto wiki_img"
            />
            <p className="text-[9px] text-black text-center">
              {sectionData?.singlePost[0]?.wiki_text}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LeftSideBar;
