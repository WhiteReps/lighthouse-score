import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useData } from "../service/Provider";
const DropDownFlag = ({ openMenu }) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const data = useData();

  return (
    <div className="language_wrapper">
      <div
        className="selected_flag"
        onClick={toggleDropdown}
      >
        <Image
          width={24}
          height={16}
          priority={false} 
          alt="Flag Mai"
          src="https://www.images.puramas.co/flag-it.png"
        />
        <span className="lan_name">It</span>
        <FaAngleDown className="text-red-500" />
      </div>
      {isOpen && (
        <div className={`language_list`}>
          <ul className={`${openMenu ? "bg-white" : ""} flag_select_wrapper`}>
          {data?.flags?.map((elem)=>{
            return(
              <li className="hover:bg-black duration-75" key={elem.f_id}>
              <Link
                href={elem.web_link}
                className="hover:text-[#ffd966] duration-75"
              >
                <Image
                  width={24}
                  height={16}
                  alt="Flag Spain"
                  src={elem.flag_link}
                  priority={false} 
                />
                <span>{elem.flag_name}</span>
              </Link>
            </li>
            )
          })}
            
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownFlag;
