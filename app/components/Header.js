"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useData } from "../service/Provider";
import React from "react";

import {
  FaBars,
  FaFacebookF,
  FaInstagram,
  FaTimes,
  FaYoutube,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import dynamic from "next/dynamic";

const DropDownFlag = dynamic(() => import("./DropDownFlag"), { ssr: false });

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { slug } = useParams();
  const data = useData();

  const checkWindowSize = () => {
    setIsMobile(window.innerWidth < 991);
  };

  useEffect(() => {
    checkWindowSize();
    window.addEventListener("resize", checkWindowSize);
    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen]);

  return (
    <header
      id="header"
      className={`absolute w-full ${isScrolled ? "scrolled-header" : ""} ${
        slug ? "shadow-custom" : ""
      }`}
    >
      <nav className="container m-auto relative">
        <div className="flex items-center justify-between py-6">
          <div className="logo_wrapper w-5/6 lg:w-1/6">
            <Link href="/">
              <Image
                src={`${process.env.NEXT_PUBLIC_POST_URL}/api/uploads/${data?.logo[0].site_logo}`}
                width={150}
                height={45}
                style={{
                  width: "150px",
                  height: "45px",
                  objectFit: "cover",
                }}
                priority={false}
                alt="Logo Image"
              />
            </Link>
          </div>
          {isMobile && (
            <button
              className={`text-2xl ${
                slug && !isScrolled ? "text-black" : "text-white"
              } lg:hidden`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          )}
          <div className="menu_wrapper hidden lg:block w-5/6">
            <ul
              className={`uppercase text-sm flex items-center font-bold justify-end gap-9 ${
                slug && !isScrolled ? "text-[#777]" : "text-white"
              }`}
            >
              {!slug ? (
                <>
                  {data?.menuItems?.map((elem) => (
                    <li key={elem.me_id}>
                      <Link
                        className="hover:text-[#ffd966] transition duration-100"
                        href={elem.menu_link}
                      >
                        {elem.menu_name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <DropDownFlag />
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      className="hover:text-[#ffd966] transition duration-100"
                      href="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:text-[#ffd966] transition duration-100"
                      href="https://shop.puramas.co"
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:text-[#ffd966] transition duration-100"
                      href="https://catalogo.puramas.co"
                    >
                      Catalogo
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {menuOpen && (
          <div className="absolute top-16 right-3">
            {data?.menuItems?.length > 0 && (
              <ul className="uppercase text-sm flex flex-col bg-[#ededed] text-[#000] font-normal p-5 justify-end gap-4 w-[180px]">
                {!slug ? (
                  <>
                    {data?.menuItems?.map((elem, index) => {
                      const isLast = index === data.menuItems.length - 1;
                      if (isLast) return null;
                      return (
                        <li key={elem.me_id}>
                          <Link
                            className={`hover:text-[#ffd966] duration-100`}
                            href={elem.menu_link}
                          >
                            {elem.menu_name}
                          </Link>
                        </li>
                      );
                    })}
                    <li>
                      <ul className="flex w-full gap-4 items-center">
                        <li className="text-lg bg-black text-white p-1 rounded">
                          <Link
                            href={`#contacto`}
                            onClick={() => setMenuOpen(false)}
                          >
                            <IoMdMail />
                          </Link>
                        </li>
                        <li className="text-lg bg-black text-white p-1 rounded">
                          <Link
                            href={`https://instagram.puramas.co/`}
                            target="_blank"
                            aria-label="Link to instagram"
                            onClick={() => setMenuOpen(false)}
                          >
                            <FaInstagram />
                          </Link>
                        </li>
                        <li className="text-lg bg-black text-white p-1 rounded">
                          <Link
                            href={`https://youtube.puramas.co/`}
                            aria-label="Link to youtube"
                            target="_blank"
                            onClick={() => setMenuOpen(false)}
                          >
                            <FaYoutube />
                          </Link>
                        </li>
                        <li className="text-lg bg-black text-white p-1 rounded">
                          <Link
                            href={`https://facebook.puramas.co/`}
                            target="_blank"
                            aria-label="Link to facebook"
                            onClick={() => setMenuOpen(false)}
                          >
                            <FaFacebookF />
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="mt-2">
                      <DropDownFlag openMenu={menuOpen} />
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        className="hover:text-[#ffd966] transition duration-100"
                        href="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="hover:text-[#ffd966] transition duration-100"
                        href="https://shop.puramas.co"
                      >
                        Shop
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="hover:text-[#ffd966] transition duration-100"
                        href="https://catalogo.puramas.co"
                      >
                        Catalogo
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
