import React from "react";
import TitleWrapper from "./TitleWrapper";
import PromoCard from "./PromoCard";
import { useData } from "../service/Provider";

const Promo = () => {

  

  const data = useData();
  return (
    <section className="py-8" id="shop">
      <div className="container m-auto">
        <TitleWrapper
          title={data?.productSec[0]?.title_text}
          firstLine={data?.productSec[0]?.desc_text}
        />

        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-8">
          {data?.productImg?.map((elem, index) => {
            return (
              <PromoCard
                key={index}
                totalCards={elem.length}
                image={elem.product_img}
                link={elem.product_link}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Promo;
