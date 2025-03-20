"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingBasket } from "react-icons/fa";

const PromoCard = ({ number, image, link }) => {

  const variants = {
    // fadeInLeft: { opacity: 0, x: -150 },
    fadeInUp: { opacity: 0, y: 150 },
  };

  // const selectedVariant = number === 0 || number === 1 ? variants.fadeInLeft : variants.fadeInUp;

  return (
    <motion.div
      className="promo_card_wrapper text-center relative lg:w-[270]"
      initial={variants.fadeInUp}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} // Triggers once when 20% of the element is in view
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_POST_URL}/api/uploads/${image}`}
        width={270}
        height={333}
        alt="Card Image"
        priority={false}
        className="m-auto"
      />
      <div className="overlay absolute w-full top-0 h-full flex flex-col items-center justify-center bg-[#141414b3]">
        <p className="mb-0 text-white">Garantia 100% Despacho 48h</p>
        <span className="hover:bg-[#355c7d] p-2 rounded-full">
          <Link href={link} target="_blank" className="text-white" aria-label="Go to shopping basket">
            <FaShoppingBasket className="text-lg text-yellow-600" />
          </Link>
        </span>
      </div>
    </motion.div>
  );
};

export default PromoCard;
