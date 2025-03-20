"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useData } from "../service/Provider";
import AnimatedMouse from "./AnimatedMouse";

const TypingText = dynamic(() => import("./TypingText"), { ssr: false });
const IconRenderer = dynamic(() => import("../utils/IconRenderer"), {
  ssr: false,
});

const HeroSection = () => {
  const data = useData();
  console.log('data', data)
  const [randomImage, setRandomImage] = useState("/file.svg");

  useEffect(() => {
    if (data?.backImg?.length > 0) {
      const selectedImage = `${process.env.NEXT_PUBLIC_POST_URL}/api/uploads/${
        data.backImg[Math.floor(Math.random() * data.backImg.length)].img_url
      }`;
      setRandomImage(selectedImage);

      // Preload the image
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = selectedImage;
      document.head.appendChild(link);
    }
  }, [data?.backImg]);

  return (
    <section
      id="hero-section"
      className="flex relative flex-col items-center justify-center text-center h-screen px-5"
    >
      <h2 className="text-2xl lg:text-5xl uppercase mb-4 text-white">
        {data?.heroSection[0]?.title_text}
      </h2>
      <TypingText />
      <div className="flex gap-6 my-8">
        {data?.iconHero?.map((elem) => (
          <Link href={elem.link_icon} key={elem.hicon_id} passHref>
            <span className="bg-[#00359f] shadow-xl cursor-pointer hover:bg-[#ffd966] transition-all duration-75 w-[80px] h-[80px] flex items-center justify-center rounded-full text-white">
              <IconRenderer iconName={elem.icon_name} size={45}  />
            </span>
          </Link>
        ))}
      </div>
      <AnimatedMouse />
      <Image
        className="absolute inset-0 z-[-1] h-full w-full object-cover"
        src={randomImage}
        alt="Hero section background"
        width={1920}
        height={1080}
        priority={true}
        placeholder="blur"
        blurDataURL="/placeholder.jpg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1920px"
      />
    </section>
  );
};

export default HeroSection;