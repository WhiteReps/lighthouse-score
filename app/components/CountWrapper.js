"use client";
import React from "react";
import { motion } from "framer-motion";
import { useData } from "../service/Provider";
const CountWrapper = () => {

  const containerVariants = {
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 0 },
  };

  const data = useData();

  return (
    <motion.section
      id="count_wrapper"
      className="mt-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      variants={containerVariants}
    >
      <div className="container m-auto">
        <div className="grid gap-5 py-14 text-white text-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-5xl font-bold mb-2">{data?.statics[0]?.click_blog.toLocaleString()}</p>
            <p className="uppercase mb-0">{data?.statics[0]?.first_text}</p>
          </div>
          <div>
            <p className="text-5xl font-bold mb-2">{data?.statics[0]?.con_fe.toLocaleString()}</p>
            <p className="uppercase mb-0">{data?.statics[0]?.second_text}</p>
          </div>
          <div>
            <p className="text-5xl font-bold mb-2">{data?.statics[0]?.tiendas.toLocaleString()}</p>
            <p className="uppercase mb-0">{data?.statics[0]?.third_text}</p>
          </div>
          <div>
            <p className="text-5xl font-bold mb-2">{data?.statics[0]?.followers.toLocaleString()}</p>
            <p className="uppercase mb-0">{data?.statics[0]?.four_text}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CountWrapper;
