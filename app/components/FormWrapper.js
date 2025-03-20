"use client";
import React from "react";
import TitleWrapper from "./TitleWrapper";
import Image from "next/image";
import Link from "next/link";
import Form from "./Form";
import { motion } from "framer-motion";
import { useData } from "../service/Provider";
import IconRenderer from "../utils/IconRenderer";

const FormWrapper = () => {
  const fadeInVariants = {
    hidden: { opacity: 0, x: -250 },
    visible: { opacity: 1, x: 0 },
  };
  const fadeRightVariants = {
    hidden: { opacity: 0, x: 250 },
    visible: { opacity: 1, x: 0 },
  };

  const data = useData();
  const renderText = (text) => {
    if (!text) return null;
    return text
      .split(/<br\s*\/?>|\n/)
      .map((line, index) => <p key={index}>{line}</p>);
  };

  return (
    <>
      <section id="contacto">
        <div className="container m-auto py-8">
          <TitleWrapper
            title={data?.aboutSec[0]?.title_text}
            firstLine={data?.aboutSec[0]?.text_desc}
          />

          <div className="lg:flex gap-10 justify-between my-8">
            {/* Image Section with Animation */}
            <motion.div
              className="text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeRightVariants}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image
                src={`/pura.webp`}
                alt="Pura+ office image"
                width={500}
                height={268}
                className="mb-4 m-auto"
                priority={false} 
              />
              <div className="text-sm text-dark">
                {renderText(data?.aboutSec[0]?.desc_about)}
              </div>

              <ul className="flex gap-2 lg:gap-4 mt-4 items-center justify-center">
                {data?.aboutIcon?.map((elem) => {
                  return (
                    <li
                      key={elem.acid}
                      className="text-xl lg:text-2xl bg-black text-white p-2 lg:p-3 rounded-xl"
                    >
                      <Link
                        href={elem.icon_link}
                        target="_blank"
                        aria-label={`Link to ${elem.icon_name}`}
                      >
                        <IconRenderer iconName={elem.icon_name} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            {/* Form Section with Animation */}
            <motion.div
              className="mt-14 lg:mt-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInVariants}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Form />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FormWrapper;
